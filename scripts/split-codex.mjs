import fs from 'fs';
import path from 'path';

const CODEX_PATH = path.join(process.cwd(), 'codex.md');
const OUTPUT_DIR = path.join(process.cwd(), 'content', 'codex');

const romanToNum = {
    I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10,
    XI: 11, XII: 12, XIII: 13, XIV: 14, XV: 15, XVI: 16, XVII: 17,
};

const metadata = [
    { slug: 'chapter-1', title: 'Capítulo I - O Mundo e Sua Eternidade Quebrada', description: 'A origem de Aeternum, a Queda e o estado atual do mundo.' },
    { slug: 'chapter-2', title: 'Capítulo II - O Livro do Desígnio', description: 'A teologia do Altíssimo, os Custódios e a cosmologia.' },
    { slug: 'chapter-3', title: 'Capítulo III - Os Povos da Criação', description: 'Humanos, Elenai, Ankarim, Nahari, Vayren e Auren.' },
    { slug: 'chapter-4', title: 'Capítulo IV - A Profecia dos Povos', description: 'Os sinais da restauração e o destino de Inferis.' },
    { slug: 'chapter-5', title: 'Capítulo V - O Livro das Ordens e da Vigília', description: 'As organizações que moldam a sociedade e a fé.' },
    { slug: 'chapter-6', title: 'Capítulo VI - O Livro das Eras e das Nações', description: 'História e geografia dos reinos de Aeternum.' },
    { slug: 'chapter-7', title: 'Capítulo VII - O Livro das Relíquias e das Fendas', description: 'Artefatos de poder e as cicatrizes do mundo.' },
    { slug: 'chapter-8', title: 'Capítulo VIII - O Livro dos Ecos e das Profecias', description: 'Fenômenos espirituais e visões do futuro.' },
    { slug: 'chapter-9', title: 'Capítulo IX - O Livro dos Povos e Linhagens', description: 'Detalhes profundos sobre as raças e suas culturas.' },
    { slug: 'chapter-10', title: 'Capítulo X - O Livro das Virtudes e Pecados', description: 'O sistema moral e a corrupção da alma.' },
    { slug: 'chapter-11', title: 'Capítulo XI - O Livro das Almas e Caminhos', description: 'A estrutura da alma e o véu interior.' },
    { slug: 'chapter-12', title: 'Capítulo XII - O Livro dos Caminhos e Vocação', description: 'Classes e arquétipos de personagens.' },
    { slug: 'chapter-13', title: 'Capítulo XIII - O Livro das Virtudes Ativas', description: 'Como as virtudes se manifestam em jogo.' },
    { slug: 'chapter-14', title: 'Capítulo XIV - O Livro da Vigília da Alma', description: 'Mecânicas de sanidade e corrupção.' },
    { slug: 'chapter-15', title: 'Capítulo XV - O Livro dos Dons e Sinais', description: 'Magia, milagres e manifestações sobrenaturais.' },
    { slug: 'chapter-16', title: 'Capítulo XVI - O Livro das Armas e Relíquias', description: 'Equipamentos lendários e itens sagrados.' },
    { slug: 'chapter-17', title: 'Capítulo XVII - O Livro da Guerra e da Glória', description: 'Conflitos épicos e o destino final.' },
];

const metaMap = new Map(metadata.map((entry, idx) => [entry.slug, { ...entry, order: idx + 1 }]));

function parseChapterNumber(value) {
    if (/^\d+$/.test(value)) {
        return parseInt(value, 10);
    }
    return romanToNum[value.toUpperCase()] ?? null;
}

function ensureOutputDir() {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function formatFrontmatter({ title, slug, order, description }) {
    return ['---', `title: "${title}"`, `slug: "${slug}"`, `order: ${order}`, `description: "${description}"`, '---', ''].join('\n');
}

function writeChapterFile({ slug, order, title, description, body }) {
    const fileName = `${String(order).padStart(2, '0')}-${slug}.md`;
    const frontmatter = formatFrontmatter({ title, slug, order, description });
    const fullContent = `${frontmatter}${body.trim()}\n`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), fullContent, 'utf8');
    console.log(`Gerado ${fileName}`);
}

function splitCodex() {
    if (!fs.existsSync(CODEX_PATH)) {
        console.error('codex.md não encontrado.');
        process.exit(1);
    }

    const content = fs.readFileSync(CODEX_PATH, 'utf8');
    const chapterRegex = /#+\s+\*{0,2}Capítulo ([IVX0-9]+) - (.*?)\*{0,2}\s*$/gmi;

    const matches = [];
    let match;
    while ((match = chapterRegex.exec(content)) !== null) {
        matches.push({
            numberStr: match[1],
            title: match[2].trim(),
            index: match.index,
            fullMatch: match[0],
        });
    }

    if (matches.length === 0) {
        console.error('Nenhum capítulo encontrado em codex.md');
        process.exit(1);
    }

    console.log(`Encontrados ${matches.length} capítulos.`);

    ensureOutputDir();

    for (let i = 0; i < matches.length; i++) {
        const current = matches[i];
        const next = matches[i + 1];
        const chapterNumber = parseChapterNumber(current.numberStr);
        if (!chapterNumber) {
            console.warn(`Capítulo com número inválido: ${current.numberStr}`);
            continue;
        }
        const slug = `chapter-${chapterNumber}`;
        const meta = metaMap.get(slug) ?? { slug, order: chapterNumber, title: `Capítulo ${current.numberStr} - ${current.title}`, description: '' };
        const start = current.index + current.fullMatch.length;
        const end = next ? next.index : content.length;
        const body = content.slice(start, end).trim();
        writeChapterFile({ ...meta, body });
    }
}

splitCodex();
