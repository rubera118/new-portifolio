-- ============================================================
-- UWAMWEZI PHIONAH PORTFOLIO — SUPABASE DATABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─── Enable UUID extension ───────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ─── 1. VISIT COUNTER ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS visit_counter (
  id      INTEGER PRIMARY KEY DEFAULT 1,
  count   BIGINT  NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed the single row
INSERT INTO visit_counter (id, count)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Function to atomically increment and return new count
CREATE OR REPLACE FUNCTION increment_visits()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE visit_counter
  SET count = count + 1,
      updated_at = NOW()
  WHERE id = 1
  RETURNING count INTO new_count;

  RETURN new_count;
END;
$$;


-- ─── 2. CONTACT MESSAGES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT        NOT NULL CHECK (char_length(name) >= 2),
  email      TEXT        NOT NULL,
  subject    TEXT,
  message    TEXT        NOT NULL CHECK (char_length(message) >= 10),
  read       BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);


-- ─── 3. PROJECTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  description      TEXT        NOT NULL,
  description_fr   TEXT,
  description_rw   TEXT,
  image_url        TEXT,
  live_url         TEXT,
  github_url       TEXT,
  tags             TEXT[]      NOT NULL DEFAULT '{}',
  featured         BOOLEAN     NOT NULL DEFAULT FALSE,
  "order"          INTEGER     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_order ON projects ("order" ASC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured);

-- Seed initial projects
INSERT INTO projects (title, description, description_fr, description_rw, live_url, github_url, tags, featured, "order")
VALUES
  (
    'Urban Bites Restaurant Website',
    'A multi-page responsive restaurant website built with HTML & CSS. Features include a menu, reservations page, gallery, and contact form — all with a mobile-first approach.',
    'Un site web de restaurant multi-pages responsive construit avec HTML & CSS. Comprend un menu, une page de réservation, une galerie et un formulaire de contact.',
    'Urubuga rwa resitora rufite impapuro nyinshi rwakozwe na HTML na CSS. Rufite menu, paji yo gufata aho, galeri no kanda kwitabira.',
    '#',
    'https://github.com/rubera118',
    ARRAY['HTML', 'CSS', 'Responsive', 'Multi-page'],
    TRUE,
    1
  ),
  (
    'Personal Portfolio Website',
    'An interactive full-stack personal portfolio with dark/light mode, multi-language support (EN/FR/RW), visit counter, contact form, and smooth animations. Built with React, FastAPI, and Supabase.',
    'Un portfolio personnel interactif full-stack avec mode sombre/clair, support multilingue (EN/FR/RW), compteur de visites et formulaire de contact.',
    'Urubuga rw''umuntu bwite bwuzuye bufite uburyo bwo guhindura ibara no gutunga indimi nyinshi (EN/FR/RW).',
    '#',
    'https://github.com/rubera118',
    ARRAY['React', 'FastAPI', 'Supabase', 'TypeScript', 'Tailwind'],
    TRUE,
    2
  )
ON CONFLICT DO NOTHING;


-- ─── 4. BLOG POSTS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT        UNIQUE NOT NULL,
  title       TEXT        NOT NULL,
  title_fr    TEXT,
  title_rw    TEXT,
  excerpt     TEXT        NOT NULL,
  excerpt_fr  TEXT,
  excerpt_rw  TEXT,
  content     TEXT,
  cover_image TEXT,
  tags        TEXT[]      NOT NULL DEFAULT '{}',
  published   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ─── 5. ROW LEVEL SECURITY (RLS) ─────────────────────────────

-- visit_counter: public read + increment via function only
ALTER TABLE visit_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read visit_counter"
  ON visit_counter FOR SELECT USING (true);
-- Writes handled by SECURITY DEFINER function above

-- contact_messages: insert only for anon; select/update for service role
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon insert contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow service read contact_messages" ON contact_messages;
CREATE POLICY "Allow anon insert contact_messages"
  ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service read contact_messages"
  ON contact_messages FOR SELECT USING (auth.role() = 'service_role');
GRANT INSERT ON contact_messages TO anon, authenticated;

-- projects: public read; write for service role only
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read projects" ON projects;
DROP POLICY IF EXISTS "Allow service write projects" ON projects;
CREATE POLICY "Allow public read projects"
  ON projects FOR SELECT USING (true);
CREATE POLICY "Allow service write projects"
  ON projects FOR ALL USING (auth.role() = 'service_role');
GRANT SELECT ON projects TO anon, authenticated;

-- blog_posts: public read published only; service role full access
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read published blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow service full access blog_posts" ON blog_posts;
CREATE POLICY "Allow public read published blog_posts"
  ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow service full access blog_posts"
  ON blog_posts FOR ALL USING (auth.role() = 'service_role');
GRANT SELECT ON blog_posts TO anon, authenticated;


-- ─── DONE ─────────────────────────────────────────────────────
-- To verify: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
