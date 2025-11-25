-- 1. Truncate table to remove old data (incompatible with new Auth)
TRUNCATE TABLE campaigns;

-- 2. Revert user_id to UUID to reference auth.users
ALTER TABLE campaigns 
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- 3. Add Foreign Key constraint
ALTER TABLE campaigns 
  ADD CONSTRAINT campaigns_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id);

-- 4. Re-enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
