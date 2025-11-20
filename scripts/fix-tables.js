const fs = require('fs');

console.log('=== CORRIGINDO TABELAS DO CODEX ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');

let inTable = false;
let tableStart = -1;
let fixedCount = 0;
const newLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detecta início de tabela (linha com |)
    if (trimmed.startsWith('|') && !inTable) {
        inTable = true;
        tableStart = i;
        newLines.push(line);

        // Próxima linha: verifica se precisa adicionar separador
        if (i + 1 < lines.length) {
            const nextLine = lines[i + 1].trim();
            // Se a próxima linha NÃO é um separador válido, adiciona um
            if (!nextLine.match(/^\|\s*---/)) {
                // Conta quantas colunas tem o cabeçalho
                const columns = line.split('|').length - 2; // Remove primeiro e último vazio
                const separator = '| ' + Array(columns).fill('---').join(' | ') + ' |';
                newLines.push(separator);
                fixedCount++;
                console.log(`✓ Adicionada linha separadora após linha ${i + 1}`);
            }
        }
        continue;
    }

    // Detecta fim de tabela
    if (inTable && !trimmed.startsWith('|') && trimmed !== '') {
        inTable = false;
        tableStart = -1;
    }

    // Remove linhas vazias dentro de tabelas (exceto a separadora)
    if (inTable && trimmed.match(/^\|\s*\|\s*\|\s*\|/)) {
        // Linha vazia (só com |  |  |)
        console.log(`✗ Removida linha vazia na linha ${i + 1}`);
        fixedCount++;
        continue;
    }

    newLines.push(line);
}

// Salva o arquivo corrigido
const fixedContent = newLines.join('\n');
fs.writeFileSync('./codex.md', fixedContent, 'utf-8');

console.log(`\n✅ ${fixedCount} correções aplicadas!`);
console.log('📝 Arquivo codex.md atualizado.');
