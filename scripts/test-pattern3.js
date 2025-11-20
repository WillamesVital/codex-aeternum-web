const codexContent = require('../lib/codex-content.json');

console.log('=== TESTANDO NOVA REGEX (PAD RÃO 3) ===\n');

// HTML de teste (da citação real)
const test1 = '<p>_&quot;Assim termina o livro das sombras.<br>Que o leitor recorde:<br>conhecer a treva é advertência;<br>buscá-la é sentença.&quot;  </p>\n<ul>\n<li>_Códice das Sombras, Verso XX_</li>\n</ul>';

const test2 = '<p>&quot;O Altíssimo não mede o tempo em dias, mas em promessas.&quot;  </p>\n<ul>\n<li>_Códice do Desígnio, Verso XXXIII<br>_</li>\n</ul>';

const test3 = '<p>&quot;E o Verbo falou, e o silêncio se encheu de som.<br>E o som tornou-se mundo.&quot;  </p>\n<ul>\n<li>_Cântico dos Primogênitos, Verso I<br>_</li>\n</ul>';

const pattern3 = /<p>_?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")\s*<\/p>\s*<ul>\s*<li>\s*_([^<]+?)(?:<br\s*\/?>)?_?\s*<\/li>\s*<\/ul>/gi;

console.log('Teste 1:');
const result1 = test1.replace(pattern3, (match, openQuote, quote, closeQuote, source) => {
    const cleanSource = source.trim();
    return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${cleanSource}</em></li></ul></blockquote>`;
});
console.log(result1.includes('<blockquote>') ? '✅ CAPTURADO' : '❌ NÃO CAPTURADO');

console.log('\nTeste 2:');
const result2 = test2.replace(pattern3, (match, openQuote, quote, closeQuote, source) => {
    const cleanSource = source.trim();
    return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${cleanSource}</em></li></ul></blockquote>`;
});
console.log(result2.includes('<blockquote>') ? '✅ CAPTURADO' : '❌ NÃO CAPTURADO');

console.log('\nTeste 3:');
const result3 = test3.replace(pattern3, (match, openQuote, quote, closeQuote, source) => {
    const cleanSource = source.trim();
    return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${cleanSource}</em></li></ul></blockquote>`;
});
console.log(result3.includes('<blockquote>') ? '✅ CAPTURADO' : '❌ NÃO CAPTURADO');

// Contar quantas citações desse padrão existem
let count = 0;
Object.keys(codexContent).forEach(key => {
    const html = codexContent[key];
    const matches = html.match(pattern3);
    if (matches) {
        count += matches.length;
        console.log(`\n${key}: ${matches.length} citações do Padrão 3`);
    }
});

console.log(`\n=== TOTAL: ${count} citações do Padrão 3 encontradas ===`);
