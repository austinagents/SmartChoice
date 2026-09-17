"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { adminImageConfig } from "../lib/adminImageConfig";
import { buildContentMap, contentSlotId } from "../lib/contentValues";
import { getSupabaseBrowserClient } from "../lib/supabaseBrowser";
import { getPublicImageUrl, hasSupabaseConfig, siteImagesBucket } from "../lib/supabaseConfig";
import { siteContentPages } from "../data";

const imagePageLabels = {
  homepage: "Homepage",
  inventory: "Pre-Owned Inventory",
};

const allAdminSlots = [...adminImageConfig.homepage, ...adminImageConfig.inventory];
const allContentSlots = siteContentPages.flatMap((page) => page.slots);
const localAdminBypass = true;
const maxHomepageImages = 7;
const maxInventoryImages = 7;

function makeStoragePath(slot, file) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const cleanExtension = extension.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now();

  if (slot.page === "homepage") {
    return `homepage/${slot.sectionKey}/${slot.slotKey}/${time}-${random}.${cleanExtension}`;
  }

  return `inventory/${slot.itemId}/${time}-${random}.${cleanExtension}`;
}

function getSlotKey(slot) {
  return `${slot.page}:${slot.sectionKey}:${slot.slotKey}:${slot.itemId || ""}`;
}

function getContentSlotKey(slot) {
  return contentSlotId(slot);
}

function fallbackRecord(slot) {
  return {
    id: null,
    page: slot.page,
    section_key: slot.sectionKey,
    slot_key: slot.slotKey,
    item_id: slot.itemId || null,
    storage_path: null,
    alt_text: slot.alt || slot.label,
    sort_order: 0,
    src: slot.fallbackSrc,
    isFallback: true,
  };
}

function fallbackContentRecord(slot) {
  return {
    page: slot.page,
    section_key: slot.sectionKey,
    content_key: slot.contentKey,
    item_id: slot.itemId || "",
    value: slot.value,
    isFallback: true,
  };
}

function recordWithSrc(record, slot) {
  return {
    ...record,
    src: record.storage_path ? getPublicImageUrl(record.storage_path) : slot.fallbackSrc,
    alt_text: record.alt_text || slot.alt || slot.label,
    isFallback: !record.storage_path,
  };
}

function emptyHomepageRecord(slot, index) {
  return {
    id: null,
    page: slot.page,
    section_key: slot.sectionKey,
    slot_key: slot.slotKey,
    item_id: null,
    storage_path: null,
    alt_text: slot.alt || slot.label,
    sort_order: index,
    src: null,
    isEmptySlot: true,
  };
}

function emptyInventoryRecord(slot, index) {
  return {
    id: null,
    page: slot.page,
    section_key: slot.sectionKey,
    slot_key: slot.slotKey,
    item_id: slot.itemId || null,
    storage_path: null,
    alt_text: slot.alt || slot.label,
    sort_order: index,
    src: null,
    isEmptySlot: true,
  };
}

function homepageDisplayImages(slot, images) {
  const displayImages = Array.from({ length: maxHomepageImages }, (_item, index) =>
    index === 0 ? fallbackRecord(slot) : emptyHomepageRecord(slot, index)
  );

  for (const record of images.filter((item) => !item.isFallback)) {
    const sortOrder = Number.isInteger(Number(record.sort_order))
      ? Number(record.sort_order)
      : 0;

    if (sortOrder >= 0 && sortOrder < maxHomepageImages) {
      displayImages[sortOrder] = record;
    }
  }

  return displayImages;
}

function inventoryDisplayImages(slot, images) {
  const displayImages = Array.from({ length: maxInventoryImages }, (_item, index) =>
    index === 0 ? fallbackRecord(slot) : emptyInventoryRecord(slot, index)
  );

  for (const record of images.filter((item) => !item.isFallback)) {
    const sortOrder = Number.isInteger(Number(record.sort_order))
      ? Number(record.sort_order)
      : 0;

    if (sortOrder >= 0 && sortOrder < maxInventoryImages) {
      displayImages[sortOrder] = record;
    }
  }

  return displayImages;
}

