export interface Heading {
    id: string;
    text: string;
    level: number;
}

/**
 * Extrai headings (h2, h3, h4) de HTML e gera IDs para navegação
 */
export function extractHeadings(html: string): Heading[] {
    const headings: Heading[] = [];

    // Regex para capturar tags h2, h3, h4
    const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h\1>/gi;
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2]
            .replace(/<[^>]*>/g, '') // Remove tags HTML internas
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();

        // Gera ID a partir do texto (slug)
        const id = text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/-+/g, '-') // Remove hífens duplicados
            .replace(/^-|-$/g, ''); // Remove hífens no início/fim

        headings.push({ id, text, level });
    }

    return headings;
}

/**
 * Injeta IDs nos headings do HTML para permitir navegação por âncoras
 */
export function injectHeadingIds(html: string, headings: Heading[]): string {
    let modifiedHtml = html;

    headings.forEach((heading) => {
        // Escapa caracteres especiais de regex no texto do heading
        const escapedText = heading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`<h${heading.level}>([\\s\\S]*?${escapedText}[\\s\\S]*?)</h${heading.level}>`, 'i');
        modifiedHtml = modifiedHtml.replace(regex, `<h${heading.level} id="${heading.id}">$1</h${heading.level}>`);
    });

    return modifiedHtml;
}

/**
 * Garante que todos os headings tenham IDs únicos
 */
export function uniqueHeadings(headings: Heading[]): Heading[] {
    const seen = new Map<string, number>();
    return headings.map((h) => {
        let id = h.id;
        const count = seen.get(h.id) ?? 0;
        if (count > 0) {
            id = `${h.id}-${count}`;
        }
        seen.set(h.id, count + 1);
        return { ...h, id };
    });
}
