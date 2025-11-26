# Release Notes v0.7.0 - Refatoração do Sistema de NPCs e Melhorias Visuais

## 🌟 Novas Funcionalidades

### Gestão de NPCs (Dramatis Personae)
- **Página Dedicada**: Nova página `/npcs` para gerenciamento centralizado de todos os NPCs.
- **Upload de Imagens**: Agora é possível adicionar avatares aos NPCs diretamente pelo modal de criação/edição.
  - As imagens são salvas no bucket `npc-avatars` do Supabase.
  - Visualização da imagem no card do NPC.
- **Zoom de Imagem (Lightbox)**: Ao clicar na imagem do NPC no card, ela é exibida em tamanho ampliado em um modal centralizado.
- **Associação de Campanha**:
  - NPCs podem ser criados globalmente (sem campanha) ou vinculados a uma campanha específica.
  - O card do NPC agora exibe o nome da campanha à qual ele pertence.
- **Linhagens**: Campo de "Raça" atualizado para "Linhagem" com opções predefinidas (Humano, Elenai, Ankarim, etc.).

### Melhorias de UI/UX
- **NpcCard**:
  - Design refinado com suporte a avatares.
  - Indicadores visuais de status (Vivo, Morto, etc.) com cores e ícones distintos.
  - Exibição condicional de botões de edição/exclusão dependendo do contexto (página global vs. detalhes da campanha).
- **Acessibilidade**: Melhorias na acessibilidade dos modais (DialogTitle oculto para leitores de tela).

## 🛠️ Correções de Bugs
- **Erro ao Salvar NPC**: Corrigido problema onde o `campaign_id` era enviado como string vazia, causando erro no banco de dados.
- **Corrupção de Arquivos**: Restaurados arquivos `NpcCard.tsx` e `NpcList.tsx` que haviam sido corrompidos, corrigindo erros de build.

## 📦 Alterações Técnicas
- **Tipagem**: Atualização das interfaces `Npc` e `CreateNpcDTO` para refletir as mudanças no banco de dados.
- **API**: Atualização da função `fetchNpcs` para suportar filtros por `userId` e `campaignId`, e para trazer o título da campanha associada (join).