function maxImagesForSlot(slot) {
  return slot.page === "pre-owned-inventory" ? maxInventoryImages : maxHomepageImages;
}

function contentSlotsForSection(page, sectionKey, itemId) {
  return allContentSlots.filter(
    (slot) =>
      slot.page === page &&
      slot.sectionKey === sectionKey &&
      (itemId === undefined || (slot.itemId || "") === itemId)
  );
}

function contentSlotsForHomepageImageSlot(slot) {
  if (slot.slotKey === "hero_image") {
    return contentSlotsForSection("homepage", "hero");
  }

  if (slot.slotKey === "built_to_order_feature") {
    return contentSlotsForSection("homepage", "built_feature");
  }

  if (slot.slotKey === "mobile_service_feature") {
    return contentSlotsForSection("homepage", "service_feature");
  }

  if (slot.slotKey === "consignment_feature") {
    return contentSlotsForSection("homepage", "consignment");
  }

  const whatWeDoKeysBySlot = {
    pre_owned_carts: ["pre_owned_title", "pre_owned_text"],
    built_to_order_carts: ["built_title", "built_text"],
    service_repairs: ["service_title", "service_text"],
    consign_sales: ["consign_title", "consign_text"],
  };
  const contentKeys = whatWeDoKeysBySlot[slot.slotKey];

  if (!contentKeys) {
    return [];
  }

  return allContentSlots.filter(
    (contentSlot) =>
      contentSlot.page === "homepage" &&
      contentSlot.sectionKey === "what_we_do" &&
      contentKeys.includes(contentSlot.contentKey)
  );
}

function contentSlotsForImageSlot(slot) {
  if (slot.page === "homepage") {
    return contentSlotsForHomepageImageSlot(slot);
  }

  if (slot.page === "pre-owned-inventory") {
    return contentSlotsForSection("pre-owned-inventory", "inventory", slot.itemId || "");
  }

  return [];
}

