import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { BookOpen, Skull, Shield, Zap, Ghost } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type GeneratorItem = {
    roll: number;
    text: string;
    desc?: string;
};

type Generator = {
    id: string;
    name: string;
    dice: string;
    items: GeneratorItem[];
};

// --- Data: Chapter 31 (General) ---
const GENERAL_GENERATORS: Generator[] = [
    {
        id: "tone",
        name: "Tom da Sessão",
        dice: "d6",
        items: [
            { roll: 1, text: "Horror Investigativo", desc: "Mistério, tensão, o desconhecido." },
            { roll: 2, text: "Ação Desesperada", desc: "Fugas, combates difíceis, tempo curto." },
            { roll: 3, text: "Drama Espiritual", desc: "Dilemas morais, fé, sacrifício." },
            { roll: 4, text: "Exploração de Ruínas", desc: "História antiga, perigos esquecidos." },
            { roll: 5, text: "Intriga Política", desc: "Traições, alianças, segredos urbanos." },
            { roll: 6, text: "Revelação Mística", desc: "Sinais, profecias, contato com o divino." },
        ]
    },
    {
        id: "events",
        name: "Eventos Espirituais",
        dice: "d10",
        items: [
            { roll: 1, text: "Sussurro Coletivo", desc: "Todos ouvem a mesma frase ao mesmo tempo." },
            { roll: 2, text: "Chuva de Cinzas", desc: "O céu escurece e cinzas frias caem." },
            { roll: 3, text: "Silêncio Súbito", desc: "Todo som cessa por 10 segundos." },
            { roll: 4, text: "Sombra Viva", desc: "A sombra de um PC se move sozinha." },
            { roll: 5, text: "Sangramento de Ídolos", desc: "Estátuas ou símbolos sagrados choram sangue." },
            { roll: 6, text: "Vento Gélido", desc: "Queda brusca de temperatura e cheiro de ozônio." },
            { roll: 7, text: "Espelho da Alma", desc: "Reflexos mostram a verdadeira natureza (ou pecado)." },
            { roll: 8, text: "Animais Inquietos", desc: "Cães latem para o vazio, pássaros caem." },
            { roll: 9, text: "Luz Trêmula", desc: "Todas as chamas diminuem e ficam azuis." },
            { roll: 10, text: "Visão da Queda", desc: "Flashback momentâneo de uma tragédia antiga." },
        ]
    },
    {
        id: "villains",
        name: "Vilões e Antagonistas",
        dice: "d12",
        items: [
            { roll: 1, text: "O Profeta Falso", desc: "Lidera através de mentiras espirituais." },
            { roll: 2, text: "O Nobre Corrupto", desc: "Usa poder político para esconder vícios." },
            { roll: 3, text: "A Besta da Fenda", desc: "Monstruosidade que devora carne e alma." },
            { roll: 4, text: "O Inquisidor Fanático", desc: "Justiça sem misericórdia, fogo purificador." },
            { roll: 5, text: "O Cultista Silencioso", desc: "Infiltrado, paciente, mortal." },
            { roll: 6, text: "O Espírito Vingativo", desc: "Fantasma preso por um crime não resolvido." },
            { roll: 7, text: "O Mercador de Relíquias", desc: "Vende perigos que não compreende." },
            { roll: 8, text: "O Traidor", desc: "Alguém próximo que sucumbiu à sombra." },
            { roll: 9, text: "O Senhor da Guerra", desc: "Conquista pela força e medo." },
            { roll: 10, text: "A Feiticeira da Sangue", desc: "Usa vitalidade para rituais proibidos." },
            { roll: 11, text: "O Caído Menor", desc: "Entidade do Inferis buscando ascensão." },
            { roll: 12, text: "O Espelho Sombrio", desc: "Versão corrompida de um herói." },
        ]
    },
    {
        id: "relics",
        name: "Relíquias e Artefatos",
        dice: "d8",
        items: [
            { roll: 1, text: "Lâmina de Luz", desc: "Brilha na presença de corrupção." },
            { roll: 2, text: "Cálice da Verdade", desc: "Quem bebe não pode mentir." },
            { roll: 3, text: "Manto das Sombras", desc: "Oculta, mas sussurra medos." },
            { roll: 4, text: "Anel do Pacto", desc: "Sela juramentos com magia de sangue." },
            { roll: 5, text: "Pedra da Visão", desc: "Permite ver o plano espiritual brevemente." },
            { roll: 6, text: "Escudo da Fé", desc: "Resiste a ataques mágicos, mas pesa com a dúvida." },
            { roll: 7, text: "Pergaminho Antigo", desc: "Contém um ritual esquecido ou proibido." },
            { roll: 8, text: "Amuleto da Proteção", desc: "Absorve dano, mas racha com o tempo." },
        ]
    },
    {
        id: "dreams",
        name: "Sonhos para Jogadores",
        dice: "d10",
        items: [
            { roll: 1, text: "Queda Infinita", desc: "Sensação de estar caindo no Inferis." },
            { roll: 2, text: "A Porta Trancada", desc: "Um segredo que eles não conseguem acessar." },
            { roll: 3, text: "O Rosto Esquecido", desc: "Alguém do passado pedindo ajuda." },
            { roll: 4, text: "A Cidade em Chamas", desc: "Visão de uma destruição futura." },
            { roll: 5, text: "O Banquete de Cinzas", desc: "Tudo que comem vira pó." },
            { roll: 6, text: "A Voz do Altíssimo", desc: "Um comando claro, mas difícil." },
            { roll: 7, text: "O Espelho Quebrado", desc: "Sua imagem refletida está distorcida." },
            { roll: 8, text: "A Caminhada na Água", desc: "Sensação de paz e propósito." },
            { roll: 9, text: "A Sombra que Persegue", desc: "Medo de algo que não podem ver." },
            { roll: 10, text: "O Julgamento", desc: "Estão sendo pesados em uma balança." },
        ]
    },
    {
        id: "sins",
        name: "Pecados e Virtudes",
        dice: "d12",
        items: [
            { roll: 1, text: "Orgulho / Humildade", desc: "O desafio da auto-importância." },
            { roll: 2, text: "Ira / Paciência", desc: "O fogo que destrói vs o que forja." },
            { roll: 3, text: "Inveja / Caridade", desc: "Desejar o do outro vs dar de si." },
            { roll: 4, text: "Gula / Temperança", desc: "Consumo desenfreado vs equilíbrio." },
            { roll: 5, text: "Luxúria / Castidade", desc: "Desejo carnal vs pureza de propósito." },
            { roll: 6, text: "Preguiça / Diligência", desc: "Inércia espiritual vs ação constante." },
            { roll: 7, text: "Avareza / Generosidade", desc: "Acumular vs partilhar." },
            { roll: 8, text: "Medo / Coragem", desc: "Paralisia vs ação apesar do risco." },
            { roll: 9, text: "Mentira / Verdade", desc: "Engano fácil vs realidade difícil." },
            { roll: 10, text: "Crueldade / Compaixão", desc: "Prazer na dor vs sentir a dor do outro." },
            { roll: 11, text: "Desespero / Esperança", desc: "Fim de tudo vs a luz que persiste." },
            { roll: 12, text: "Traição / Lealdade", desc: "Quebra de confiança vs fidelidade." },
        ]
    },
    {
        id: "towns",
        name: "Cidades e Vilas",
        dice: "d10",
        items: [
            { roll: 1, text: "Vila Pesqueira", desc: "Nevoeiro constante, supersticiosos." },
            { roll: 2, text: "Fortaleza de Fronteira", desc: "Militarizada, desconfiada, rígida." },
            { roll: 3, text: "Cidade Mercantil", desc: "Rica, corrupta, cheia de intrigas." },
            { roll: 4, text: "Santuário Isolado", desc: "Devotos, pacíficos, mas secretos." },
            { roll: 5, text: "Ruínas Habitadas", desc: "Vivem sobre os ossos do passado." },
            { roll: 6, text: "Acampamento Nômade", desc: "Vayren, coloridos, sempre em movimento." },
            { roll: 7, text: "Cidade Mineira", desc: "Subterrânea, claustrofóbica, trabalhadora." },
            { roll: 8, text: "Porto Fluvial", desc: "Ponto de troca, mistura de culturas." },
            { roll: 9, text: "Vila Amaldiçoada", desc: "Marcada por uma tragédia ou fenda próxima." },
            { roll: 10, text: "Capital Decadente", desc: "Glória antiga, sombras presentes." },
        ]
    },
    {
        id: "hooks",
        name: "Ganchos Narrativos",
        dice: "d20",
        items: [
            { roll: 1, text: "Uma relíquia sumiu.", desc: "O templo local foi roubado." },
            { roll: 2, text: "Uma criança teve sonho profético.", desc: "Ela viu a morte de um líder." },
            { roll: 3, text: "Um Caído foi avistado.", desc: "Rumores de uma criatura nas sombras." },
            { roll: 4, text: "Sombra na água.", desc: "O rio ficou negro por um dia." },
            { roll: 5, text: "Uma ordem precisa de ajuda urgente.", desc: "Mensageiro ferido chega à taverna." },
            { roll: 6, text: "Vilarejo teme culto.", desc: "Pessoas desaparecendo à noite." },
            { roll: 7, text: "Chuva que não toca o chão.", desc: "Fenômeno mágico inexplicável." },
            { roll: 8, text: "Morto que sorri no caixão.", desc: "Sinal de necromancia ou milagre?" },
            { roll: 9, text: "Livro que se escreveu sozinho.", desc: "Novas páginas aparecem toda manhã." },
            { roll: 10, text: "Monge enlouquecido.", desc: "Grita profecias nas ruas." },
            { roll: 11, text: "Ponte queimada durante a noite (sem fogo).", desc: "Sabotagem ou magia?" },
            { roll: 12, text: "Estátua virou-se sozinha.", desc: "Agora olha para o norte." },
            { roll: 13, text: "Fenda recém surgida.", desc: "Pequena, mas crescendo." },
            { roll: 14, text: "Névoa com vozes.", desc: "Atrai quem entra nela." },
            { roll: 15, text: "Relíquia pedindo purificação.", desc: "Vibra e causa dor a quem toca." },
            { roll: 16, text: "Animal falando frase única.", desc: "'Eles estão vindo'." },
            { roll: 17, text: "Profeta hesitante.", desc: "Sabe o futuro, mas teme contá-lo." },
            { roll: 18, text: "Marca de luz no céu.", desc: "Aurora boreal em pleno dia." },
            { roll: 19, text: "Marca de sombra no solo.", desc: "A grama morre em um padrão específico." },
            { roll: 20, text: "A própria Cidade parece 'cansada'.", desc: "Prédios rangem, cores desbotam." },
        ]
    }
];

