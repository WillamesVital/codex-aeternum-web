const fs = require('fs');

console.log('=== VERIFICANDO TODAS AS TABELAS ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');

let inTable = false;
let tableCount = 0;
let tableStart = -1;
let brokenTables = 0;
let currentHeader = '';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detecta início de tabela
    if (trimmed.startsWith('|') && !inTable) {
        inTable = true;
        tableCount++;
        tableStart = i;
        currentHeader = lines[Math.max(0, i - 3)] || '';

        // Verifica se a próxima linha é um separador
        if (i + 1 < lines.length) {
            const nextLine = lines[i + 1].trim();
            if (!nextLine.match(/^\|\s*---/)) {
                brokenTables++;
                console.log(`❌ Tabela ${tableCount}: FALTA SEPARADOR (linha ${i + 1})`);
                console.log(`   Cabeçalho próximo: ${currentHeader.substring(0, 60)}`);
                console.log(`   Linha da tabela: ${trimmed.substring(0, 80)}...\n`);
            }
        }
    }

    // Detecta fim de tabela
    if (inTable && !trimmed.startsWith('|') && trimmed !== '') {
        inTable = false;
        tableStart = -1;
    }
}

console.log(`\n=== RESUMO ===`);
console.log(`Total de tabelas: ${tableCount}`);
console.log(`Tabelas OK: ${tableCount - brokenTables}`);
console.log(`Tabelas quebradas: ${brokenTables}`);

if (brokenTables > 0) {
    console.log(`\n⚠️  ${brokenTables} tabelas precisam de correção!`);
} else {
    console.log(`\n✅ Todas as tabelas estão OK!`);
}
