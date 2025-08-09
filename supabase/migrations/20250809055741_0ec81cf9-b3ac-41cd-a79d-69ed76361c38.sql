-- Add bilingual fields to news table for English content
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS content_en text,
  ADD COLUMN IF NOT EXISTS summary_en text;

-- Note: RLS policies remain valid; published gating still applies regardless of language fields.
