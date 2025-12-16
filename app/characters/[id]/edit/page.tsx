"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Character } from "@/types/character";
import { CharacterForm } from "@/components/characters/CharacterForm";

export default function EditCharacterPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const characterId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<Partial<Character>>({});

    useEffect(() => {
        async function fetchCharacter() {
            if (!user || !characterId) return;

            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('characters')
                    .select('*')
                    .eq('id', characterId)
                    .single();

                if (error) throw error;
                if (data) {
                    if (data.user_id !== user.id) {
                        throw new Error("Você não tem permissão para editar este personagem.");
                    }
                    setInitialData(data);
                }
            } catch (err: any) {
                console.error("Error fetching character:", err);
                setError(err.message || "Erro ao carregar personagem.");
            } finally {
                setIsFetching(false);
            }
        }

        fetchCharacter();
    }, [user, characterId]);

    const handleSubmit = async (formData: Partial<Character>) => {
        setError(null);
        setIsLoading(true);

        try {
            const supabase = createClient();

            // Validate required fields
            if (!formData.name || !formData.lineage || !formData.vocation) {
                throw new Error("Por favor, preencha todos os campos obrigatórios.");
            }

            const updates: Partial<Character> = {
                name: formData.name,
                lineage: formData.lineage,
                vocation: formData.vocation,
                description: formData.description,
                updated_at: new Date().toISOString()
            };

            const { error: supabaseError } = await supabase
                .from('characters')
                .update(updates)
                .eq('id', characterId);

            if (supabaseError) throw supabaseError;

            router.push('/characters');
            router.refresh();
        } catch (err: any) {
            console.error("Error updates character:", err);
            setError(err.message || "Erro ao atualizar personagem.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="container mx-auto py-24 px-4 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/characters" className="inline-flex items-center text-muted-foreground hover:text-gold-500 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar para Meus Personagens
                </Link>

                <h1 className="text-3xl font-bold text-gold-500 font-cinzel mb-8 text-center">
                    Editar Personagem
                </h1>

                <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20">
                    <CardHeader>
                        <CardTitle className="text-xl font-cinzel text-gold-500">
                            {initialData.name ? `Editando ${initialData.name}` : "Detalhes do Herói"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md text-sm mb-6">
                                {error}
                            </div>
                        )}
                        <CharacterForm
                            initialData={initialData}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            submitLabel="Salvar Alterações"
                            loadingLabel="Salvando..."
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
