import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const CODEX_PATH = path.join(process.cwd(), 'codex.md');
const OUTPUT_PATH = path.join(process.cwd(), 'lib', 'codex-content.json');

const romanToNum = {
    I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10,
    XI: 11, XII: 12, XIII: 13, XIV: 14, XV: 15, XVI: 16, XVII: 17
};

function parseChapterNumber(numStr) {
    // Se for número arábico
    if (/^\d+$/.test(numStr)) {
        return parseInt(numStr, 10);
    }
    // Se for romano
    return romanToNum[numStr.toUpperCase()] || null;
}

async function generateCodex() {
    console.log('Lendo codex.md...');
    const content = fs.readFileSync(CODEX_PATH, 'utf-8');

    // Regex mais flexível:
    // - Começa com # ou ##
    // - Espaço opcional
    // - ** opcional
    // - "Capítulo"
    // - Espaço
    // - Número (Romano ou Arábico)
    // - Espaço, traço, espaço
    // - Título (captura tudo até o fim da linha ou ** final)
    const chapterRegex = /#+ ?(?:\*\*)?Capítulo ([IVX0-9]+) - (.*?)(?:\*\*)?$/gm;

    let match;
    const chapters = {};

    // Encontrar todos os capítulos e seus índices
    const matches = [];
    while ((match = chapterRegex.exec(content)) !== null) {
        matches.push({
            numberStr: match[1],
            title: match[2].trim(), // Remove espaços extras e possíveis ** finais se o regex falhar em excluir
            index: match.index,
            fullMatch: match[0]
        });
    }

    console.log(`Encontrados ${matches.length} capítulos.`);

    for (let i = 0; i < matches.length; i++) {
        const current = matches[i];
        const next = matches[i + 1];

        const num = parseChapterNumber(current.numberStr);
        if (!num) {
            console.warn(`Número de capítulo inválido: ${current.numberStr}`);
            continue;
        }

        const chapterId = `chapter-${num}`;

        // O conteúdo começa logo após o cabeçalho atual e vai até o início do próximo (ou fim do arquivo)
        const startContent = current.index + current.fullMatch.length;
        const endContent = next ? next.index : content.length;

        let rawContent = content.slice(startContent, endContent).trim();

        // Converter markdown para HTML
        const htmlContent = await marked.parse(rawContent);

        chapters[chapterId] = htmlContent;
        console.log(`Processado ${chapterId}: ${current.title}`);
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(chapters, null, 2));
    console.log(`Conteúdo gerado em ${OUTPUT_PATH}`);
}

generateCodex().catch(console.error);
