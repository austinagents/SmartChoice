-- Run this after 001_site_images.sql on existing Supabase projects where
-- /admin intentionally uses localAdminBypass = true and the browser anon key.

drop policy if exists "Public can read site images" on public.site_images;
create policy "Public can read site images"
  on public.site_images
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert site images" on public.site_images;
drop policy if exists "Anonymous image admin can insert site images" on public.site_images;
create policy "Anonymous image admin can insert site images"
  on public.site_images
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can update site images" on public.site_images;
drop policy if exists "Anonymous image admin can update site images" on public.site_images;
create policy "Anonymous image admin can update site images"
  on public.site_images
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete site images" on public.site_images;
drop policy if exists "Anonymous image admin can delete site images" on public.site_images;
create policy "Anonymous image admin can delete site images"
  on public.site_images
  for delete
  to anon, authenticated
  using (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.site_images to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read site image files" on storage.objects;
create policy "Public can read site image files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-images');

drop policy if exists "Admins can upload site image files" on storage.objects;
drop policy if exists "Anonymous image admin can upload site image files" on storage.objects;
create policy "Anonymous image admin can upload site image files"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'site-images');

drop policy if exists "Admins can update site image files" on storage.objects;
drop policy if exists "Anonymous image admin can update site image files" on storage.objects;
create policy "Anonymous image admin can update site image files"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'site-images')
  with check (bucket_id = 'site-images');

drop policy if exists "Admins can delete site image files" on storage.objects;
drop policy if exists "Anonymous image admin can delete site image files" on storage.objects;
create policy "Anonymous image admin can delete site image files"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'site-images');