// --- Data: Chapter 11 (Rifts) ---
const RIFT_GENERATORS: Generator[] = [
    {
        id: "rift_origin",
        name: "Origem da Fenda",
        dice: "d6",
        items: [
            { roll: 1, text: "Massacre", desc: "Violência extrema marcou o local." },
            { roll: 2, text: "Traição", desc: "Um ato de deslealdade profunda." },
            { roll: 3, text: "Pacto Rompido", desc: "Juramento sagrado quebrado." },
            { roll: 4, text: "Profanação", desc: "Local sagrado corrompido." },
            { roll: 5, text: "Orgulho Coletivo", desc: "Hubris de uma comunidade." },
            { roll: 6, text: "Culto ao Silêncio", desc: "Ritual intencional para abrir a fenda." },
        ]
    },
    {
        id: "rift_manifestation",
        name: "Manifestação",
        dice: "d6",
        items: [
            { roll: 1, text: "Distorção Visual", desc: "Cores erradas, formas que mudam." },
            { roll: 2, text: "Som Incessante", desc: "Zumbido, choro ou sussurros." },
            { roll: 3, text: "Frio Sobrenatural", desc: "Gelo que não derrete, hálito visível." },
            { roll: 4, text: "Gravidade Alterada", desc: "Objetos flutuam ou pesam demais." },
            { roll: 5, text: "Sombra Líquida", desc: "Escuridão que escorre como óleo." },
            { roll: 6, text: "Deformação da Vida", desc: "Plantas e animais mutados." },
        ]
    },
    {
        id: "rift_consequence",
        name: "Consequência",
        dice: "d6",
        items: [
            { roll: 1, text: "Corrupção da Natureza", desc: "Tudo ao redor apodrece." },
            { roll: 2, text: "Surgimento de Bestas", desc: "Criaturas do Inferis emergem." },
            { roll: 3, text: "Falha de Magia", desc: "Feitiços funcionam mal ou não funcionam." },
            { roll: 4, text: "Aumento de Pecados", desc: "Pessoas próximas ficam mais agressivas/gananciosas." },
            { roll: 5, text: "Perda de Dons", desc: "Habilidades espirituais enfraquecem." },
            { roll: 6, text: "Pesadelos Reais", desc: "Sonhos invadem a realidade." },
        ]
    }
];

