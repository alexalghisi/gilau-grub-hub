CREATE TABLE public.fb_connection (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  page_id text NOT NULL,
  page_name text,
  page_token text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.fb_connection TO service_role;
ALTER TABLE public.fb_connection ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.fb_posts (
  id text PRIMARY KEY,
  message text,
  images text[] NOT NULL DEFAULT '{}',
  permalink text,
  created_time timestamptz NOT NULL,
  synced_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fb_posts TO anon, authenticated;
GRANT ALL ON public.fb_posts TO service_role;
ALTER TABLE public.fb_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read posts" ON public.fb_posts FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX fb_posts_created_idx ON public.fb_posts (created_time DESC);

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;