export default function AdminImageManager() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const hasConfig = hasSupabaseConfig();
  const [session, setSession] = useState(null);
  const [authChecked, setAuthChecked] = useState(!hasConfig);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeImageTab, setActiveImageTab] = useState("homepage");
  const [records, setRecords] = useState({});
  const [contentRecords, setContentRecords] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [isPending, startTransition] = useTransition();
  const savedToastTimeoutRef = useRef(null);

  const clearStatus = useCallback(() => {
    setError("");
    setMessage("");
  }, []);

  const showTemporarySavedToast = useCallback(() => {
    if (savedToastTimeoutRef.current) {
      clearTimeout(savedToastTimeoutRef.current);
    }

    setShowSavedToast(true);
    savedToastTimeoutRef.current = setTimeout(() => {
      setShowSavedToast(false);
      savedToastTimeoutRef.current = null;
    }, 2000);
  }, []);

  useEffect(
    () => () => {
      if (savedToastTimeoutRef.current) {
        clearTimeout(savedToastTimeoutRef.current);
      }
    },
    []
  );

  const loadImages = useCallback(async () => {
    clearStatus();

    const { data, error: loadError } = await supabase
      .from("site_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const nextRecords = {};
    for (const slot of allAdminSlots) {
      const matches = (data || []).filter(
        (record) =>
          record.page === slot.page &&
          record.section_key === slot.sectionKey &&
          record.slot_key === slot.slotKey &&
          (record.item_id || null) === (slot.itemId || null)
      );

      nextRecords[getSlotKey(slot)] = matches.length
        ? matches.map((record) => recordWithSrc(record, slot))
        : [fallbackRecord(slot)];
    }

    setRecords(nextRecords);
  }, [clearStatus, supabase]);

  const loadContent = useCallback(async () => {
    clearStatus();

    function applyDefaultContent() {
      const nextRecords = {};
      for (const slot of allContentSlots) {
        nextRecords[getContentSlotKey(slot)] = fallbackContentRecord(slot);
      }
      setContentRecords(nextRecords);
    }

    const { data, error: loadError } = await supabase
      .from("site_content")
      .select("*")
      .order("page", { ascending: true })
      .order("section_key", { ascending: true })
      .order("content_key", { ascending: true });

    if (loadError) {
      if (loadError.message.includes("site_content")) {
        applyDefaultContent();
        return;
      }

      setError(loadError.message);
      return;
    }

    const contentMap = buildContentMap(allContentSlots, data || []);
    const nextRecords = {};
    for (const slot of allContentSlots) {
      const key = getContentSlotKey(slot);
      const fallback = fallbackContentRecord(slot);
      nextRecords[key] = {
        ...fallback,
        value: contentMap[key],
        isFallback: contentMap[key] === slot.value,
      };
    }

    setContentRecords(nextRecords);
  }, [clearStatus, supabase]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const currentSession = data.session;
      setSession(currentSession);
      setAuthChecked(true);
      if (currentSession || localAdminBypass) {
        loadImages();
        loadContent();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession || localAdminBypass) {
        loadImages();
        loadContent();
      }
    });

    return () => subscription.unsubscribe();
  }, [loadContent, loadImages, supabase]);

  async function signIn(event) {
    event.preventDefault();
    clearStatus();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setMessage("Signed in.");
  }

  async function signOut() {
    clearStatus();
    await supabase.auth.signOut();
    setRecords({});
    setContentRecords({});
  }

  async function removeStorageObjectWhenUnused(storagePath) {
    if (!storagePath) {
      return;
    }

    const { count, error: countError } = await supabase
      .from("site_images")
      .select("id", { count: "exact", head: true })
      .eq("storage_path", storagePath);

    if (!countError && count === 0) {
      await supabase.storage.from(siteImagesBucket).remove([storagePath]);
    }
  }

  async function uploadFile(slot, file) {
    const storagePath = makeStoragePath(slot, file);
    const { error: uploadError } = await supabase.storage
      .from(siteImagesBucket)
      .upload(storagePath, file, {
        cacheControl: "31536000",
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    return storagePath;
  }

  function runMutation(
    operation,
    {
      reload = loadImages,
      successMessage = "Saved. The live site will use this image on the next page load.",
    } = {}
  ) {
    clearStatus();
    startTransition(async () => {
      try {
        await operation();
        await reload();
        setMessage(successMessage);
        showTemporarySavedToast();
      } catch (mutationError) {
        setError(mutationError.message || "Something went wrong.");
      }
    });
  }

  async function replaceImage(slot, record, file) {
    if (!file) {
      return;
    }

    runMutation(async () => {
      const storagePath = await uploadFile(slot, file);

      if (record.id) {
        const previousPath = record.storage_path;
        const { error: updateError } = await supabase
          .from("site_images")
          .update({
            storage_path: storagePath,
            alt_text: slot.alt || slot.label,
            updated_at: new Date().toISOString(),
          })
          .eq("id", record.id);

        if (updateError) {
          throw updateError;
        }

        await removeStorageObjectWhenUnused(previousPath);
        return;
      }

      if (slot.page === "homepage") {
        const current = records[getSlotKey(slot)] || [];
        const existing = current.filter((item) => !item.isFallback);

        if (existing.length >= maxHomepageImages) {
          await supabase.storage.from(siteImagesBucket).remove([storagePath]);
          throw new Error("Homepage sections can have up to 7 images.");
        }
      }

      const { error: insertError } = await supabase.from("site_images").insert({
        page: slot.page,
        section_key: slot.sectionKey,
        slot_key: slot.slotKey,
        item_id: slot.itemId || null,
        storage_path: storagePath,
        alt_text: slot.alt || slot.label,
        sort_order: record.sort_order || 0,
      });

      if (insertError) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw insertError;
      }
    });
  }

  async function addHomepageImage(slot, file, sortOrder) {
    if (!file) {
      return;
    }

    runMutation(async () => {
      const existing = await loadSlotImageRecords(slot);

      if (existing.length >= maxHomepageImages) {
        throw new Error("Homepage sections can have up to 7 images.");
      }

      const storagePath = await uploadFile(slot, file);
      const latestExisting = await loadSlotImageRecords(slot);

      if (latestExisting.length >= maxHomepageImages) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw new Error("Homepage sections can have up to 7 images.");
      }

      const { error: insertError } = await supabase.from("site_images").insert({
        page: slot.page,
        section_key: slot.sectionKey,
        slot_key: slot.slotKey,
        item_id: null,
        storage_path: storagePath,
        alt_text: slot.alt || slot.label,
        sort_order: Number.isInteger(sortOrder) ? sortOrder : latestExisting.length,
      });

      if (insertError) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw insertError;
      }
    });
  }

  async function addInventoryImage(slot, file, sortOrder) {
    if (!file) {
      return;
    }

    runMutation(async () => {
      const existing = await loadSlotImageRecords(slot);

      if (existing.length >= maxInventoryImages) {
        throw new Error("Inventory listings can have up to 7 images.");
      }

      const targetSortOrder = Number.isInteger(sortOrder) ? sortOrder : existing.length;
      const targetExists = existing.some(
        (record) => Number(record.sort_order) === targetSortOrder
      );

      if (targetExists) {
        throw new Error("That inventory image slot is already occupied. Replace the image instead.");
      }

      const storagePath = await uploadFile(slot, file);
      const latestExisting = await loadSlotImageRecords(slot);

      if (latestExisting.length >= maxInventoryImages) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw new Error("Inventory listings can have up to 7 images.");
      }

      const latestTargetExists = latestExisting.some(
        (record) => Number(record.sort_order) === targetSortOrder
      );

      if (latestTargetExists) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw new Error("That inventory image slot is already occupied. Replace the image instead.");
      }

      const { error: insertError } = await supabase.from("site_images").insert({
        page: slot.page,
        section_key: slot.sectionKey,
        slot_key: slot.slotKey,
        item_id: slot.itemId,
        storage_path: storagePath,
        alt_text: slot.alt || slot.label,
        sort_order: targetSortOrder,
      });

      if (insertError) {
        await supabase.storage.from(siteImagesBucket).remove([storagePath]);
        throw insertError;
      }
    });
  }

  async function loadSlotImageRecords(slot) {
    let query = supabase
      .from("site_images")
      .select("id,sort_order,created_at")
      .eq("page", slot.page)
      .eq("section_key", slot.sectionKey)
      .eq("slot_key", slot.slotKey)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    query = slot.itemId ? query.eq("item_id", slot.itemId) : query.is("item_id", null);

    const { data, error: loadError } = await query;

    if (loadError) {
      throw loadError;
    }

    return data || [];
  }

  async function deleteImage(record) {
    if (!record.id) {
      setMessage("This is the original fallback image. Upload a replacement to change it.");
      return;
    }

    runMutation(async () => {
      const storagePath = record.storage_path;
      const { error: deleteError } = await supabase
        .from("site_images")
        .delete()
        .eq("id", record.id);

      if (deleteError) {
        throw deleteError;
      }

      await removeStorageObjectWhenUnused(storagePath);
      await normalizeSlotOrder(record);
    });
  }

  async function normalizeSlotOrder(record) {
    let query = supabase
      .from("site_images")
      .select("id")
      .eq("page", record.page)
      .eq("section_key", record.section_key)
      .eq("slot_key", record.slot_key)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    query = record.item_id ? query.eq("item_id", record.item_id) : query.is("item_id", null);

    const { data, error: loadError } = await query;

    if (loadError) {
      throw loadError;
    }

    for (let sortOrder = 0; sortOrder < data.length; sortOrder += 1) {
      const { error: updateError } = await supabase
        .from("site_images")
        .update({ sort_order: sortOrder, updated_at: new Date().toISOString() })
        .eq("id", data[sortOrder].id);

      if (updateError) {
        throw updateError;
      }
    }
  }

  async function moveImage(slot, index, direction) {
    const key = getSlotKey(slot);
    const images = (records[key] || []).filter((item) => !item.isFallback);
    const nextIndex = index + direction;

    if (slot.page === "homepage" || slot.page === "pre-owned-inventory") {
      if (nextIndex < 0 || nextIndex >= maxImagesForSlot(slot)) {
        return;
      }

      const moved = images.find((item) => Number(item.sort_order) === index);

      if (!moved) {
        return;
      }

      runMutation(async () => {
        const target = images.find((item) => Number(item.sort_order) === nextIndex);
        const updates = [
          { id: moved.id, sort_order: nextIndex },
          ...(target ? [{ id: target.id, sort_order: index }] : []),
        ];

        for (const update of updates) {
          const { error: updateError } = await supabase
            .from("site_images")
            .update({ sort_order: update.sort_order, updated_at: new Date().toISOString() })
            .eq("id", update.id);

          if (updateError) {
            throw updateError;
          }
        }
      });
      return;
    }

    if (nextIndex < 0 || nextIndex >= images.length) {
      return;
    }

    runMutation(async () => {
      const reordered = [...images];
      const [moved] = reordered.splice(index, 1);
      reordered.splice(nextIndex, 0, moved);

      for (let sortOrder = 0; sortOrder < reordered.length; sortOrder += 1) {
        const { error: updateError } = await supabase
          .from("site_images")
          .update({ sort_order: sortOrder, updated_at: new Date().toISOString() })
          .eq("id", reordered[sortOrder].id);

        if (updateError) {
          throw updateError;
        }
      }
    });
  }

  function updateContentDraft(slot, value) {
    const key = getContentSlotKey(slot);
    setContentRecords((current) => ({
      ...current,
      [key]: {
        ...(current[key] || fallbackContentRecord(slot)),
        value,
      },
    }));
  }

  async function saveContentSlots(slotsToSave) {
    if (!slotsToSave.length) {
      return;
    }

    runMutation(
      async () => {
        const rows = slotsToSave.map((slot) => {
          const key = getContentSlotKey(slot);
          const record = contentRecords[key] || fallbackContentRecord(slot);

          return {
            page: slot.page,
            section_key: slot.sectionKey,
            content_key: slot.contentKey,
            item_id: slot.itemId || "",
            value: record.value,
            updated_at: new Date().toISOString(),
          };
        });

        const { error: upsertError } = await supabase.from("site_content").upsert(
          rows,
          {
            onConflict: "page,section_key,content_key,item_id",
          }
        );

        if (upsertError) {
          throw upsertError;
        }
      },
      {
        reload: loadContent,
        successMessage: "Saved. The live site will use this text on the next page load.",
      }
    );
  }

  if (!hasConfig || !supabase) {
    return (
      <main className="admin-page">
        <section className="admin-login-card">
          <h1>Admin setup needed</h1>
          <p>
            Add the Supabase URL and anon key to the site environment before
            using the admin panel.
          </p>
        </section>
      </main>
    );
  }

  if (!authChecked) {
    return (
      <main className="admin-page">
        <section className="admin-login-card">
          <h1>Loading admin</h1>
        </section>
      </main>
    );
  }

  if (!session && !localAdminBypass) {
    return (
      <main className="admin-page">
        <form className="admin-login-card" onSubmit={signIn}>
          <p className="admin-kicker">Smart Choice Golf Carts</p>
          <h1>Admin Login</h1>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="admin-primary" type="submit">
            Log In
          </button>
          {error ? <p className="admin-error">{error}</p> : null}
        </form>
      </main>
    );
  }

  const slots = adminImageConfig[activeImageTab];

  const renderContentFields = (contentSlots) => {
    if (!contentSlots.length) {
      return null;
    }

    return (
      <div className="admin-content-grid">
        {contentSlots.map((slot) => {
          const key = getContentSlotKey(slot);
          const record = contentRecords[key] || fallbackContentRecord(slot);
          const fieldId = `content-${key.replace(/[^a-z0-9_-]/gi, "-")}`;

          return (
            <div className="admin-content-field" key={key}>
              <label htmlFor={fieldId}>{slot.label}</label>
              {slot.inputType === "long" ? (
                <textarea
                  id={fieldId}
                  value={record.value}
                  onChange={(event) => updateContentDraft(slot, event.target.value)}
                  rows={4}
                />
              ) : (
                <input
                  id={fieldId}
                  type="text"
                  value={record.value}
                  onChange={(event) => updateContentDraft(slot, event.target.value)}
                />
              )}
            </div>
          );
        })}
        <div className="admin-content-actions">
          <button
            className="admin-primary"
            type="button"
            onClick={() => saveContentSlots(contentSlots)}
          >
            Save Text
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">Smart Choice Golf Carts</p>
          <h1>Site Admin</h1>
        </div>
        <button className="admin-secondary" type="button" onClick={signOut}>
          Log Out
        </button>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        {Object.keys(imagePageLabels).map((tab) => (
          <button
            key={tab}
            className={activeImageTab === tab ? "active" : ""}
            type="button"
            onClick={() => setActiveImageTab(tab)}
          >
            {imagePageLabels[tab]}
          </button>
        ))}
      </nav>

      {message ? <p className="admin-success">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      {showSavedToast ? (
        <div className="admin-saved-toast" role="status" aria-live="polite">
          Saved ✓
        </div>
      ) : null}

      <section className="admin-image-list" aria-busy={isPending}>
        {slots.map((slot) => {
          const key = getSlotKey(slot);
          const images = records[key] || [fallbackRecord(slot)];
          const isInventory = slot.page === "pre-owned-inventory";
          const visibleImages = isInventory
            ? inventoryDisplayImages(slot, images)
            : homepageDisplayImages(slot, images);
          const contentSlots = contentSlotsForImageSlot(slot);

          return (
            <article
              className={`admin-image-group${isInventory ? "" : " admin-homepage-image-group"}`}
              key={key}
            >
              <div className="admin-group-heading">
                <div>
                  <p>{isInventory ? "Inventory Listing" : "Homepage Section"}</p>
                  <h2>{slot.label}</h2>
                </div>
              </div>

              <div className="admin-images-grid">
                {visibleImages.map((record, index) => (
                  <div
                    className={`admin-image-card${record.isEmptySlot ? " admin-empty-image-card" : ""}`}
                    key={record.id || `${key}-slot-${index}`}
                  >
                    {record.isEmptySlot ? (
                      <div className="admin-empty-preview">
                        <span>Image {index + 1}</span>
                      </div>
                    ) : (
                      <div className="admin-preview">
                        <Image
                          unoptimized
                          src={record.src}
                          alt={record.alt_text || slot.label}
                          fill
                          sizes="(max-width: 900px) 100vw, 360px"
                        />
                      </div>
                    )}
                    <div className="admin-image-actions">
                      <label className="admin-upload-button">
                        {record.isEmptySlot ? "Upload Image" : "Replace"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            record.isEmptySlot && isInventory
                              ? addInventoryImage(slot, event.target.files?.[0], index)
                              : record.isEmptySlot
                                ? addHomepageImage(slot, event.target.files?.[0], index)
                                : replaceImage(slot, record, event.target.files?.[0])
                          }
                        />
                      </label>
                      {record.isEmptySlot ? null : (
                        <button
                          className="admin-secondary"
                          type="button"
                          onClick={() => deleteImage(record)}
                        >
                          Delete
                        </button>
                      )}
                      {!record.isEmptySlot && !record.isFallback ? (
                        <>
                          <button
                            className="admin-secondary"
                            type="button"
                            onClick={() => moveImage(slot, index, -1)}
                            disabled={index === 0}
                          >
                            Move Up
                          </button>
                          <button
                            className="admin-secondary"
                            type="button"
                            onClick={() => moveImage(slot, index, 1)}
                            disabled={index === visibleImages.length - 1}
                          >
                            Move Down
                          </button>
                        </>
                      ) : null}
                    </div>
                    <p className="admin-note">
                      {record.isEmptySlot
                        ? `Image ${index + 1}`
                        : record.isFallback
                          ? "Original site image"
                          : index === 0
                            ? "Primary image"
                            : `Image ${index + 1}`}
                    </p>
                  </div>
                ))}
              </div>

              {renderContentFields(contentSlots)}
            </article>
          );
        })}
      </section>
    </main>
  );
}
