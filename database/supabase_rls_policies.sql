-- Enable RLS (just in case it wasn't)
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to INSERT their own campaigns
CREATE POLICY "Users can insert their own campaigns"
ON campaigns FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to VIEW their own campaigns
CREATE POLICY "Users can view their own campaigns"
ON campaigns FOR SELECT
USING (auth.uid() = user_id);

-- Policy to allow users to UPDATE their own campaigns
CREATE POLICY "Users can update their own campaigns"
ON campaigns FOR UPDATE
USING (auth.uid() = user_id);

-- Policy to allow users to DELETE their own campaigns
CREATE POLICY "Users can delete their own campaigns"
ON campaigns FOR DELETE
USING (auth.uid() = user_id);
