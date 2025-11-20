const testHtml = `<p>_&quot;E o Altíssimo contemplou o que fez, e viu que era bom.<br>E mesmo quando o bom se tornou quebrado,<br>Ele prometeu: o quebrado ainda Me glorificará.&quot;<br>_- <em>Fragmento do Livro do Desígnio, Capítulo II</em></p>`;

const pattern = /<p>(_)?(&quot;|")((?:[^<]|<br\s*\/?>)*?)(&quot;|")<br\s*\/?>\s*_?-\s*<em>([^<]+)<\/em><\/p>/gi;

const result = testHtml.replace(pattern, (match, underscore, openQuote, quote, closeQuote, source) => {
    return `<blockquote><p>${openQuote}${quote}${closeQuote}</p><ul><li><em>${source}</em></li></ul></blockquote>`;
});

console.log('Original:', testHtml);
console.log('\nResultado:', result);
console.log('\nSUCESSO:', result.includes('blockquote') ? 'SIM ✅' : 'NÃO ❌');
