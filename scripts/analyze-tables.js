const fs = require('fs');

console.log('=== ANALISANDO TABELAS NO CODEX.MD ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');

let inTable = false;
let tableCount = 0;
let issuesFound = 0;
let currentTableStart = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detecta início de tabela (linha com |)
    if (line.startsWith('|') && !inTable) {
        inTable = true;
        tableCount++;
        currentTableStart = i;
    }
    
    // Detecta fim de tabela
    if (inTable && !line.startsWith('|') && line !== '') {
        inTable = false;
    }
    
    // Verifica se é uma linha problemática (só com | --- | --- | ---)
    if (inTable && line.match(/^\|\s*---\s*\|\s*---\s*\|/)) {
        // Verifica se NÃO é a linha separadora do cabeçalho (segunda linha da tabela)
        if (i !== currentTableStart + 1) {
            issuesFound++;
            console.log(`\n❌ Problema encontrado na linha ${i + 1}:`);
            console.log(`   Contexto (linhas ${i - 1} a ${i + 2}):`);
            for (let j = Math.max(0, i - 1); j <= Math.min(lines.length - 1, i + 2); j++) {
                const marker = j === i ? '>>> ' : '    ';
                console.log(`${marker}${j + 1}: ${lines[j]}`);
            }
        }
    }
}

console.log(`\n=== RESUMO ===`);
console.log(`Total de tabelas encontradas: ${tableCount}`);
console.log(`Linhas --- problemáticas: ${issuesFound}`);

if (issuesFound > 0) {
    console.log(`\n⚠️  Encontradas ${issuesFound} linhas --- que precisam ser removidas!`);
} else {
    console.log(`\n✅ Nenhuma linha --- problemática encontrada!`);
}
