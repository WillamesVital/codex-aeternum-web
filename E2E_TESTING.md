# E2E Testing Guide - Codex Aeternum

## 📋 Visão Geral

Este projeto utiliza **Playwright** para testes End-to-End (E2E) automatizados, garantindo que todas as funcionalidades críticas estejam funcionando antes de cada deploy.

## 🚀 Configuração Inicial

### Instalar Navegadores Playwright

```bash
npx playwright install
```

## 🧪 Executando Testes

### Executar Todos os Testes

```bash
npm run test:e2e
```

### Executar com Interface Gráfica (Modo UI)

```bash
npm run test:e2e:ui
```

### Executar com Navegador Visível

```bash
npm run test:e2e:headed
```

### Debugar Testes

```bash
npm run test:e2e:debug
```

### Executar Teste Específico

```bash
npx playwright test e2e/homepage.spec.ts
```

### Executar em Navegador Específico

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📁 Estrutura de Testes

```
e2e/
├── homepage.spec.ts           # Testes da página inicial
├── codex-navigation.spec.ts   # Navegação e conteúdo do Codex
├── grimoire-navigation.spec.ts # Navegação e conteúdo do Grimório
├── advenae-navigation.spec.ts  # Navegação do Liber Advenae
├── characters.spec.ts          # Página de personagens
└── navbar.spec.ts              # Navegação principal
```

## 🎯 Cobertura de Testes

### Homepage
- ✅ Carregamento e título
- ✅ Cards de navegação
- ✅ CTAs funcionais
- ✅ Seção de citação

### Codex & Grimório
- ✅ Listagem de capítulos
- ✅ Efeito hover "Ler Capítulo"
- ✅ Navegação entre capítulos
- ✅ Breadcrumbs
- ✅ Table of Contents

### Liber Advenae
- ✅ Página de índice
- ✅ Ícone Compass
- ✅ Navegação para prólogo
- ✅ Renderização de conteúdo

### Navbar
- ✅ Todos os links principais
- ✅ Navegação funcional
- ✅ Botão de busca

### Characters
- ✅ Carregamento da página
- ✅ Breadcrumbs
- ✅ Cards de personagem (quando disponíveis)

## 🔄 CI/CD Pipeline

### GitHub Actions

O pipeline está configurado em `.github/workflows/ci.yml` e executa automaticamente em:

- **Push** para branches `main` e `develop`
- **Pull Requests** para `main`

### Fluxo do Pipeline

1. **Test Job:**
   - Instala dependências
   - Instala navegador Chromium
   - Executa testes E2E
   - Faz upload de relatórios em caso de falha

2. **Deploy Job (apenas `main`):**
   - Executa SOMENTE se os testes passarem
   - Faz deploy para Vercel

### Configuração de Secrets

Para habilitar o deploy automático, configure os seguintes secrets no GitHub:

1. Acesse: `Settings > Secrets and variables > Actions > New repository secret`

2. Adicione:
   - `VERCEL_TOKEN` - Token de deploy do Vercel ([obter aqui](https://vercel.com/account/tokens))
   - `VERCEL_ORG_ID` - ID da organização Vercel
   - `VERCEL_PROJECT_ID` - ID do projeto Vercel

Para obter `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`:
```bash
npx vercel link
# Verifique o arquivo .vercel/project.json
```

## 📊 Relatórios

### Visualizar Relatório HTML

Após executar os testes, um relatório HTML é gerado automaticamente:

```bash
npx playwright show-report
```

### Artefatos no GitHub Actions

Em caso de falha, o relatório completo fica disponível como artefato na aba "Actions" do repositório.

## 🐛 Debugging

### Modo Trace

Para analisar falhas:

```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Modo Headful

Para ver o navegador durante a execução:

```bash
npm run test:e2e:headed
```

## ✅ Checklist Pré-Deploy

- [ ] Todos os testes passando localmente
- [ ] Build da aplicação sem erros (`npm run build`)
- [ ] Secrets configurados no GitHub (se deploy via Actions)
- [ ] Pipeline CI executado com sucesso

## 🔧 Troubleshooting

### Erro: "Browsers not installed"

```bash
npx playwright install
```

### Erro: "Port 3000 already in use"

Certifique-se de que nenhum servidor de desenvolvimento está rodando antes de executar os testes.

### Testes Lentos

Use a flag `--workers=1` para executar testes sequencialmente:

```bash
npx playwright test --workers=1
```

## 📚 Recursos

- [Documentação Playwright](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Inspector](https://playwright.dev/docs/debug#playwright-inspector)

---

**Bons testes! ⚔️**
