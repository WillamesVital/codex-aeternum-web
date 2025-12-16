-- Remove level column from characters table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'characters' AND column_name = 'level') THEN
    ALTER TABLE characters DROP COLUMN level;
  END IF;
END $$;
