const fs = require('fs');
const codexContent = require('../lib/codex-content.json');

console.log('=== ANALISANDO CITAÇÕES NÃO CAPTURADAS ===\n');

// Buscar citações do Capítulo 5 e 6
const chapter5 = codexContent['chapter-5'];
const chapter6 = codexContent['chapter-6'];

// Procurar por "Assim termina"
const idx1 = chapter5.indexOf('Assim termina');
if (idx1 > -1) {
    console.log('CITAÇÃO 1 (Cap 5):');
    console.log(chapter5.substring(idx1 - 50, idx1 + 300));
    console.log('\n---\n');
}

// Procurar por "O Altíssimo não mede"
const idx2 = chapter6.indexOf('O Altíssimo não mede');
if (idx2 > -1) {
    console.log('CITAÇÃO 2 (Cap 6):');
    console.log(chapter6.substring(idx2 - 50, idx2 + 250));
    console.log('\n---\n');
}

// Procurar por "E o Verbo falou"
const idx3 = chapter6.indexOf('E o Verbo falou');
if (idx3 > -1) {
    console.log('CITAÇÃO 3 (Cap 6):');
    console.log(chapter6.substring(idx3 - 50, idx3 + 200));
}
