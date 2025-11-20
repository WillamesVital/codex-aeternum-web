const fs = require('fs');

const codexMd = fs.readFileSync('./codex.md', 'utf-8');
const codexContent = require('../lib/codex-content.json');

console.log('=== PROCURANDO PLACEHOLDERS ===\n');

// Padrões a procurar
const patterns = [
    /\[.*ilustra.*\]/gi,
    /\[.*inserir.*\]/gi,
    /\[.*imagem.*\]/gi,
    /\[aqui.*\]/gi,
    /_\[.*\]/gi,
    /\[TODO.*\]/gi,
    /\[PLACEHOLDER.*\]/gi
];

let foundInMd = false;
let foundInHtml = false;

console.log('📄 Procurando no codex.md...');
patterns.forEach((pattern, i) => {
    const matches = codexMd.match(pattern);
    if (matches && matches.length > 0) {
        console.log(`\n  Padrão ${i + 1}: ${pattern}`);
        matches.slice(0, 5).forEach(m => console.log(`    - ${m}`));
        if (matches.length > 5) console.log(`    ... e mais ${matches.length - 5}`);
        foundInMd = true;
    }
});

if (!foundInMd) {
    console.log('  ✅ Nenhum placeholder encontrado no Markdown\n');
}

console.log('🌐 Procurando no HTML gerado...');
Object.keys(codexContent).forEach(key => {
    patterns.forEach((pattern) => {
        const matches = codexContent[key].match(pattern);
        if (matches && matches.length > 0) {
            console.log(`\n  ${key}:`);
            matches.slice(0, 3).forEach(m => console.log(`    - ${m}`));
            foundInHtml = true;
        }
    });
});

if (!foundInHtml) {
    console.log('  ✅ Nenhum placeholder encontrado no HTML\n');
}

if (!foundInMd && !foundInHtml) {
    console.log('\n🎉 Nenhum placeholder encontrado em lugar nenhum!');
    console.log('O conteúdo está limpo.');
} else {
    console.log('\n⚠️  Placeholders encontrados! Veja acima.');
}
