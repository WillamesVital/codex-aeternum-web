# Release Notes - Campaign Editing & Auth Flow

## 🚀 Novas Funcionalidades

### ✏️ Edição de Campanhas
- **Modal de Criação/Edição**: O `CreateCampaignModal` foi atualizado para suportar a edição de campanhas existentes, preenchendo o formulário com dados atuais.
- **Card de Campanha**: Adicionada ação de "Editar" no menu de opções do `CampaignCard`.
- **Gerenciamento de Estado**: A página de campanhas agora gerencia o estado de edição, permitindo alternar entre criar e editar.

### 🔐 Recuperação de Senha
- **Fluxo Completo**: Implementado o fluxo de "Esqueci minha senha" utilizando Supabase Auth.
- **Novas Páginas**:
    - `/forgot-password`: Formulário para envio do email de recuperação.
    - `/update-password`: Formulário para definição de nova senha após clique no link do email.
- **Callback**: Rota `/auth/callback` configurada para lidar com o redirecionamento seguro.

## 🐛 Correções

### 🛠️ Contexto de Campanhas
- **Erro de Tipagem**: Corrigido erro de tipo no `CampaignContext` onde propriedades como `synopsis` e `spiritualTheme` não estavam sendo mapeadas corretamente do objeto `data` para a interface `Campaign`.
- **Compatibilidade**: Melhorado o mapeamento para garantir que campos opcionais e legados sejam tratados adequadamente.

### 🔧 Outras Correções
- **Módulo Input**: Resolvido erro de importação do componente `Input` no modal de campanhas.
- **Testes E2E**: Corrigidos erros de tipagem nos testes E2E (propriedade `first` em Promise<void>).

## 📦 Refatoração

### 🛡️ Autenticação (Supabase)
- **Migração de Auth**: Refatoração completa do sistema de autenticação para utilizar o Supabase Auth.
- **AuthContext**: Atualização do contexto para gerenciar sessões, login, logout e estado do usuário via Supabase.
- **Middleware**: Ajustes no middleware para proteção de rotas baseada na sessão do Supabase.

### 🏗️ CampaignContext
- **Unificação de Lógica**: Lógica de `addCampaign` e `updateCampaign` unificada para garantir consistência na estrutura de dados salva no Supabase (colunas vs. JSONB).