// --- Data: Chapter 10 (Relics) ---
const RELIC_GENERATORS: Generator[] = [
    {
        id: "relic_history",
        name: "História Espiritual",
        dice: "d6",
        items: [
            { roll: 1, text: "Propósito Antigo", desc: "Criada para uma função esquecida." },
            { roll: 2, text: "Pecado Original", desc: "Forjada em um momento de falha moral." },
            { roll: 3, text: "Virtude Heroica", desc: "Usada por um santo ou herói." },
            { roll: 4, text: "Relíquia de Guerra", desc: "Arma ou proteção de um conflito antigo." },
            { roll: 5, text: "Promessa Quebrada", desc: "Símbolo de um voto não cumprido." },
            { roll: 6, text: "Lamento", desc: "Carrega a tristeza de uma era." },
        ]
    },
    {
        id: "relic_gift",
        name: "Dom (Poder)",
        dice: "d6",
        items: [
            { roll: 1, text: "Coragem Sobrenatural", desc: "Imunidade a medo." },
            { roll: 2, text: "Visão da Verdade", desc: "Ver mentiras ou o invisível." },
            { roll: 3, text: "Cura Milagrosa", desc: "Restaura feridas rapidamente." },
            { roll: 4, text: "Força de Gigante", desc: "Poder físico ampliado." },
            { roll: 5, text: "Claridade Espiritual", desc: "Resistência a corrupção." },
            { roll: 6, text: "Luz Purificadora", desc: "Dano a criaturas das sombras." },
        ]
    },
    {
        id: "relic_price",
        name: "Preço (Custo)",
        dice: "d6",
        items: [
            { roll: 1, text: "Orgulho Crescente", desc: "O portador se acha superior." },
            { roll: 2, text: "Ira Incontrolável", desc: "Fácil de provocar em batalha." },
            { roll: 3, text: "Memórias Dolorosas", desc: "Flashbacks da história da relíquia." },
            { roll: 4, text: "Sonhos Corrompidos", desc: "Pesadelos constantes." },
            { roll: 5, text: "Fragilidade à Fenda", desc: "Atrai atenção do Inferis." },
            { roll: 6, text: "Vício Espiritual", desc: "Dependência do uso da relíquia." },
        ]
    }
];

