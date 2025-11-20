import { Button } from "@/components/ui/Button";
import { codexChapters } from "@/lib/codex-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import codexContent from "@/lib/codex-content.json";
import { extractHeadings, injectHeadingIds, uniqueHeadings } from "@/lib/extract-headings";
import { TableOfContents } from "@/components/TableOfContents";
import { ScrollToTop } from "@/components/ScrollToTop";
import { formatBlockquotes } from "@/lib/format-blockquotes";

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
    let content = contentHtml ? injectHeadingIds(contentHtml, headings) : null;

    // Converter citações (parágrafo + lista) em blockquotes para estilização
    if (content) {
        content = formatBlockquotes(content);
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
