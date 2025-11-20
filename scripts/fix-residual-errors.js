const fs = require('fs');

console.log('=== CORRIGINDO ERROS RESIDUAIS ===\n');

let content = fs.readFileSync('./codex.md', 'utf-8');
let fixCount = 0;

// Corrigir padrões específicos que o script anterior criou incorretamente
// Padrão: palavra**.**  →  palavra**.
content = content.replace(/\*\*\.\*\*/g, '**.');
fixCount += (content.match(/\*\*\.\*\*/g) || []).length;

// Padrão: ####  **Texto** →  #### **Texto
content = content.replace(/#### \*\*([^*]+)\*\*\*\*/g, '#### **$1**');
fixCount += (content.match(/#### \*\*([^*]+)\*\*\*\*/g) || []).length;

// Padrão: palavra** **  →  palavra**
content = content.replace(/(\*\*) \*\*/g, '$1');
fixCount += (content.match(/(\*\*) \*\*/g) || []).length;

// Padrão: **texto**.**  →  **texto**.
content = content.replace(/(\*\*)\.\*\*/g, '$1.');
fixCount += (content.match(/(\*\*)\.\*\*/g) || []).length;

// Salvar
fs.writeFileSync('./codex.md', content, 'utf-8');

console.log(`✅ ${fixCount} erros residuais corrigidos!`);
console.log(`📝 Arquivo codex.md atualizado!`);
