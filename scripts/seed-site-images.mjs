import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import WebSocket from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const bucket = "site-images";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isNode20 = process.versions.node.startsWith("20.");

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local or pass them when running this script."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
  ...(isNode20 ? { realtime: { transport: WebSocket } } : {}),
});

const homepageImages = [
  ["hero", "hero_image", "Hero Image", "smartchoice-current-site-images/IMG_9827.jpg"],
  ["what_we_do", "pre_owned_carts", "Pre-Owned Carts", "home-card-images/pre-owned-carts.webp"],
  ["what_we_do", "built_to_order_carts", "Built-to-Order Carts", "home-card-images/built-to-order-carts.webp"],
  ["what_we_do", "service_repairs", "Service & Repairs", "home-card-images/service-repairs.webp"],
  ["what_we_do", "consign_sales", "Consign Sales", "home-card-images/consign-sales.webp"],
  ["feature_band", "built_to_order_feature", "Built-to-Order Feature", "smartchoice-current-site-images/IMG_0350+(3).jpg"],
  ["feature_band", "mobile_service_feature", "Mobile Service Feature", "smartchoice-current-site-images/IMG_8738+(2)+copy.jpg"],
  ["consignment", "consignment_feature", "Consignment Feature", "smartchoice-current-site-images/IMG_0067+(1).jpg"],
];

const inventoryImages = [
  ["2012-club-car-precedent-4900", "2012 Club Car Precedent", "available-inventory/IMG_9954.webp"],
  ["2012-club-car-precedent-4500", "2012 Club Car Precedent", "available-inventory/IMG_0887.webp"],
  ["2015-ezgo-rxv-new-batteries", "2015 EZGO RXV W/Brand New Batteries", "available-inventory/IMG_0380.webp"],
  ["2010-ezgo-rxv-4900", "2010 EZGO RXV", "available-inventory/IMG_9460.webp"],
  ["2002-club-car-ds-iq", '2002 Club Car DS "IQ"', "available-inventory/IMG_9324.webp"],
  ["2004-club-car-ds-iq-25mph", '04 Club Car DS "IQ" 25mph', "available-inventory/IMG_0958.webp"],
  ["2021-ezgo-txt-storm-edition", "2021 EZGO TXT Storm Edition", "available-inventory/IMG_0575.webp"],
  ["club-car-ds-new-batteries-2900", "Club Car DS With New Batteries", "available-inventory/IMG_0999.webp"],
  ["2011-yamaha-g29-new-batteries", "2011 Yamaha G29 W/New Batteries", "available-inventory/IMG_0115.webp"],
  ["2001-club-car-ds-3500", "01 Club Car DS", "available-inventory/IMG_0812.webp"],
  ["2021-ezgo-cushman-6-passenger", "2021 EZGO Cushman 6-Passenger Cart", "available-inventory/IMG_0133.webp"],
  ["2001-club-car-ds-new-batteries-2700", "2001 Club Car DS with new batteries", "available-inventory/IMG_0910.webp"],
];

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";
  return "image/jpeg";
}

async function uploadAndRecord(entry) {
  const publicPath = path.join(root, "public", entry.publicFile);

  if (!existsSync(publicPath)) {
    throw new Error(`Missing local file: ${publicPath}`);
  }

  let existingQuery = supabase
    .from("site_images")
    .select("id")
    .eq("page", entry.page)
    .eq("section_key", entry.sectionKey)
    .eq("slot_key", entry.slotKey);

  existingQuery = entry.itemId
    ? existingQuery.eq("item_id", entry.itemId)
    : existingQuery.is("item_id", null);

  const { data: existingRows, error: existingError } = await existingQuery;

  if (existingError) {
    throw existingError;
  }

  if (existingRows.length > 0) {
    console.log(`Already seeded: ${entry.label}`);
    return;
  }

  const storagePath = entry.storagePath;
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, readFileSync(publicPath), {
      cacheControl: "31536000",
      contentType: contentTypeFor(publicPath),
      upsert: false,
    });

  if (uploadError && !uploadError.message.includes("already exists")) {
    throw uploadError;
  }

  const { error: insertError } = await supabase.from("site_images").insert({
    page: entry.page,
    section_key: entry.sectionKey,
    slot_key: entry.slotKey,
    item_id: entry.itemId,
    storage_path: storagePath,
    alt_text: entry.alt,
    sort_order: entry.sortOrder,
  });

  if (insertError) {
    throw insertError;
  }

  console.log(`Seeded: ${entry.label}`);
}

const seedEntries = [
  ...homepageImages.map(([sectionKey, slotKey, label, publicFile]) => ({
    page: "homepage",
    sectionKey,
    slotKey,
    itemId: null,
    label,
    alt: label,
    publicFile,
    storagePath: `homepage/${sectionKey}/${slotKey}/${path.basename(publicFile)}`,
    sortOrder: 0,
  })),
  ...inventoryImages.map(([itemId, label, publicFile]) => ({
    page: "pre-owned-inventory",
    sectionKey: "inventory",
    slotKey: "gallery",
    itemId,
    label,
    alt: label,
    publicFile,
    storagePath: `inventory/${itemId}/${path.basename(publicFile)}`,
    sortOrder: 0,
  })),
];

for (const entry of seedEntries) {
  await uploadAndRecord(entry);
}

console.log("Done seeding Smart Choice site images.");
