-- 1. Create the campaigns table (Adapted for Clerk)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Storing Clerk User ID as text
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Disable RLS (Since we are using Clerk client-side without Supabase JWTs for now)
ALTER TABLE campaigns DISABLE ROW LEVEL SECURITY;

-- 3. (Optional) Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
