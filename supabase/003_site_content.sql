create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  content_key text not null,
  item_id text not null default '',
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_content_page_check check (
    page in (
      'homepage',
      'pre-owned-inventory',
      'built-to-order',
      'services',
      'consignment',
      'gallery',
      'contact',
      'site'
    )
  )
);

create unique index if not exists site_content_lookup_unique
  on public.site_content (page, section_key, content_key, item_id);

create index if not exists site_content_page_idx
  on public.site_content (page, section_key, content_key);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anonymous content admin can insert site content" on public.site_content;
create policy "Anonymous content admin can insert site content"
  on public.site_content
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anonymous content admin can update site content" on public.site_content;
create policy "Anonymous content admin can update site content"
  on public.site_content
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Anonymous content admin can delete site content" on public.site_content;
create policy "Anonymous content admin can delete site content"
  on public.site_content
  for delete
  to anon, authenticated
  using (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.site_content to anon, authenticated;
