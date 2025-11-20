const codexContent = require('../lib/codex-content.json');

console.log('=== ANÁLISE FINAL DE TODOS OS PADRÕES ===\n');

const pattern1 = /<p>((?:[^<]|<br\s*\/?>|<\/?strong>|<\/?em>)*?)<\/p>\s*<ul>\s*<li>\s*<em>([^<]+)<\/em>\s*<\/li>\s*<\/ul>/gi;
const pattern2 = /<p>(_)?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")<br\s*\/?>\s*_?-\s*<em>([^<]+)<\/em><\/p>/gi;
const pattern3 = /<p>_?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")\s*<\/p>\s*<ul>\s*<li>\s*_([^<]+?)(?:<br\s*\/?>)?_?\s*<\/li>\s*<\/ul>/gi;

let total1 = 0, total2 = 0, total3 = 0;

console.log('POR CAPÍTULO:\n');

Object.keys(codexContent).sort().forEach(key => {
    const html = codexContent[key];

    const matches1 = html.match(pattern1) || [];
    const matches2 = html.match(pattern2) || [];
    const matches3 = html.match(pattern3) || [];

    const total = matches1.length + matches2.length + matches3.length;

    if (total > 0) {
        console.log(`${key}:`);
        console.log(`  Padrão 1 (<p> + <ul> com <em>): ${matches1.length}`);
        console.log(`  Padrão 2 (inline com _-): ${matches2.length}`);
        console.log(`  Padrão 3 (<p>_"..." + <ul> sem <em>): ${matches3.length}`);
        console.log(`  TOTAL: ${total}\n`);
    }

    total1 += matches1.length;
    total2 += matches2.length;
    total3 += matches3.length;
});

console.log('=== RESUMO GERAL ===');
console.log(`Padrão 1: ${total1} citações`);
console.log(`Padrão 2: ${total2} citações`);
console.log(`Padrão 3: ${total3} citações`);
console.log(`─────────────────────────`);
console.log(`TOTAL GERAL: ${total1 + total2 + total3} citações`);
console.log('\n✅ Todas as citações serão estilizadas!');
