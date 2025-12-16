"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Character } from "@/types/character";

interface CharacterFormProps {
    initialData?: Partial<Character>;
    onSubmit: (data: Partial<Character>) => Promise<void>;
    isLoading: boolean;
    submitLabel?: string;
    loadingLabel?: string;
}

export function CharacterForm({
    initialData,
    onSubmit,
    isLoading,
    submitLabel = "Salvar",
    loadingLabel = "Salvando..."
}: CharacterFormProps) {
    const [formData, setFormData] = useState<Partial<Character>>({
        name: "",
        lineage: "Elenai",
        vocation: "O Guardião",
        type: "PC",
        description: "",
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        placeholder="Ex: Aragorn"
                        required
                        className="border-gold-500/20 focus:border-gold-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lineage">Linhagem</Label>
                    <select
                        id="lineage"
                        name="lineage"
                        value={formData.lineage || "Elenai"}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-gold-500/20 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="Elenai">Elenai</option>
                        <option value="Ankarim">Ankarim</option>
                        <option value="Vayren">Vayren</option>
                        <option value="Humanos">Humanos</option>
                        <option value="Nahari">Nahari</option>
                        <option value="Auren">Auren</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="vocation">Vocação</Label>
                    <select
                        id="vocation"
                        name="vocation"
                        value={formData.vocation || "O Guardião"}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-gold-500/20 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="O Guardião">O Guardião</option>
                        <option value="O Portador da Luz">O Portador da Luz</option>
                        <option value="O Penitente">O Penitente</option>
                        <option value="O Cronista">O Cronista</option>
                        <option value="O Curador">O Curador</option>
                        <option value="O Peregrino">O Peregrino</option>
                        <option value="O Visionário">O Visionário</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição / Backstory</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre a história deste personagem..."
                    className="min-h-[100px] border-gold-500/20 focus:border-gold-500"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingLabel}
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        {submitLabel}
                    </>
                )}
            </Button>
        </form>
    );
}
