import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Construction, Sword, Plus } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CharacterCard } from "@/components/characters/CharacterCard";

const MOCK_CHARACTERS = [
    {
        id: 1,
        name: "Aelthas",
        race: "Elenai",
        characterClass: "Mago",
        level: 5,
        type: "PC" as const
    },
    {
        id: 2,
        name: "Garren",
        race: "Humano",
        characterClass: "Guerreiro",
        level: 3,
        type: "PC" as const
    },
    {
        id: 3,
        name: "Lyra",
        race: "Ankarim",
        characterClass: "Ladina",
        level: 8,
        type: "PC" as const
    },
    {
        id: 4,
        name: "Eldrin",
        race: "Elenai",
        characterClass: "Sábio",
        level: 12,
        type: "NPC" as const
    }
];

export default function CharactersPage() {
    return (
        <div className="container mx-auto py-24 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <Sword className="h-16 w-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    Construtor de Personagens
                </h1>

                <SignedIn>
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-cinzel text-gold-500">Meus Personagens</h2>
                            <Link href="/characters/new">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Novo Personagem
                                </Button>
                            </Link>
                        </div>
                        {MOCK_CHARACTERS.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {MOCK_CHARACTERS.map((char) => (
                                    <CharacterCard
                                        key={char.id}
                                        name={char.name}
                                        race={char.race}
                                        characterClass={char.characterClass}
                                        level={char.level}
                                        type={char.type}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Sword className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                                    <p className="text-xl text-muted-foreground mb-4">
                                        Você ainda não possui personagens.
                                    </p>
                                    <Link href="/characters/new">
                                        <Button variant="outline" className="gap-2">
                                            <Plus className="h-4 w-4" />
                                            Criar Primeiro Personagem
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </SignedIn>

                <SignedOut>
                    <p className="text-xl text-muted-foreground mb-8">
                        A forja está fria no momento. Nossos ferreiros estão trabalhando incansavelmente para trazer
                        as ferramentas para você criar suas lendas.
                    </p>

                    <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20 mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Construction className="h-5 w-5" />
                                <span>Em Construção</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Volte em breve para criar Humanos, Elenai, Ankarim e mais.
                            </p>
                        </CardContent>
                    </Card>
                </SignedOut>

                <Link href="/">
                    <Button variant="outline">Voltar ao Início</Button>
                </Link>
            </div >
        </div >
    );
}
