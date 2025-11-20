import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';
import { ScrollToTop } from '@/components/ScrollToTop';
import { extractHeadings, injectHeadingIds, uniqueHeadings } from '@/lib/extract-headings';
import { Button } from "@/components/ui/Button";
import { getGrimoireChapterBySlug, getGrimoireSlugs } from '@/lib/grimoire-loader';
import { formatBlockquotes } from '@/lib/format-blockquotes';

// Forçar geração estática para todos os capítulos conhecidos
export async function generateStaticParams() {
    const slugs = getGrimoireSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function GrimoireChapter({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const chapter = await getGrimoireChapterBySlug(slug);

    if (!chapter) {
        notFound();
    }

    const { meta: chapterMeta } = chapter;
    const contentHtml = chapter.html;

    // Extrair headings e garantir IDs únicos
    const rawHeadings = contentHtml ? extractHeadings(contentHtml) : [];
    const headings = uniqueHeadings(rawHeadings);
    let content = contentHtml ? injectHeadingIds(contentHtml, headings) : null;

    // Converter citações (parágrafo + lista) em blockquotes para estilização
    if (content) {
        content = formatBlockquotes(content);
    }

    return (
        <div className="container mx-auto py-12 px-6 lg:px-12 max-w-[1600px]">
            <Link href="/grimoire">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Grimoire
                </Button>
            </Link>

            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
                {/* Conteúdo Principal */}
                <article className="prose prose-invert prose-gold max-w-none prose-lg">
                    <h1 className="font-cinzel text-4xl text-gold-500 mb-4">
                        {chapterMeta.title}
                    </h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        {chapterMeta.description}
                    </p>

                    {content ? (
                        <div
                            className="codex-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <div className="bg-card border border-gold-500/20 rounded-lg p-8">
                            <p className="text-center text-muted-foreground italic">
                                [Conteúdo não disponível para este capítulo.]
                            </p>
                        </div>
                    )}
                </article>

                {/* Table of Contents */}
                <TableOfContents headings={headings} />
            </div>

            <ScrollToTop />
        </div>
    );
}
