const doubleQuote = '&quot;';

function normalizeQuote(raw: string): string {
    return raw
        .replace(/^_+/, '')
        .replace(/_+$/, '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeSource(raw: string): string {
    return raw
        .replace(/<\/?em>/gi, '')
        .replace(/^_+/, '')
        .replace(/_+$/, '')
        .replace(/^[-–—\s]+/, '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function buildBlockquote(quote: string, source: string): string {
    const cleanQuote = normalizeQuote(quote);
    const cleanSource = normalizeSource(source);
    const sourceHtml = cleanSource ? `<ul><li><em>${cleanSource}</em></li></ul>` : '';
    return `<blockquote><p>${doubleQuote}${cleanQuote}${doubleQuote}</p>${sourceHtml}</blockquote>`;
}

function replaceMatch(
    _match: string,
    _openBlockquote: string | undefined,
    quote: string,
    sourceEm: string | undefined,
    sourcePlain: string | undefined,
    _closeBlockquote: string | undefined
): string {
    const source = sourceEm ?? sourcePlain ?? '';
    return buildBlockquote(quote, source);
}

export function formatBlockquotes(html: string): string {
    let content = html;

    const patterns = [
        /(<blockquote>\s*)?<p>\s*_?(?:&quot;|")([\s\S]*?)(?:&quot;|")_?\s*<br\s*\/?>\s*_?-?\s*(?:<em>([\s\S]*?)<\/em>|_?([\s\S]*?)_?)\s*<\/p>(\s*<\/blockquote>)?/gi,
        /(<blockquote>\s*)?<p>\s*(?:&quot;|")([\s\S]*?)(?:&quot;|")\s*<\/p>\s*<ul>\s*<li>\s*(?:<em>([\s\S]*?)<\/em>|_?([\s\S]*?)_?)\s*<\/li>\s*<\/ul>(\s*<\/blockquote>)?/gi,
        /(<blockquote>\s*)?<p>\s*(?:&quot;|")([\s\S]*?)(?:&quot;|")\s*<\/p>\s*<p>\s*(?:<em>([\s\S]*?)<\/em>|_?([\s\S]*?)_?)\s*<\/p>(\s*<\/blockquote>)?/gi,
    ];

    patterns.forEach((pattern) => {
        content = content.replace(pattern, replaceMatch);
    });

    return content;
}