// --- Data: Chapter 33 (NPCs) ---
const NPC_GENERATORS: Generator[] = [
    {
        id: "npc_role",
        name: "Papel na História",
        dice: "d6",
        items: [
            { roll: 1, text: "Aliado Fiel", desc: "Ajudará, mas pode cobrar." },
            { roll: 2, text: "Oponente Ideológico", desc: "Não necessariamente maligno, mas contra o grupo." },
            { roll: 3, text: "Enigmático", desc: "Motivações ocultas, neutro." },
            { roll: 4, text: "Vítima", desc: "Precisa de resgate ou proteção." },
            { roll: 5, text: "Mentor", desc: "Possui conhecimento ou recursos." },
            { roll: 6, text: "Traidor em Potencial", desc: "Parece amigo, mas tem agenda própria." },
        ]
    },
    {
        id: "npc_virtue",
        name: "Virtude Dominante",
        dice: "d8",
        items: [
            { roll: 1, text: "Fé", desc: "Crença inabalável." },
            { roll: 2, text: "Esperança", desc: "Otimismo mesmo no fim." },
            { roll: 3, text: "Amor/Caridade", desc: "Sacrifício pelo outro." },
            { roll: 4, text: "Justiça", desc: "Senso de certo e errado rígido." },
            { roll: 5, text: "Coragem", desc: "Ação apesar do medo." },
            { roll: 6, text: "Temperança", desc: "Autocontrole." },
            { roll: 7, text: "Humildade", desc: "Reconhece suas falhas." },
            { roll: 8, text: "Sabedoria", desc: "Conhecimento aplicado." },
        ]
    },
    {
        id: "npc_sin",
        name: "Pecado Latente",
        dice: "d8",
        items: [
            { roll: 1, text: "Orgulho", desc: "Arrogância, vaidade." },
            { roll: 2, text: "Desespero", desc: "Falta de fé, desistência." },
            { roll: 3, text: "Luxúria", desc: "Desejos carnais ou de poder." },
            { roll: 4, text: "Ira", desc: "Raiva destrutiva." },
            { roll: 5, text: "Covardia", desc: "Medo paralisante." },
            { roll: 6, text: "Gula", desc: "Excesso, consumo." },
            { roll: 7, text: "Inveja", desc: "Desejar o que é do outro." },
            { roll: 8, text: "Avareza", desc: "Reter recursos." },
        ]
    }
];


