# Smart Choice Supabase Admin Setup

This site uses Supabase for owner-managed image changes on `/admin`.

## Required Environment Variables

Add these to `.env.local` for local testing and to Vercel Project Settings > Environment Variables for production:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard > Project Settings > API > Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard > Project Settings > API > Project API keys > anon public.

Use this only for the one-time local seed script. Do not add it as `NEXT_PUBLIC_*` and do not expose it in browser code:

- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Dashboard > Project Settings > API > Project API keys > service_role secret.

## Database, RLS, and Storage Setup

1. Open Supabase Dashboard for the `smartchoice` project.
2. Go to SQL Editor.
3. Paste and run `supabase/001_site_images.sql`.
4. Go to Authentication > Users and create the owner's user account.
5. Return to SQL Editor and run:

```sql
insert into public.admin_users (email)
values ('OWNER_EMAIL_HERE')
on conflict do nothing;
```

Replace `OWNER_EMAIL_HERE` with the exact email used for the Auth user.

## One-Time Image Seed

After the SQL has run and local `.env.local` contains the Supabase URL and service-role key, run:

```bash
npm run seed:images
```

The seed uploads the current public homepage and inventory images into the `site-images` Supabase Storage bucket and creates matching `site_images` rows. Existing `/public` files are left in place as safety fallbacks.

## Local Test

1. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
2. Run the SQL migration in Supabase.
3. Create the owner Auth user and add the same email to `public.admin_users`.
4. Run `npm run seed:images`.
5. Start the site locally and open `/admin`.
6. Log in as the owner, replace one low-risk image, and refresh `/` or `/pre-owned-inventory`.

## Production Test

1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel Environment Variables.
2. Deploy once.
3. Visit `https://www.smartchoicegolfcarts.com/admin`.
4. Log in as the owner and replace an image.
5. Refresh the public page that uses that image. The change should appear without a GitHub commit or another Vercel deployment.

Never put the service-role key in client code or a `NEXT_PUBLIC_*` variable.
