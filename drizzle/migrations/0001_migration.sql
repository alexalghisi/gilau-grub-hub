CREATE TABLE public.daily_menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_date date NOT NULL,
  source_text text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  images text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.daily_menus TO anon, authenticated;
GRANT ALL ON public.daily_menus TO service_role;
ALTER TABLE public.daily_menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published menus" ON public.daily_menus FOR SELECT TO anon, authenticated USING (published = true);
CREATE INDEX daily_menus_date_idx ON public.daily_menus (menu_date DESC);