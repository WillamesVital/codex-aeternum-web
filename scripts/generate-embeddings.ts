
import { createClient } from '@supabase/supabase-js';
import { google } from '@ai-sdk/google';
import { embedMany } from 'ai';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using anon key for client-side like ops, but for admin script usually service_role is better. 
// However, if RLS allows insert for anon or if we just use service role if available. 
// Let's check if user has SERVICE_ROLE_KEY. Usually not in .env.local for frontend.
// If RLS is set up, anon key might not work for writing unless policies allow it.
// For now, let's assume we might need to ask user for service role or just try with anon and see if it works (unlikely if RLS is secure).
// Actually, for a script, we should probably use a service role key if possible, but let's try to use the anon key and rely on the user running it locally where maybe they have policies? 
// Or better, ask user to add SUPABASE_SERVICE_ROLE_KEY to .env.local for this script?
// Let's stick to what we have. If it fails, we ask.
// Wait, the plan didn't specify service role.
// Let's check if we can use the anon key. If the table has no RLS, it works.
// If I created the table in the migration, I didn't enable RLS yet. So it should be fine.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const contentDir = path.join(process.cwd(), 'content');

async function getMarkdownFiles(dir: string): Promise<string[]> {
    let results: string[] = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await getMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    }
    return results;
}

async function generateEmbeddings() {
    console.log('🔮 Starting Oracle Ingestion...');

    const files = await getMarkdownFiles(contentDir);
    console.log(`Found ${files.length} markdown files.`);

    const documents: { content: string; metadata: any }[] = [];

    for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf-8');
        // Simple splitting by double newline (paragraphs)
        // We can improve this later with a proper text splitter if needed
        const chunks = content.split(/\n\s*\n/).filter(c => c.trim().length > 50); // Filter out too short chunks

        const relativePath = path.relative(process.cwd(), file);

        for (const chunk of chunks) {
            documents.push({
                content: chunk.trim(),
                metadata: { source: relativePath }
            });
        }
    }

    console.log(`Prepared ${documents.length} chunks for embedding.`);

    // Batch process to avoid hitting rate limits or payload limits
    const BATCH_SIZE = 50;

    for (let i = 0; i < documents.length; i += BATCH_SIZE) {
        const batch = documents.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i / BATCH_SIZE + 1}/${Math.ceil(documents.length / BATCH_SIZE)}...`);

        try {
            const { embeddings } = await embedMany({
                model: google.textEmbeddingModel('text-embedding-004'),
                values: batch.map(d => d.content),
            });

            const rows = batch.map((doc, index) => ({
                content: doc.content,
                metadata: doc.metadata,
                embedding: embeddings[index],
            }));

            const { error } = await supabase.from('documents').insert(rows);

            if (error) {
                console.error('Error inserting batch:', error);
            }
        } catch (err) {
            console.error('Error generating embeddings:', err);
        }
    }

    console.log('✨ Ingestion complete!');
}

generateEmbeddings().catch(console.error);
