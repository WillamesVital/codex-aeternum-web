-- Rename race to lineage
ALTER TABLE npcs RENAME COLUMN race TO lineage;

-- Add user_id column
ALTER TABLE npcs ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Make campaign_id nullable
ALTER TABLE npcs ALTER COLUMN campaign_id DROP NOT NULL;

-- Update RLS Policies
DROP POLICY IF EXISTS "Users can view NPCs of their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can insert NPCs into their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can update NPCs of their campaigns" ON npcs;
DROP POLICY IF EXISTS "Users can delete NPCs of their campaigns" ON npcs;

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
