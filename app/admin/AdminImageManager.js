"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { adminImageConfig } from "../lib/adminImageConfig";
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
  return `${slot.page}:${slot.sectionKey}:${slot.contentKey}:${slot.itemId || ""}`;
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

export default function AdminImageManager() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const hasConfig = hasSupabaseConfig();
  const [session, setSession] = useState(null);
  const [authChecked, setAuthChecked] = useState(!hasConfig);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("images");
  const [activeImageTab, setActiveImageTab] = useState("homepage");
  const [activeContentPage, setActiveContentPage] = useState(siteContentPages[0].key);
  const [records, setRecords] = useState({});
  const [contentRecords, setContentRecords] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const clearStatus = useCallback(() => {
    setError("");
    setMessage("");
  }, []);

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

    const nextRecords = {};
    for (const slot of allContentSlots) {
      const match = (data || []).find(
        (record) =>
          record.page === slot.page &&
          record.section_key === slot.sectionKey &&
          record.content_key === slot.contentKey &&
          (record.item_id || "") === (slot.itemId || "")
      );

      nextRecords[getContentSlotKey(slot)] = match || fallbackContentRecord(slot);
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

      const { error: insertError } = await supabase.from("site_images").insert({
        page: slot.page,
        section_key: slot.sectionKey,
        slot_key: slot.slotKey,
        item_id: slot.itemId || null,
        storage_path: storagePath,
        alt_text: slot.alt || slot.label,
        sort_order: 0,
      });

      if (insertError) {
        throw insertError;
      }
    });
  }

  async function addInventoryImage(slot, file) {
    if (!file) {
      return;
    }

    runMutation(async () => {
      const current = records[getSlotKey(slot)] || [];
      const existing = current.filter((item) => !item.isFallback);
      const storagePath = await uploadFile(slot, file);

      const { error: insertError } = await supabase.from("site_images").insert({
        page: slot.page,
        section_key: slot.sectionKey,
        slot_key: slot.slotKey,
        item_id: slot.itemId,
        storage_path: storagePath,
        alt_text: slot.alt || slot.label,
        sort_order: existing.length,
      });

      if (insertError) {
        throw insertError;
      }
    });
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
    });
  }

  async function moveImage(slot, index, direction) {
    const key = getSlotKey(slot);
    const images = (records[key] || []).filter((item) => !item.isFallback);
    const nextIndex = index + direction;

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

  async function saveContent(slot) {
    const key = getContentSlotKey(slot);
    const record = contentRecords[key] || fallbackContentRecord(slot);

    runMutation(
      async () => {
        const { error: upsertError } = await supabase.from("site_content").upsert(
          {
            page: slot.page,
            section_key: slot.sectionKey,
            content_key: slot.contentKey,
            item_id: slot.itemId || "",
            value: record.value,
            updated_at: new Date().toISOString(),
          },
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
  const activeContentConfig = siteContentPages.find(
    (page) => page.key === activeContentPage
  );

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

      <nav className="admin-tabs" aria-label="Admin tools">
        {[
          ["images", "Images"],
          ["content", "Text / Content"],
        ].map(([section, label]) => (
          <button
            key={section}
            className={activeSection === section ? "active" : ""}
            type="button"
            onClick={() => setActiveSection(section)}
          >
            {label}
          </button>
        ))}
      </nav>

      {activeSection === "images" ? (
        <nav className="admin-tabs admin-subtabs" aria-label="Image sections">
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
      ) : (
        <nav className="admin-tabs admin-subtabs" aria-label="Content pages">
          {siteContentPages.map((page) => (
            <button
              key={page.key}
              className={activeContentPage === page.key ? "active" : ""}
              type="button"
              onClick={() => setActiveContentPage(page.key)}
            >
              {page.label}
            </button>
          ))}
        </nav>
      )}

      {message ? <p className="admin-success">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      {activeSection === "images" ? (
        <section className="admin-image-list" aria-busy={isPending}>
          {slots.map((slot) => {
            const key = getSlotKey(slot);
            const images = records[key] || [fallbackRecord(slot)];
            const isInventory = slot.page === "pre-owned-inventory";

            return (
              <article className="admin-image-group" key={key}>
                <div className="admin-group-heading">
                  <div>
                    <p>{isInventory ? "Inventory Listing" : "Homepage Section"}</p>
                    <h2>{slot.label}</h2>
                  </div>
                  {isInventory ? (
                    <label className="admin-upload-button">
                      Add Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => addInventoryImage(slot, event.target.files?.[0])}
                      />
                    </label>
                  ) : null}
                </div>

                <div className="admin-images-grid">
                  {images.map((record, index) => (
                    <div className="admin-image-card" key={record.id || `${key}-fallback`}>
                      <div className="admin-preview">
                        <Image
                          unoptimized
                          src={record.src}
                          alt={record.alt_text || slot.label}
                          fill
                          sizes="(max-width: 900px) 100vw, 360px"
                        />
                      </div>
                      <div className="admin-image-actions">
                        <label className="admin-upload-button">
                          Replace
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              replaceImage(slot, record, event.target.files?.[0])
                            }
                          />
                        </label>
                        <button
                          className="admin-secondary"
                          type="button"
                          onClick={() => deleteImage(record)}
                        >
                          Delete
                        </button>
                        {isInventory && !record.isFallback ? (
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
                              disabled={index === images.length - 1}
                            >
                              Move Down
                            </button>
                          </>
                        ) : null}
                      </div>
                      <p className="admin-note">
                        {record.isFallback ? "Original site image" : index === 0 ? "Primary image" : `Image ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="admin-content-list" aria-busy={isPending}>
          {activeContentConfig.slots.map((slot) => {
            const key = getContentSlotKey(slot);
            const record = contentRecords[key] || fallbackContentRecord(slot);
            const sectionLabel = slot.sectionKey
              .split("_")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ");
            const fieldId = `content-${key.replace(/[^a-z0-9_-]/gi, "-")}`;

            return (
              <article className="admin-content-field" key={key}>
                <label htmlFor={fieldId}>
                  <span>{sectionLabel}</span>
                  {slot.label}
                </label>
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
                <div className="admin-content-actions">
                  <p className="admin-note">
                    {record.isFallback ? "Default site text" : "Supabase override"}
                  </p>
                  <button
                    className="admin-primary"
                    type="button"
                    onClick={() => saveContent(slot)}
                  >
                    Save
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
