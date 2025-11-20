import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface CodexChapterMeta {
    slug: string;
    title: string;
    description: string;
    order: number;
    fileName: string;
}

export interface CodexChapterContent {
    meta: CodexChapterMeta;
    markdown: string;
    html: string;
}

const CODEX_DIR = path.join(process.cwd(), 'content', 'codex');

function readChapterFile(fileName: string) {
    const fullPath = path.join(CODEX_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return matter(fileContents);
}

function toMeta(fileName: string): CodexChapterMeta {
    const { data } = readChapterFile(fileName);
    const slug: string = data.slug || path.basename(fileName, path.extname(fileName));
    const title: string = data.title || slug;
    const description: string = (data.description || '').toString();
    const order: number = typeof data.order === 'number' ? data.order : Number(data.order) || 0;

    return {
        slug,
        title,
        description: description.trim(),
        order,
        fileName,
    };
}

export function getCodexChaptersMeta(): CodexChapterMeta[] {
    if (!fs.existsSync(CODEX_DIR)) {
        return [];
    }

    const files = fs
        .readdirSync(CODEX_DIR)
        .filter((file) => file.toLowerCase().endsWith('.md'));

    const chapters = files.map((file) => toMeta(file));
    return chapters.sort((a, b) => a.order - b.order);
}

export async function getCodexChapterBySlug(slug: string): Promise<CodexChapterContent | null> {
    const metaList = getCodexChaptersMeta();
    const meta = metaList.find((chapter) => chapter.slug === slug);

    if (!meta) {
        return null;
    }

    const parsed = readChapterFile(meta.fileName);
    const markdown = parsed.content.trim();
    const html = await marked.parse(markdown);

    return {
        meta: {
            ...meta,
            title: parsed.data.title || meta.title,
            description: (parsed.data.description || meta.description || '').toString().trim(),
        },
        markdown,
        html: typeof html === 'string' ? html : String(html),
    };
}

export function getCodexSlugs(): string[] {
    return getCodexChaptersMeta().map((chapter) => chapter.slug);
}
