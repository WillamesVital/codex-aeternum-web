# Release Notes v0.8.0 - Expansão do Liber Advenae e Sistema de Campanhas

## 🌟 Novas Funcionalidades

### Liber Advenae - Conteúdo Completo
- **Integração de 5 Novos Capítulos**: Adicionados os capítulos 4, 5, 6, 7 e 8 ao Liber Advenae (Manual do Jogador).
  - **Capítulo 4**: Continuação do conteúdo narrativo e mecânico do sistema.
  - **Capítulo 5**: Mecânicas avançadas e desenvolvimento de personagem.
  - **Capítulo 6**: Sistema de linhagens e suas características únicas.
  - **Capítulo 7 - Os Caminhos (Vocatio)**: Sistema completo de vocações espirituais que define a identidade dos personagens.
    - 8 Caminhos oficiais: Guardião, Portador da Luz, Penitente, Cronista, Curador, Peregrino, Visionário.
    - Cada Caminho inclui: virtude reforçada, pecado tentador, bônus de atributo, perícia, Don Menor inicial e habilidade única.
  - **Capítulo 8 - Dons Menores e Maiores (Potestates)**: Sistema completo de manifestações espirituais.
    - 24 Dons Menores divididos em três categorias (Corpus, Anima, Spiramen).
    - 16 Dons Maiores organizados em três tipos (Luz, Cinza, Fenda).
    - Sistema de progressão e aquisição de novos Dons.
- **Navegação Aprimorada**: Todos os capítulos integrados ao sistema de navegação existente com Table of Contents dinâmico.

### Sistema de Campanhas
- **Páginas de Campanha Dedicadas**: Nova estrutura de páginas para gerenciamento individual de campanhas em `/campaigns/[id]`.
- **Gestão de Sessões**:
  - Criação e edição de sessões de jogo.
  - Modais dedicados para criação/edição de sessões (`CreateSessionModal.tsx`).
  - Sistema de envio de emails para sessões via API.
- **Melhorias no Modal de Criação**: Refinamento do `CreateCampaignModal.tsx` com melhor UX e validação.

### DM Screen (Tela do Mestre)
- **Ferramentas do Mestre**: Introdução de recursos específicos para mestres de jogo.
- **Assets Temáticos**: Nova coleção de recursos visuais para ambientação.
  - Tema padrão com configurações em JSON (`theme.config.json`).
  - Assets visuais incluindo texturas difusas (`diffuse-dark.png`).
  - Integração com Three.js/Ammo.js para elementos 3D (`ammo.wasm.wasm`).

### Melhorias de UI/UX
- **Componentes de Interface**: Novos componentes estruturais para suportar as funcionalidades de campanha.
- **Configuração Aprimorada do Tailwind**: Ajustes na configuração do Tailwind (`tailwind.config.ts`) para suportar novos temas e estilos.
- **Responsividade**: Melhorias gerais na responsividade da aplicação.

## 🛠️ Correções de Bugs
- **Navegação do Advenae**: Corrigido problema de renderização na página principal do Advenae (`app/advenae/page.tsx`).
- **Páginas de Campanha**: Correções de bugs relacionados à exibição e navegação em páginas de campanha individual.

## 📦 Alterações Técnicas
- **Estrutura de Conteúdo**: Expansão significativa do diretório `content/advenae/` com 5 novos arquivos markdown completos.
- **Sistema de Temas**: Introdução de sistema de assets temáticos em `public/assets/themes/`.
- **Integração 3D**: Adição de suporte para física 3D via Ammo.js WASM.
- **API de Sessões**: Nova rota de API para gerenciamento de emails de sessões.
- **Tipagem**: Atualização de interfaces e tipos para suportar novos recursos de campanha e sessão.

## 📈 Estatísticas
- **26 arquivos alterados**
- **4.101 inserções (+)**
- **35 deleções (-)**
- **Novo conteúdo**: ~37KB de conteúdo do Liber Advenae (apenas capítulos 7 e 8)

## 🎯 Próximos Passos
- Expansão de conteúdo do Liber Advenae com capítulos adicionais.
- Desenvolvimento de ferramentas adicionais para a DM Screen.
- Refinamento do sistema de temas e personalização visual.
- Implementação de testes E2E para novas funcionalidades de campanha.
