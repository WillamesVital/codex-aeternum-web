import { NextResponse } from 'next/server';
import codexContent from '@/lib/codex-content.json';
import { codexChapters } from '@/lib/codex-data';

// Helper simples para remover tags HTML e obter texto puro
function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, ' ');
}

// Helper para extrair snippet ao redor do termo
function getSnippet(text: string, query: string, maxLength = 150) {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text.slice(0, maxLength);

    const start = Math.max(0, index - 60);
    const end = Math.min(text.length, index + query.length + 60);

    let snippet = text.slice(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Buscar em cada capítulo
    for (const chapter of codexChapters) {
        const contentHtml = (codexContent as Record<string, string>)[chapter.id];
        if (!contentHtml) continue;

        const plainText = stripHtml(contentHtml);

        // Verificar se o termo existe no título ou no conteúdo
        const titleMatch = chapter.title.toLowerCase().includes(lowerQuery);
        const contentMatch = plainText.toLowerCase().includes(lowerQuery);

        if (titleMatch || contentMatch) {
            results.push({
                id: chapter.id,
                title: chapter.title,
                description: chapter.description,
                snippet: contentMatch ? getSnippet(plainText, query) : chapter.description,
                matchType: titleMatch ? 'title' : 'content'
            });
        }
    }

    return NextResponse.json({ results });
}
