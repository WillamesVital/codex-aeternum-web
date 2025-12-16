"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Construction, Sword, Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Character } from "@/types/character";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CharactersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCharacters() {
            if (!user) {
                setLoading(false);
                return;
            }

            const supabase = createClient();
            const { data, error } = await supabase
                .from('characters')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching characters:", error);
            } else {
                setCharacters(data || []);
            }
            setLoading(false);
        }

        fetchCharacters();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este personagem?")) return;

        const supabase = createClient();
        const { error } = await supabase.from('characters').delete().eq('id', id);

        if (error) {
            console.error("Error deleting character:", error);
            alert("Erro ao excluir personagem");
        } else {
            setCharacters(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <div className="container mx-auto py-24 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-start mb-8">
                    <Breadcrumbs items={[{ label: "Personagens" }]} />
                </div>
                <Sword className="h-16 w-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    Construtor de Personagens
                </h1>

                {user ? (
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

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
                            </div>
                        ) : characters.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {characters.map((char) => (
                                    <CharacterCard
                                        key={char.id}
                                        name={char.name}
                                        lineage={char.lineage}
                                        vocation={char.vocation}
                                        onEdit={() => router.push(`/characters/${char.id}/edit`)}
                                        onDelete={() => char.id && handleDelete(char.id)}
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
                ) : (
                    <>
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
                    </>
                )}

                <Link href="/">
                    <Button variant="outline">Voltar ao Início</Button>
                </Link>
            </div >
        </div >
    );
}
