const codexContent = require('../lib/codex-content.json');

console.log('=== ANÁLISE COMPLETA DE CITAÇÕES ===\n');

let totalPattern1 = 0;
let totalPattern2 = 0;

Object.keys(codexContent).forEach(chapterKey => {
    const html = codexContent[chapterKey];

    // Padrão 1: <p>...</p> seguido de <ul><li><em>...</em></li></ul>
    const pattern1 = /<p>((?:[^<]|<br\s*\/?>|<\/?strong>|<\/?em>)*?)<\/p>\s*<ul>\s*<li>\s*<em>([^<]+)<\/em>\s*<\/li>\s*<\/ul>/gi;

    // Padrão 2: <p>_"Citação"<br>_- <em>Fonte</em></p>
    const pattern2 = /<p>(_)?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")<br\s*\/?>\s*_?-\s*<em>([^<]+)<\/em><\/p>/gi;

    const matches1 = html.match(pattern1) || [];
    const matches2 = html.match(pattern2) || [];

    totalPattern1 += matches1.length;
    totalPattern2 += matches2.length;

    if (matches1.length > 0 || matches2.length > 0) {
        console.log(`\n${chapterKey.toUpperCase()}:`);
        console.log(`  Padrão 1 (<p> + <ul>): ${matches1.length}`);
        console.log(`  Padrão 2 (inline): ${matches2.length}`);
        console.log(`  Total: ${matches1.length + matches2.length}`);
    }
});

console.log('\n=== RESUMO GERAL ===');
console.log(`Total Padrão 1: ${totalPattern1}`);
console.log(`Total Padrão 2: ${totalPattern2}`);
console.log(`TOTAL GERAL: ${totalPattern1 + totalPattern2} citações`);
console.log('\n✅ Todas as citações serão estilizadas!');
