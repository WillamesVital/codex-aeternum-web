# 📜 Codex Aeternum

> "O que foi criado para durar para sempre, agora mal sustenta um novo amanhecer"

Uma plataforma web interativa para o universo de RPG **Aeternum**, apresentando lore rica, sistema de criação de personagens e documentação completa de regras.

[![Deploy on Vercel](https://vercel.com/button)](https://codex-aeternumcom.vercel.app/)

---

## 🎯 Conceito

**Codex Aeternum** é uma aplicação web moderna que serve como compêndio digital para um sistema de RPG de mesa customizado. O projeto transforma um extenso documento Markdown de lore e regras em uma experiência web interativa, navegável e esteticamente imersiva.

### Propósito

- **Centralizar a Lore**: Toda a história, mitologia e worldbuilding do universo Aeternum em um só lugar
- **Facilitar a Criação de Personagens**: Interface intuitiva para jogadores criarem seus personagens
- **Documentar Regras**: Sistema de busca e navegação para encontrar rapidamente mecânicas de jogo
- **Imersão Visual**: Design temático que reflete a estética do mundo de Aeternum

---

## 🏗️ Arquitetura

### Stack Tecnológico

#### Core
- **[Next.js 16.0.3](https://nextjs.org)** - Framework React com App Router
- **[React 19.2.0](https://react.dev)** - Biblioteca UI
- **[TypeScript 5](https://www.typescriptlang.org)** - Type safety

#### Styling
- **[Tailwind CSS 3.4.17](https://tailwindcss.com)** - Utility-first CSS framework
- **[@tailwindcss/typography](https://github.com/tailwindcss/typography)** - Prose styling
- **Custom CSS Variables** - Sistema de cores temáticas (gold, parchment, dark)

#### UI & UX
- **[Framer Motion 12](https://www.framer.com/motion/)** - Animações fluidas
- **[Lucide React](https://lucide.dev)** - Ícones modernos
- **clsx + tailwind-merge** - Utilitários de className

#### Build & Deploy
- **[Vercel](https://vercel.com)** - Hosting e CI/CD
- **Webpack** - Bundler (configurado via `--webpack` flag)

### Estrutura de Pastas

```
codex-aeternum-web/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── search/              # Endpoint de busca
│   ├── characters/              # Página de criação de personagens
│   ├── codex/                   # Páginas do Codex
│   │   ├── [slug]/              # Páginas dinâmicas de capítulos
│   │   └── page.tsx             # Lista de capítulos
│   ├── globals.css              # Estilos globais e tema
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Homepage
│
├── components/                   # Componentes React
│   ├── ui/                      # Componentes base (Button, Card)
│   ├── Navbar.tsx               # Barra de navegação
│   ├── SearchModal.tsx          # Modal de busca
│   ├── TableOfContents.tsx      # Índice lateral
│   └── ScrollToTop.tsx          # Botão de voltar ao topo
│
├── lib/                         # Utilities e dados
│   ├── codex-content.json       # Conteúdo HTML dos capítulos (20MB)
│   ├── codex-data.ts            # Metadados dos capítulos
│   ├── extract-headings.ts      # Parser de headings para ToC
│   └── utils.ts                 # Utilitários (cn, etc)
│
├── public/                      # Assets estáticos
│
├── scripts/                     # Scripts de build/processamento
│
├── tailwind.config.ts           # Configuração Tailwind
├── next.config.ts               # Configuração Next.js
├── vercel.json                  # Configuração Vercel (webpack flag)
└── package.json                 # Dependências
```

### Fluxo de Dados

```mermaid
graph TD
    A[codex.md - 20MB] -->|Script de parse| B[codex-content.json]
    B --> C[Next.js Build]
    C --> D[Static Pages]
    C --> E[Dynamic Routes /codex/slug]
    E --> F[TableOfContents]
    E --> G[Chapter Content]
    H[SearchModal] -->|API Route| I[/api/search]
    I -->|Full-text search| B
```

---

## 🎨 Design System

### Paleta de Cores

O projeto utiliza um sistema de cores customizado inspirado em pergaminho antigo e ouro:

| Variável CSS | Cor | Uso |
|--------------|-----|-----|
| `--color-background` | `#0F172A` | Fundo escuro principal |
| `--color-foreground` | `#F5F5DC` | Texto claro (beige) |
| `--color-gold-400` | `#E6C360` | Highlights e hover |
| `--color-gold-500` | `#D4AF37` | Cor primária (dourado) |
| `--color-gold-600` | `#B5932B` | Variação escura |
| `--color-parchment-*` | `#FDF6E3` - `#E8DCC0` | Tons de pergaminho |

### Tipografia

- **Headings**: `Cinzel` (serif) - Estilo clássico e medieval
- **Body**: `Inter` (sans-serif) - Leitura moderna e legível

### Componentes

#### SearchModal
- Modal centralizado com backdrop blur
- Debounced search (300ms)
- Animações com framer-motion
- ESC para fechar

#### TableOfContents
- Sticky sidebar em desktop
- Auto-scroll para seção ativa
- Colapsa em mobile

#### ScrollToTop
- Aparece após 300px de scroll
- Animação fade + slide
- Posicionamento fixo bottom-right

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js 20+** ([Download](https://nodejs.org))
- **npm, yarn, pnpm ou bun**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/WillamesVital/codex-aeternum-web.git
   cd codex-aeternum-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3000) |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

### Build de Produção

```bash
npm run build
npm run start
```

O build otimizado será gerado em `.next/` e estará pronto para deploy.

---

## 📦 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. A configuração em `vercel.json` já está pronta:
   ```json
   {
     "buildCommand": "next build --webpack",
     "framework": "nextjs"
   }
   ```
3. Push para `master` → Deploy automático

### Configurações Importantes

- **Build Command**: `next build --webpack` (força webpack ao invés de Turbopack)
- **Framework**: Next.js 16.0.3
- **Node Version**: 20.x

---

## 🔍 Funcionalidades

### ✅ Implementadas

- [x] 📖 **Navegação de Capítulos** - Browse completo pela lore
- [x] 🔎 **Busca Full-Text** - Encontre qualquer conteúdo rapidamente
- [x] 📑 **Table of Contents** - Navegação interna de capítulos
- [x] ⬆️ **Scroll to Top** - Botão flutuante para voltar ao topo
- [x] 🎨 **Design Responsivo** - Mobile, tablet e desktop
- [x] ✨ **Animações Suaves** - Framer Motion em modais e transições
- [x] 🌙 **Dark Theme** - Esquema de cores escuro por padrão
- [x] ♿ **Acessibilidade** - ARIA labels e navegação por teclado

### 🚧 Roadmap

- [ ] 🧙 **Sistema de Criação de Personagens** - Interface completa
- [ ] 💾 **Salvamento Local** - LocalStorage para personagens
- [ ] 🎲 **Rolador de Dados** - Integração com mecânicas
- [ ] 📱 **PWA** - Instalação como app mobile
- [ ] 🌐 **i18n** - Suporte a múltiplos idiomas

---

## 🛠️ Troubleshooting

### Build com Turbopack Falha

**Problema**: Timeouts na Vercel ao usar Turbopack.

**Solução**: O projeto já está configurado para usar Webpack via `vercel.json`:
```json
{
  "buildCommand": "next build --webpack"
}
```

### Estilos não Aplicados

**Problema**: Classes Tailwind não funcionam.

**Solução**: Certifique-se de usar **Tailwind CSS v3** (não v4):
```bash
npm install -D tailwindcss@^3.4.17 autoprefixer@^10.4.20 postcss@^8.4.49
```

### Modal não Centralizado

**Problema**: SearchModal desalinhado.

**Solução**: Já corrigido com flexbox. Se persistir, verifique se `SearchModal.tsx` usa:
```tsx
<div className="fixed inset-0 flex items-center justify-center p-4">
```

---

## 🤖 IA & Ferramentas de Desenvolvimento

Este projeto foi desenvolvido utilizando uma abordagem de **Engenharia Assistida por IA**, onde inteligência artificial atua como par programador para acelerar o desenvolvimento, garantir qualidade de código e resolver problemas complexos de infraestrutura.

### Ferramentas Utilizadas

- **Agentes de IA**: Gemini Pro 3, ChatGPT 5 e Cloud Sonnet 4.5 foram fundamentais na geração de código, lógica complexa e debugging.
- **Editores**: [Antigravity](https://antigravity.google/) e VS Code.
- **Git & GitHub**: Controle de versão.

### Metodologia de Desenvolvimento

1. **Design System via IA**: A paleta de cores (Gold/Parchment) e tipografia foram refinadas com auxílio de IA para garantir contraste e estética temática.
2. **Componentes Complexos**: O `SearchModal` e `TableOfContents` foram implementados com lógica gerada por IA para lidar com regex, manipulação de DOM e animações.
3. **Resolução de Conflitos**: Problemas críticos como a incompatibilidade do Tailwind v4 e timeouts do Turbopack foram diagnosticados e resolvidos através de análise de logs por IA.

---

## 📄 Licença

Este projeto é privado e de uso pessoal para o sistema de RPG Aeternum.

---

## 👥 Autor

Desenvolvido por **Willames Vital** - [GitHub](https://github.com/WillamesVital)

---

## 🙏 Agradecimentos

- **Next.js Team** - Framework excepcional
- **Vercel** - Hosting e deploy seamless
- **Tailwind CSS** - Sistema de design produtivo
- **Framer Motion** - Animações de qualidade

---

**✨ Que sua jornada em Aeternum seja épica! ✨**
