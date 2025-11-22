import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface GrimoireChapterMeta {
    slug: string;
    title: string;
    description: string;
    order: number;
    fileName: string;
}

export interface GrimoireChapterContent {
    meta: GrimoireChapterMeta;
    markdown: string;
    html: string;
}

const GRIMOIRE_DIR = path.join(process.cwd(), 'content', 'grimoire');

function readChapterFile(fileName: string) {
    const fullPath = path.join(GRIMOIRE_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return matter(fileContents);
}

function toMeta(fileName: string): GrimoireChapterMeta {
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

export function getGrimoireChaptersMeta(): GrimoireChapterMeta[] {
    if (!fs.existsSync(GRIMOIRE_DIR)) {
        return [];
    }

    const files = fs
        .readdirSync(GRIMOIRE_DIR)
        .filter((file) => file.toLowerCase().endsWith('.md'));

    const chapters = files.map((file) => toMeta(file));
    return chapters.sort((a, b) => a.order - b.order);
}

export async function getGrimoireChapterBySlug(slug: string): Promise<GrimoireChapterContent | null> {
    const metaList = getGrimoireChaptersMeta();
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

export function getGrimoireSlugs(): string[] {
    return getGrimoireChaptersMeta().map((chapter) => chapter.slug);
}

export function getGrimoireAdjacentChapters(slug: string) {
    const chapters = getGrimoireChaptersMeta();
    const currentIndex = chapters.findIndex((chapter) => chapter.slug === slug);

    if (currentIndex === -1) {
        return { prev: null, next: null };
    }

    const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    return {
        prev: prev ? { slug: prev.slug, title: prev.title } : null,
        next: next ? { slug: next.slug, title: next.title } : null,
    };
}
