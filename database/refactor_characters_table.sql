-- Rename columns to match new terminology (Race -> Lineage (Povo), Class -> Vocation (Vocação))
-- Also handle the 'type' column restriction if necessary (we basically ignore it or default to PC in app logic)

DO $$ 
BEGIN
  -- Rename race to lineage if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'characters' AND column_name = 'race') THEN
    ALTER TABLE characters RENAME COLUMN race TO lineage;
  END IF;

  -- Rename character_class to vocation if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'characters' AND column_name = 'character_class') THEN
    ALTER TABLE characters RENAME COLUMN character_class TO vocation;
  END IF;
  
  -- We can keep 'type' for compatibility but we will only insert 'PC' from now on.
END $$;
