export interface GalleryItem {
    id: string;
    title: string;
    description: string;
    src: string;
    category: 'concept' | 'character' | 'location' | 'item';
    width?: number;
    height?: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: '1',
        title: 'A Queda',
        description: 'O momento catastrófico onde a harmonia foi quebrada.',
        src: '/images/gallery/A Queda Completa.png',
        category: 'concept',
    },
    {
        id: '2',
        title: 'A Tentação dos Primeiros',
        description: 'O início da corrupção que levaria ao desastre.',
        src: '/images/gallery/A Tentação dos Primeiros.png',
        category: 'character',
    },
    {
        id: '3',
        title: 'Os Povos da Criação',
        description: 'As diversas raças que habitam Aeternum.',
        src: '/images/gallery/Capítulo III — Os Povos da Criação.png',
        category: 'character',
    },
    {
        id: '4',
        title: 'O Inferis',
        description: 'O Abismo de Luz Queimada, onde a realidade se distorce.',
        src: '/images/gallery/O Inferis – O Abismo de Luz Queimada.png',
        category: 'location',
    },
    {
        id: '5',
        title: 'O Legado da Queda',
        description: 'As cicatrizes deixadas no mundo após o evento.',
        src: '/images/gallery/O Legado da Queda.png',
        category: 'concept',
    },
    {
        id: '6',
        title: 'O Orgulho que Rasgou o Céu',
        description: 'A hubris que desafiou o Firmamentum.',
        src: '/images/gallery/O Orgulho que Rasgou o Céu.png',
        category: 'concept',
    },
    {
        id: '7',
        title: 'O Véu',
        description: 'A separação entre os planos materiais e imateriais.',
        src: '/images/gallery/O Véu e a Separação dos Planos.png',
        category: 'location',
    },
    {
        id: '8',
        title: 'Os Humanos',
        description: 'A Imagem e o Pó, frágeis mas resilientes.',
        src: '/images/gallery/Os Humanos — A Imagem e o Pó.png',
        category: 'character',
    },
];

export const GALLERY_CATEGORIES = [
    { id: 'all', label: 'Todas' },
    { id: 'concept', label: 'Arte Conceitual' },
    { id: 'character', label: 'Personagens' },
    { id: 'location', label: 'Locais' },
    { id: 'item', label: 'Itens' },
];
