const fs = require('fs');

console.log('=== CORRIGINDO ERROS ESPECÍFICOS ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
const lines = content.split('\n');
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const original = line;

    // PROBLEMA 1: Remover _ no início de linhas que são parágrafos normais (não citações)
    // Padrão: linha começa com _Texto (mas não é _"citação"_)
    if (line.match(/^_[^"*]/) && !line.match(/^_".*"_$/)) {
        line = line.replace(/^_/, '');
        console.log(`Linha ${i + 1}: Removido _ do início`);
        fixCount++;
    }

    // PROBLEMA 2: Remover ** extra no final de palavras
    // Padrão: palavra**. ou palavra**,
    line = line.replace(/(\w+)\*\*([.,;:])/g, '$1$2');
    if (line !== original && line.match(/(\w+)\*\*([.,;:])/)) {
        console.log(`Linha ${i + 1}: Removido ** extra`);
        fixCount++;
    }

    // PROBLEMA 3: #### **Texto****  →  #### **Texto**
    line = line.replace(/(####\s+\*\*[^*]+\*\*)\*\*/g, '$1');

    // PROBLEMA 4: **palavra**.**  →  **palavra**.
    line = line.replace(/(\*\*)\.\*\*/g, '$1.');

    // PROBLEMA 5: Remover ** solto no final de palavra sem par
    // Ex: palavra** (sem ** de abertura antes)
    const parts = line.split('**');
    if (parts.length % 2 === 0 && line.endsWith('**')) {
        // Número par de **, mas termina com **, significa que tem um ** extra
        line = line.slice(0, -2);
        console.log(`Linha ${i + 1}: Removido ** solto no final`);
        fixCount++;
    }

    lines[i] = line;
}

// Salvar
const fixedContent = lines.join('\n');
fs.writeFileSync('./codex.md', fixedContent, 'utf-8');

console.log(`\n✅ ${fixCount} erros específicos corrigidos!`);
console.log(`📝 Arquivo atualizado!`);
