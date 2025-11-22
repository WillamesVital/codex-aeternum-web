# Release Notes - Codex Aeternum v0.3.0

## 🚀 Novos Recursos

### 👤 Seção "Meus Personagens"
- **Lista de Personagens**: Usuários logados agora podem visualizar seus personagens na página `/characters`.
- **Card de Personagem**: Novo componente visual exibindo Nome, Raça, Classe, Nível e Tipo.
- **Empty State**: Interface amigável para usuários que ainda não criaram personagens, com incentivo à criação.

### ➕ Criação de Personagens
- **Fluxo Inicial**: Botão "Novo Personagem" adicionado.
- **Página de Criação**: Rota `/characters/new` preparada (atualmente em construção).

## 🎨 Melhorias de UI/UX

### 🎴 Design do Card
- **Layout Otimizado**: Informações organizadas hierarquicamente.
- **Tag de Tipo**: Identificação clara de "Personagem" (PC) ou "NPC", posicionada estrategicamente abaixo do nível.
- **Clean UI**: Remoção de elementos visuais desnecessários (avatar) para focar nas informações textuais essenciais.

## 🛠️ Técnico

### 🔧 Refatoração e Correções
- **Reversão de Avatar**: Removida implementação de imagem de avatar após revisão de design.
- **Correções de Sintaxe**: Ajustes na renderização condicional da lista de personagens.
- **Limpeza de Código**: Remoção de componentes não utilizados (`Avatar`).
