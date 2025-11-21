# Release Notes - Codex Aeternum v0.2.0

## 🚀 Novos Recursos

### 🔐 Autenticação de Usuários (Clerk)
- **Sistema Completo de Login**: Implementado registro e login de usuários usando **Clerk**.
- **Páginas Dedicadas**: Novas rotas `/sign-in` e `/sign-up` com visual integrado ao tema.
- **Navbar Dinâmica**: O menu agora exibe botões de "Entrar/Cadastrar" para visitantes e o Avatar do usuário para logados.
- **Proteção de Rotas**: Middleware configurado para proteger rotas futuras (ex: criação de personagens).

### 🎨 Galeria de Artes
- **Nova Página `/gallery`**: Exposição de artes conceituais e ilustrações do universo.
- **Visualização Imersiva**: Grid responsivo e **Lightbox** (modal) para ver imagens em tela cheia.
- **Categorização**: Filtros para Artes Conceituais, Personagens, Locais e Itens.
- **Otimização**: Imagens carregadas via Next.js Image para performance.

### 📖 Grimoire Magistrum
- **Integração Completa**: O "Livro do Mestre" agora é totalmente navegável.
- **Renderização Markdown**: Suporte a formatação rica, tabelas e listas.
- **Navegação**: Table of Contents (ToC) gerado automaticamente para cada capítulo.

## 🐛 Correções de Bugs e Melhorias

- **Fix: Scroll do ToC no Codex**: Corrigido bug onde clicar no índice não levava à seção correta (problema com tags HTML dentro de títulos).
- **Fix: Erro 413 (Payload Too Large)**: Resolvido problema de deploy removendo imagens pesadas (base64) que estavam "inland" no Markdown do Capítulo 2.
- **Fix: Middleware Compatibility**: Ajuste na configuração do Middleware para compatibilidade com Next.js 16 + Turbopack.

## 🛠️ Técnico
- **Dependências**: Adicionado `@clerk/nextjs`.
- **Estrutura**: Criação de `lib/gallery-data.ts` para gerenciamento centralizado de assets.
