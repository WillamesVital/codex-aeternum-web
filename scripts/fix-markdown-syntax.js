const fs = require('fs');

console.log('=== CORRIGINDO ERROS DE SINTAXE MARKDOWN ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');

let fixedBold = 0;
let fixedItalic = 0;

// Processar cada linha
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const original = line;

    // Ignorar linhas de código, links de índice, e URLs
    if (line.match(/^```/) || line.match(/^\[.*\]\(#_/) || line.match(/^    /)) {
        continue;
    }

    // CORRIGIR ** NÃO FECHADO
    // Padrão comum: **Texto. (falta fechar antes do ponto)
    line = line.replace(/\*\*([^*]+?)\./g, (match, text) => {
        // Verifica se já tem ** de fechamento
        if (text.includes('**')) {
            return match; // Já está correto
        }
        fixedBold++;
        return `**${text}**.`;
    });

    // Padrão: **Texto (no final da linha sem fechar)
    if ((line.match(/\*\*/g) || []).length % 2 !== 0) {
        // Adiciona ** no final se terminar com ponto ou dois-pontos
        if (line.match(/\*\*[^*]+[.:]$/)) {
            line = line.replace(/(\*\*[^*]+)([.:])$/, '$1**$2');
            fixedBold++;
        }
    }

    // CORRIGIR _ NÃO FECHADO (mais conservador)
    // Padrão: _Texto (no final da linha sem fechar)
    const underscoreCount = (line.match(/_/g) || []).length;
    if (underscoreCount % 2 !== 0 && !line.includes('http') && !line.includes('#_')) {
        // Se começa com _ e não fecha
        if (line.match(/^_[^_]+$/) || line.match(/\s_[^_]+$/)) {
            line += '_';
            fixedItalic++;
        }
    }

    if (line !== original) {
        lines[i] = line;
        console.log(`✓ Linha ${i + 1}: Corrigida`);
    }
}

// Salvar arquivo corrigido
const fixedContent = lines.join('\n');
fs.writeFileSync('./codex.md', fixedContent, 'utf-8');

console.log(`\n=== RESUMO ===`);
console.log(`✅ ** corrigidos: ${fixedBold}`);
console.log(`✅ _ corrigidos: ${fixedItalic}`);
console.log(`📝 Arquivo codex.md atualizado!`);

if (fixedBold + fixedItalic > 0) {
    console.log(`\n⚠️  IMPORTANTE: Execute 'node scripts/generate-codex.mjs' para regenerar o HTML!`);
}
