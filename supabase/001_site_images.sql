create schema if not exists app;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  slot_key text not null,
  item_id text,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_images_page_check check (page in ('homepage', 'pre-owned-inventory')),
  constraint site_images_sort_order_check check (sort_order >= 0)
);

create unique index if not exists site_images_single_slot_unique
  on public.site_images (page, section_key, slot_key)
  where item_id is null;

create index if not exists site_images_lookup_idx
  on public.site_images (page, section_key, slot_key, item_id, sort_order);

create or replace function app.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(admin_users.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admin_users enable row level security;
alter table public.site_images enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
  on public.admin_users
  for select
  to authenticated
  using (app.is_admin());

drop policy if exists "Public can read site images" on public.site_images;
create policy "Public can read site images"
  on public.site_images
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert site images" on public.site_images;
create policy "Admins can insert site images"
  on public.site_images
  for insert
  to authenticated
  with check (app.is_admin());

drop policy if exists "Admins can update site images" on public.site_images;
create policy "Admins can update site images"
  on public.site_images
  for update
  to authenticated
  using (app.is_admin())
  with check (app.is_admin());

drop policy if exists "Admins can delete site images" on public.site_images;
create policy "Admins can delete site images"
  on public.site_images
  for delete
  to authenticated
  using (app.is_admin());

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
create policy "Admins can upload site image files"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-images' and app.is_admin());

drop policy if exists "Admins can update site image files" on storage.objects;
create policy "Admins can update site image files"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-images' and app.is_admin())
  with check (bucket_id = 'site-images' and app.is_admin());

drop policy if exists "Admins can delete site image files" on storage.objects;
create policy "Admins can delete site image files"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-images' and app.is_admin());

-- After creating the owner Auth user, add that user's email here:
-- insert into public.admin_users (email) values ('owner@example.com') on conflict do nothing;
