const doubleQuote = '&quot;';

const QUOTE_OPEN = '(?:&quot;|&ldquo;|“|")';
const QUOTE_CLOSE = '(?:&quot;|&rdquo;|”|")';

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
    original: string,
    _openBlockquote: string | undefined,
    quote: string,
    sourceEm: string | undefined,
    sourcePlain: string | undefined,
    _closeBlockquote: string | undefined
): string {
    if (!quote || !/(&quot;|&ldquo;|&rdquo;|"|“|”)/.test(original)) {
        return original;
    }

    const source = sourceEm ?? sourcePlain ?? '';
    return buildBlockquote(quote, source);
}

export function formatBlockquotes(html: string): string {
    let content = html;

    const patterns = [
        new RegExp(`(<blockquote>\\s*)?<p>\\s*_?${QUOTE_OPEN}([\\s\\S]*?)${QUOTE_CLOSE}_?\\s*<br\\s*\\/?>\\s*_?-?\\s*(?:<em>([\\s\\S]*?)<\\/em>|_?([\\s\\S]*?)_?)\\s*<\\/p>(\\s*<\\/blockquote>)?`, 'gi'),
        new RegExp(`(<blockquote>\\s*)?<p>\\s*_?${QUOTE_OPEN}([\\s\\S]*?)${QUOTE_CLOSE}_?\\s*<\\/p>\\s*<ul>\\s*<li>\\s*(?:<em>([\\s\\S]*?)<\\/em>|_?([\\s\\S]*?)_?)\\s*<\\/li>\\s*<\\/ul>(\\s*<\\/blockquote>)?`, 'gi'),
        new RegExp(`(<blockquote>\\s*)?<p>\\s*_?${QUOTE_OPEN}([\\s\\S]*?)${QUOTE_CLOSE}_?\\s*<\\/p>\\s*<p>\\s*(?:<em>([\\s\\S]*?)<\\/em>|_?([\\s\\S]*?)_?)\\s*<\\/p>(\\s*<\\/blockquote>)?`, 'gi'),
    ];

    patterns.forEach((pattern) => {
        content = content.replace(pattern, replaceMatch);
    });

    return content;
}
