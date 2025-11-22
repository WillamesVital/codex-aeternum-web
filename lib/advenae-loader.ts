import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const advenaeDirectory = path.join(process.cwd(), "content/advenae");

export interface AdvenaeChapterMeta {
    slug: string;
    title: string;
    order: number;
    description: string;
}

export interface AdvenaeChapter {
    meta: AdvenaeChapterMeta;
    content: string;
    html?: string;
}

export function getAdvenaeChaptersMeta(): AdvenaeChapterMeta[] {
    if (!fs.existsSync(advenaeDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(advenaeDirectory);
    const allChaptersData = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(advenaeDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title,
                order: data.order,
                description: data.description,
            } as AdvenaeChapterMeta;
        });

    return allChaptersData.sort((a, b) => a.order - b.order);
}

export function getAdvenaeSlugs(): string[] {
    return getAdvenaeChaptersMeta().map((chapter) => chapter.slug);
}

export async function getAdvenaeChapterBySlug(slug: string): Promise<AdvenaeChapter | null> {
    const fullPath = path.join(advenaeDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const html = await marked(content);

    return {
        meta: {
            slug,
            title: data.title,
            order: data.order,
            description: data.description,
        },
        content,
        html,
    };
}

export function getAdvenaeAdjacentChapters(slug: string) {
    const chapters = getAdvenaeChaptersMeta();
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
