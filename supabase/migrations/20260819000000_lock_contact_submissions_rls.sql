-- Service role bypasses RLS. Remove public insert/select so the anon key
-- cannot read or write clinic enquiry PII.
drop policy if exists "contact_submissions_insert" on public.contact_submissions;
drop policy if exists "contact_submissions_select" on public.contact_submissions;
