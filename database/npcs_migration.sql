-- Create NPCs table
CREATE TABLE IF NOT EXISTS npcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  race TEXT,
  role TEXT,
  status TEXT DEFAULT 'alive', -- 'alive', 'dead', 'missing', 'spirit'
  location TEXT,
  description TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;

-- Create policies (assuming users can only see/edit NPCs from their own campaigns)
-- We need to join with campaigns to check user_id, or if we trust the campaign_id check.
-- A simpler approach for now if we don't have a direct user_id on npcs is to rely on the campaign ownership.

-- Policy: Users can view NPCs of campaigns they own
CREATE POLICY "Users can view NPCs of their campaigns" ON npcs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = npcs.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Policy: Users can insert NPCs into their campaigns
CREATE POLICY "Users can insert NPCs into their campaigns" ON npcs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Policy: Users can update NPCs of their campaigns
CREATE POLICY "Users can update NPCs of their campaigns" ON npcs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = npcs.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Policy: Users can delete NPCs of their campaigns
CREATE POLICY "Users can delete NPCs of their campaigns" ON npcs
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = npcs.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );
