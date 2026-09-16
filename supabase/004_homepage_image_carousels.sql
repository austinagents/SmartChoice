-- Allows homepage image slots to store ordered carousel images.
-- Existing rows and storage paths are preserved.

drop index if exists public.site_images_single_slot_unique;

create index if not exists site_images_homepage_carousel_lookup_idx
  on public.site_images (page, section_key, slot_key, sort_order)
  where item_id is null;