export function DMTools() {
    const [selectedGen, setSelectedGen] = useState<Generator>(GENERAL_GENERATORS[0]);

    const GeneratorView = ({ generators }: { generators: Generator[] }) => (
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden h-full">
            {/* Sidebar List */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gold-500/10 bg-black/20 overflow-y-auto scrollbar-thin scrollbar-thumb-gold-500/20 max-h-[120px] md:max-h-none shrink-0">
                {generators.map((gen) => (
                    <button
                        key={gen.id}
                        onClick={() => setSelectedGen(gen)}
                        className={cn(
                            "w-full text-left px-3 py-2 text-xs font-medium transition-colors border-b border-white/5 hover:bg-white/5",
                            selectedGen.id === gen.id ? "text-gold-400 bg-white/5" : "text-muted-foreground"
                        )}
                    >
                        {gen.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="p-3 border-b border-gold-500/10 flex items-center justify-between shrink-0 bg-black/20">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gold-100">{selectedGen.name}</span>

                    </div>
                </div>

                {/* Table List */}
                <ScrollArea className="flex-1 p-3">
                    <div className="space-y-1.5">
                        {selectedGen.items.map((item) => (
                            <div
                                key={item.roll}
                                className="text-xs p-2 rounded border border-transparent hover:bg-white/5 transition-colors"
                            >
                                <div className="flex gap-2">
                                    <span className="font-bold w-5 text-right shrink-0 text-muted-foreground/50">{item.roll}.</span>
                                    <div>
                                        <span className="font-medium text-gold-100/90">
                                            {item.text}
                                        </span>
                                        {item.desc && (
                                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                                                {item.desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );

    return (
        <Card className="h-full border-gold-500/20 bg-black/40 backdrop-blur-sm flex flex-col">
            <CardHeader className="pb-2 shrink-0">
                <CardTitle className="text-lg font-cinzel text-gold-500 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" /> Ferramentas do Mestre
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
                <Tabs defaultValue="general" className="flex-1 flex flex-col">
                    <div className="px-3 pt-2 pb-0 border-b border-gold-500/10 bg-black/20 overflow-x-auto">
                        <TabsList className="w-full bg-transparent p-0 h-auto justify-start gap-4 min-w-max">
                            <TabsTrigger
                                value="general"
                                onClick={() => setSelectedGen(GENERAL_GENERATORS[0])}
                                className="data-[state=active]:bg-transparent data-[state=active]:text-gold-400 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold-200 transition-colors"
                            >
                                <BookOpen className="w-3 h-3 mr-1.5" /> Geral
                            </TabsTrigger>
                            <TabsTrigger
                                value="rifts"
                                onClick={() => setSelectedGen(RIFT_GENERATORS[0])}
                                className="data-[state=active]:bg-transparent data-[state=active]:text-gold-400 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold-200 transition-colors"
                            >
                                <Ghost className="w-3 h-3 mr-1.5" /> Fendas
                            </TabsTrigger>
                            <TabsTrigger
                                value="relics"
                                onClick={() => setSelectedGen(RELIC_GENERATORS[0])}
                                className="data-[state=active]:bg-transparent data-[state=active]:text-gold-400 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold-200 transition-colors"
                            >
                                <Zap className="w-3 h-3 mr-1.5" /> Relíquias
                            </TabsTrigger>
                            <TabsTrigger
                                value="npcs"
                                onClick={() => setSelectedGen(NPC_GENERATORS[0])}
                                className="data-[state=active]:bg-transparent data-[state=active]:text-gold-400 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold-200 transition-colors"
                            >
                                <Shield className="w-3 h-3 mr-1.5" /> NPCs
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="general" className="flex-1 mt-0 overflow-hidden">
                        <GeneratorView generators={GENERAL_GENERATORS} />
                    </TabsContent>
                    <TabsContent value="rifts" className="flex-1 mt-0 overflow-hidden">
                        <GeneratorView generators={RIFT_GENERATORS} />
                    </TabsContent>
                    <TabsContent value="relics" className="flex-1 mt-0 overflow-hidden">
                        <GeneratorView generators={RELIC_GENERATORS} />
                    </TabsContent>
                    <TabsContent value="npcs" className="flex-1 mt-0 overflow-hidden">
                        <GeneratorView generators={NPC_GENERATORS} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
