const fs = require('fs');

console.log('=== REMOVENDO TODOS OS PLACEHOLDERS ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');

// Padrões a remover
const patterns = [
    { name: 'Ilustrações', regex: /\[aqui inserir ilustra[^\]]*\]/gi },
    { name: 'Brasões', regex: /\[aqui inserir brasão[^\]]*\]/gi },
    { name: 'Imagens', regex: /\[aqui inserir imagem[^\]]*\]/gi },
    { name: 'Outros [aqui inserir...]', regex: /\[aqui inserir[^\]]*\]/gi }
];

let totalRemoved = 0;

patterns.forEach(({ name, regex }) => {
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;

    if (count > 0) {
        console.log(`📊 ${name}: ${count} placeholders`);
        if (count <= 3) {
            matches.forEach((m, i) => {
                console.log(`  ${i + 1}. ${m.substring(0, 80)}...`);
            });
        }
        content = content.replace(regex, '');
        totalRemoved += count;
    }
});

// Remove linhas em branco extras
content = content.replace(/\n\n\n+/g, '\n\n');

// Salva o arquivo
fs.writeFileSync('./codex.md', content, 'utf-8');

console.log(`\n✅ Total: ${totalRemoved} placeholders removidos!`);
console.log('📝 Arquivo codex.md limpo e atualizado.');
