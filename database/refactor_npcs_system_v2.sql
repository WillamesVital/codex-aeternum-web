-- Add user_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'npcs' AND column_name = 'user_id') THEN
        ALTER TABLE npcs ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
END $$;

-- Make campaign_id nullable
ALTER TABLE npcs ALTER COLUMN campaign_id DROP NOT NULL;

-- Update RLS Policies
DROP POLICY IF EXISTS "Users can view NPCs of their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can insert NPCs into their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can update NPCs of their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can delete NPCs of their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can manage own NPCs" ON npcs; -- Drop if exists from failed run

-- New Policy: Users can manage NPCs they own (via user_id) OR NPCs in their campaigns (legacy/fallback)
CREATE POLICY "Users can manage own NPCs" ON npcs
  USING (
    auth.uid() = user_id 
    OR 
    (campaign_id IS NOT NULL AND EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = npcs.campaign_id AND campaigns.user_id = auth.uid()))
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    (campaign_id IS NOT NULL AND EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = npcs.campaign_id AND campaigns.user_id = auth.uid()))
  );
