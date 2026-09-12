import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import {
  getPublicImageUrl,
  hasSupabaseConfig,
  supabaseAnonKey,
  supabaseUrl,
} from "./supabaseConfig";

function fallbackEntry(slot) {
  return {
    id: null,
    src: slot.fallbackSrc,
    storagePath: null,
    alt: slot.alt || slot.label || "",
    sortOrder: 0,
    isFallback: true,
  };
}

function createServerClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export const getSiteImages = cache(async () => {
  const supabase = createServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("site_images")
    .select(
      "id,page,section_key,slot_key,item_id,storage_path,alt_text,sort_order"
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Unable to load Supabase site images:", error.message);
    return [];
  }

  return data || [];
});

export function imageRecordToEntry(record, fallbackAlt = "") {
  return {
    id: record.id,
    src: getPublicImageUrl(record.storage_path),
    storagePath: record.storage_path,
    alt: record.alt_text || fallbackAlt,
    sortOrder: record.sort_order || 0,
    isFallback: false,
  };
}

export async function getHomepageImageMap(slots) {
  const records = await getSiteImages();
  const map = {};

  for (const slot of slots) {
    const record = records.find(
      (item) =>
        item.page === slot.page &&
        item.section_key === slot.sectionKey &&
        item.slot_key === slot.slotKey &&
        !item.item_id
    );

    map[slot.slotKey] = record
      ? imageRecordToEntry(record, slot.alt)
      : fallbackEntry(slot);
  }

  return map;
}

export async function getInventoryImageMap(slots) {
  const records = await getSiteImages();
  const map = {};

  for (const slot of slots) {
    const matches = records.filter(
      (item) =>
        item.page === slot.page &&
        item.section_key === slot.sectionKey &&
        item.slot_key === slot.slotKey &&
        item.item_id === slot.itemId
    );

    map[slot.itemId] = matches.length
      ? matches.map((record) => imageRecordToEntry(record, slot.alt))
      : [fallbackEntry(slot)];
  }

  return map;
}
