import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { allContentSlots } from "../data";
import { hasSupabaseConfig, supabaseAnonKey, supabaseUrl } from "./supabaseConfig";

function contentSlotId(slot) {
  return [slot.page, slot.sectionKey, slot.contentKey, slot.itemId || ""].join(":");
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

export const getSiteContent = cache(async () => {
  const supabase = createServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("page,section_key,content_key,item_id,value")
    .order("page", { ascending: true })
    .order("section_key", { ascending: true })
    .order("content_key", { ascending: true });

  if (error) {
    console.error("Unable to load Supabase site content:", error.message);
    return [];
  }

  return data || [];
});

export async function getContentMap(slots) {
  const records = await getSiteContent();
  const values = {};

  for (const slot of slots) {
    values[contentSlotId(slot)] = slot.value;
  }

  for (const record of records) {
    const id = [record.page, record.section_key, record.content_key, record.item_id || ""].join(":");
    if (Object.prototype.hasOwnProperty.call(values, id)) {
      values[id] = record.value;
    }
  }

  return values;
}

export function contentValue(content, page, sectionKey, contentKey, itemId = "") {
  const id = [page, sectionKey, contentKey, itemId || ""].join(":");
  const configured = content[id];

  if (configured !== undefined) {
    return configured;
  }

  const fallback = allContentSlots.find(
    (slot) =>
      slot.page === page &&
      slot.sectionKey === sectionKey &&
      slot.contentKey === contentKey &&
      (slot.itemId || "") === (itemId || "")
  );

  return fallback?.value || "";
}

export function footerContentValues(content) {
  return {
    tagline: contentValue(content, "site", "footer", "tagline"),
    siteMapHeading: contentValue(content, "site", "footer", "site_map_heading"),
    serviceAreaHeading: contentValue(content, "site", "footer", "service_area_heading"),
    serviceAreaText: contentValue(content, "site", "footer", "service_area_text"),
  };
}
