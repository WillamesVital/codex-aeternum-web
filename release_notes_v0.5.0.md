# Release Notes - Frontend Refactoring & Accessibility

## 🚀 Melhorias Principais

### ♿ Acessibilidade (A11y)
- **Navegação**: Adicionados atributos `aria-label` e `role` apropriados na `Navbar`, `Breadcrumbs` e paginação.
- **Modais**: `SearchModal` e `ImageLightbox` agora possuem `role="dialog"` e `aria-modal="true"` para melhor suporte a leitores de tela.
- **Interatividade**: Melhor gerenciamento de foco e labels em botões de ícone (ex: fechar modal, busca).

### 🧪 Testabilidade (QA)
- **Atributos de Teste**: Implementação sistemática de `data-testid` em componentes chave para facilitar testes E2E robustos.
    - **UI Base**: `Button`, `Card`, `Badge`.
    - **Layout**: `Navbar`, `Footer`, `Breadcrumbs`, `ScrollToTop`.
    - **Features**: `SearchModal`, `TableOfContents`, `ChapterNavigation`, `CharacterCard`, `GalleryGrid`.

## 🛠️ Alterações por Componente

### UI Core (`components/ui`)
- **Button**: Refatorado para aceitar `data-testid`.
- **Card**: Estrutura flexível mantida, agora com suporte a `data-testid` em todos os sub-componentes (`Header`, `Title`, `Content`).
- **Badge**: Adicionado suporte a `data-testid`.

### Layout
- **Navbar**:
    - Links de navegação agora possuem IDs de teste específicos (ex: `nav-link-codex`).
    - Removidos roles de `menubar` que causavam conflitos em testes de navegação simples.
- **Breadcrumbs**: Adicionado `aria-label="Breadcrumb"` e identificadores para cada item da trilha.

### Features
- **SearchModal**:
    - Input de busca: `data-testid="search-input"`.
    - Lista de resultados: `data-testid="search-results"`.
- **Galeria**:
    - Filtros e itens da grid agora são facilmente selecionáveis em testes automatizados.
- **Personagens**:
    - Cards de personagens e botões de ação (Editar/Excluir) identificáveis individualmente.

## 🐛 Correções
- Ajustes na estrutura semântica de diversos componentes para garantir conformidade com padrões web.
