import { Button } from "@/components/ui/Button";
import { codexChapters } from "@/lib/codex-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import codexContent from "@/lib/codex-content.json";
import { extractHeadings, injectHeadingIds, uniqueHeadings } from "@/lib/extract-headings";
import { TableOfContents } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ChapterPage({ params }: PageProps) {
    const { slug } = await params;
    const chapter = codexChapters.find((c) => c.id === slug);

    if (!chapter) {
        notFound();
    }

    const contentHtml = (codexContent as Record<string, string>)[slug];

    // Extrair headings e garantir IDs únicos
    const rawHeadings = contentHtml ? extractHeadings(contentHtml) : [];
    const headings = uniqueHeadings(rawHeadings);
    let content = contentHtml ? injectHeadingIds(contentHtml, rawHeadings) : null;

    // Converter citações (parágrafo + lista) em blockquotes para estilização
    if (content) {
        // Padrão 1: <p>...</p> seguido de <ul><li><em>Fonte</em></li></ul>
        content = content.replace(
            /<p>((?:[^<]|<br\s*\/?>|<\/?strong>|<\/?em>)*?)<\/p>\s*<ul>\s*<li>\s*<em>([^<]+)<\/em>\s*<\/li>\s*<\/ul>/gi,
            '<blockquote><p>$1</p><ul><li><em>$2</em></li></ul></blockquote>'
        );

        // Padrão 2: <p>_"Citação"<br>_- <em>Fonte</em></p> (tudo em um único parágrafo)
        content = content.replace(
            /<p>(_)?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")<br\s*\/?>\s*_?-\s*<em>([^<]+)<\/em><\/p>/gi,
            (match, underscore, openQuote, quote, closeQuote, source) => {
                return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${source}</em></li></ul></blockquote>`;
            }
        );

        // Padrão 3: <p>_"Citação com <br>"</p> seguido de <ul><li>_Fonte_</li></ul> (sem tags <em>)
        content = content.replace(
            /<p>_?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")\s*<\/p>\s*<ul>\s*<li>\s*_([^<]+?)(?:<br\s*\/?>)?_?\s*<\/li>\s*<\/ul>/gi,
            (match, openQuote, quote, closeQuote, source) => {
                // Remove espaços extras e quebras de linha da fonte
                const cleanSource = source.trim();
                return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${cleanSource}</em></li></ul></blockquote>`;
            }
        );
    }

    return (
        <div className="container mx-auto py-12 px-6 lg:px-12 max-w-[1600px]">
            <Link href="/codex">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Codex
                </Button>
            </Link>

            <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
                {/* Conteúdo Principal */}
                <article className="prose prose-invert prose-gold max-w-none prose-lg">
                    <h1 className="font-cinzel text-4xl text-gold-500 mb-4">
                        {chapter.title}
                    </h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        {chapter.description}
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

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}
