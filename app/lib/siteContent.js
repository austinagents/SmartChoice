import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { buildContentMap, contentValue } from "./contentValues";
import { hasSupabaseConfig, supabaseAnonKey, supabaseUrl } from "./supabaseConfig";

export { contentValue } from "./contentValues";

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
  return buildContentMap(slots, records);
}

export function footerContentValues(content) {
  return {
    tagline: contentValue(content, "site", "footer", "tagline"),
    siteMapHeading: contentValue(content, "site", "footer", "site_map_heading"),
    serviceAreaHeading: contentValue(content, "site", "footer", "service_area_heading"),
    serviceAreaText: contentValue(content, "site", "footer", "service_area_text"),
  };
}
