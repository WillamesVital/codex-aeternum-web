-- Criar a tabela de personagens (Updated Schema - No Level)
CREATE TABLE IF NOT EXISTS characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  lineage TEXT NOT NULL, -- Antigo Race/Povo
  vocation TEXT NOT NULL, -- Antigo Class/Vocação
  type TEXT NOT NULL DEFAULT 'PC' CHECK (type IN ('PC', 'NPC')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Create policies

DROP POLICY IF EXISTS "Users can view their own characters" ON characters;
CREATE POLICY "Users can view their own characters" 
ON characters FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own characters" ON characters;
CREATE POLICY "Users can insert their own characters" 
ON characters FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own characters" ON characters;
CREATE POLICY "Users can update their own characters" 
ON characters FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own characters" ON characters;
CREATE POLICY "Users can delete their own characters" 
ON characters FOR DELETE 
USING (auth.uid() = user_id);
