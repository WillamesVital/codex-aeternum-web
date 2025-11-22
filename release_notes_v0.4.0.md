# Release Notes - v0.4.0

**Data:** 21 de Novembro de 2024

## 🎨 Novas Funcionalidades

### Homepage Revitalizada
- **Hero Section Aprimorado:** Novo design "Dark Fantasy" com gradiente radial e tipografia de destaque usando a fonte Cinzel.
- **Seção de Citação:** Adicionada seção de "flavor" com citação imersiva entre o Hero e os Cards de navegação.
- **Cards de Navegação:** Expandidos para 4 cards principais (Codex, Grimório, Liber Advenae, A Forja) com layout responsivo.

### Liber Advenae - O Livro do Jogador
- **Nova Seção Completa:** Integração do "Liber Advenae" ao sistema.
- **Estrutura de Conteúdo:** Criado diretório `content/advenae/` e loader dedicado (`lib/advenae-loader.ts`).
- **Prólogo Disponível:** Capítulo "A Porta que se Abre" publicado.
- **Páginas Dinâmicas:** Página de índice (`/advenae`) e páginas de capítulo (`/advenae/[slug]`).
- **Navegação Integrada:** 
  - Link no Navbar principal
  - Card dedicado na homepage
  - Breadcrumbs e navegação entre capítulos

### Melhorias de UX/UI

#### Codex & Grimório
- **Efeito Hover "Ler Capítulo":** Adicionado link animado que aparece ao passar o mouse sobre os cards, padronizando a experiência com o Liber Advenae.
- **Visual Aprimorado:** Cards agora exibem "Capítulo X" e ícone animado, melhorando a hierarquia visual.

#### Navegação
- **Ícone do Advenae:** Atualizado para Bússola (`Compass`), simbolizando a jornada do aventureiro e diferenciando-o do Grimório.
- **Galeria Restaurada:** Link da Galeria mantido no Navbar.

## 🐛 Correções de Bugs

- **Página de Personagens:** Corrigido erro de hidratação ao adicionar diretiva `"use client"` em `CharacterCard.tsx` e `app/characters/page.tsx`.
- **Navbar:** Corrigidos erros de sintaxe durante a integração do link do Advenae.

## 🎯 Melhorias Técnicas

- **Animações Tailwind:** Adicionada animação `fade-in` ao `tailwind.config.ts` para efeitos visuais suaves.
- **Consistência de Código:** Padronização da estrutura de cards entre Codex, Grimório e Advenae.
- **Loaders Reutilizáveis:** Função `getAdvenaeAdjacentChapters()` para navegação entre capítulos.

## 📝 Arquivos Modificados

### Novos Arquivos
- `content/advenae/prologo.md`
- `lib/advenae-loader.ts`
- `app/advenae/page.tsx`
- `app/advenae/[slug]/page.tsx`

### Arquivos Modificados
- `app/page.tsx` - Homepage revitalizada
- `components/Navbar.tsx` - Adicionado link Advenae + Galeria
- `app/codex/page.tsx` - Efeito hover "Ler Capítulo"
- `app/grimoire/page.tsx` - Efeito hover "Ler Capítulo"
- `app/characters/page.tsx` - Diretiva "use client"
- `components/characters/CharacterCard.tsx` - Diretiva "use client"
- `tailwind.config.ts` - Animação fade-in

## 🚀 Próximos Passos

- Expandir conteúdo do Liber Advenae (Capítulos de Criação de Personagem)
- Implementar funcionalidade de edição/exclusão de personagens
- Adicionar conteúdo à Galeria

---

**Desenvolvido com ⚔️ para Aeternum**
