-- Add bilingual fields to news table for English content
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS content_en text,
  ADD COLUMN IF NOT EXISTS summary_en text;

-- Optional: create a simple index for faster filtering by published and created_at (unchanged behavior)
-- Not strictly necessary for this change; skipping to keep migration minimal.

-- Note: RLS policies remain valid; published gating still applies regardless of language fields.
