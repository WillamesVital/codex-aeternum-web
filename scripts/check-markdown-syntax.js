const fs = require('fs');

console.log('=== ANALISANDO ERROS DE SINTAXE MARKDOWN ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');

let errors = [];

// Função para contar ocorrências de um padrão
function countOccurrences(str, pattern) {
    return (str.match(new RegExp(pattern, 'g')) || []).length;
}

// Analisar cada linha
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Ignorar linhas de código (começam com 4 espaços ou tab, ou estão em blocos de código)
    if (line.match(/^    /) || line.match(/^```/)) {
        continue;
    }

    // Verificar ** não fechados
    const boldCount = countOccurrences(line, '\\*\\*');
    if (boldCount % 2 !== 0) {
        errors.push({
            line: lineNum,
            type: 'BOLD_INCOMPLETO',
            content: line.trim(),
            count: boldCount
        });
    }

    // Verificar _ não fechados (mas não em links ou URLs)
    // Conta apenas _ que não são parte de URLs ou _texto_
    const underscoreCount = countOccurrences(line, '_');
    const hasUrl = line.includes('http') || line.includes('www');

    if (underscoreCount % 2 !== 0 && !hasUrl) {
        errors.push({
            line: lineNum,
            type: 'ITALICO_INCOMPLETO',
            content: line.trim(),
            count: underscoreCount
        });
    }
}

// Agrupar por tipo
const boldErrors = errors.filter(e => e.type === 'BOLD_INCOMPLETO');
const italicErrors = errors.filter(e => e.type === 'ITALICO_INCOMPLETO');

console.log(`📊 RESUMO DE ERROS:\n`);
console.log(`  ** não fechados: ${boldErrors.length}`);
console.log(`  _ não fechados: ${italicErrors.length}`);
console.log(`  TOTAL: ${errors.length}\n`);

if (boldErrors.length > 0) {
    console.log(`\n❌ BOLD INCOMPLETO (** não fechado):\n`);
    boldErrors.slice(0, 10).forEach((err, i) => {
        console.log(`${i + 1}. Linha ${err.line}:`);
        console.log(`   ${err.content.substring(0, 100)}${err.content.length > 100 ? '...' : ''}\n`);
    });
    if (boldErrors.length > 10) {
        console.log(`   ... e mais ${boldErrors.length - 10} erros\n`);
    }
}

if (italicErrors.length > 0) {
    console.log(`\n❌ ITÁLICO INCOMPLETO (_ não fechado):\n`);
    italicErrors.slice(0, 10).forEach((err, i) => {
        console.log(`${i + 1}. Linha ${err.line}:`);
        console.log(`   ${err.content.substring(0, 100)}${err.content.length > 100 ? '...' : ''}\n`);
    });
    if (italicErrors.length > 10) {
        console.log(`   ... e mais ${italicErrors.length - 10} erros\n`);
    }
}

// Salvar relatório
const report = {
    total: errors.length,
    bold: boldErrors.length,
    italic: italicErrors.length,
    details: errors
};

fs.writeFileSync('./scripts/markdown-errors.json', JSON.stringify(report, null, 2));

console.log(`\n📄 Relatório completo salvo em: scripts/markdown-errors.json`);
