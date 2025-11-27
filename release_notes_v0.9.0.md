# Release Notes v0.9.0 - Vozes do Firmamentum (O Oráculo)

## 🌟 Novas Funcionalidades

### O Oráculo: Vozes do Firmamentum
- **Nova Página Dedicada**: Implementada em `/oracle`, oferecendo uma interface imersiva para consultas sobre o lore e regras.
- **Persona "Custódio da Memória"**: O Oráculo agora responde com uma personalidade solene e poética, agindo como um guardião dos registros antigos, aumentando a imersão.
- **Precisão Absoluta (Long Context)**:
  - Mudança arquitetural para leitura direta de **todos** os arquivos Markdown do projeto.
  - Eliminação de alucinações sobre mecânicas e lore.
  - Citações textuais precisas com fonte e livro (ex: *[Fonte: Capítulo 2 | Livro: Liber Advenae]*).

### Melhorias de UI/UX no Oráculo
- **Layout "Input First"**: A caixa de pergunta agora fica no topo, com a resposta surgindo abaixo, facilitando o foco na leitura.
- **Botão "Limpar"**: Nova funcionalidade para resetar a conversa e iniciar uma nova consulta rapidamente.
- **Adaptação de Temas**:
  - A interface agora respeita o tema global do site (Claro/Escuro).
  - **Modo Claro (Pergaminho)**: Fundo bege com texto escuro e detalhes dourados.
  - **Modo Escuro**: Fundo "void" com texto claro e detalhes dourados.
  - Mantém a estética mística em ambos os modos.

## 🛠️ Alterações Técnicas

### Arquitetura de IA
- **Remoção de RAG/Embeddings**: O sistema não depende mais da busca vetorial do Supabase para o Oráculo.
- **Modelo Gemini 2.0 Flash Lite**: Adoção do novo modelo com janela de contexto massiva para processar todo o conteúdo do Codex de uma só vez.
- **Leitura Recursiva de Arquivos**: A API (`app/api/chat/route.ts`) agora lê dinamicamente a pasta `content/` a cada requisição, garantindo que o Oráculo sempre tenha a versão mais recente das regras.

### Configuração
- **Variáveis de Ambiente**: Simplificação das dependências. O Oráculo requer apenas a `GOOGLE_GENERATIVE_AI_API_KEY` e acesso ao sistema de arquivos (pasta `content/`).

## 📦 Correções e Ajustes
- **Correção de Estilos**: Resolvido problema onde o texto do Oráculo ficava ilegível no modo claro.
- **Prevenção de Alucinações**: Regras estritas no System Prompt para impedir a invenção de raças, vocações ou mecânicas de jogo inexistentes.

## 📈 Estatísticas
- **Arquivos alterados**: `app/oracle/page.tsx`, `app/api/chat/route.ts`, `components/Navbar.tsx`.
- **Novo Modelo**: Migração para `gemini-2.0-flash-lite`.
