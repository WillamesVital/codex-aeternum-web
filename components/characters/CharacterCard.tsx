"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, Shield, Zap, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CharacterCardProps {
    name: string;
    race: string;
    characterClass: string;
    level: number;
    type: "PC" | "NPC";
    onEdit?: () => void;
    onDelete?: () => void;
}

export function CharacterCard({ name, race, characterClass, level, type, onEdit, onDelete }: CharacterCardProps) {
    return (
        <Card
            className="bg-background/50 backdrop-blur-sm border-gold-500/20 hover:border-gold-500/50 transition-colors cursor-pointer group overflow-hidden relative"
            data-testid={`character-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gold-500 hover:text-gold-400 hover:bg-gold-500/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.();
                    }}
                    disabled={!onEdit}
                    aria-label={`Editar ${name}`}
                    data-testid="character-edit-button"
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                    }}
                    disabled={!onDelete}
                    aria-label={`Excluir ${name}`}
                    data-testid="character-delete-button"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <CardHeader className="pb-2 pt-10">
                <div className="flex items-start justify-between mb-1">
                    <CardTitle className="text-lg font-cinzel text-gold-500 group-hover:text-gold-400 transition-colors">
                        {name}
                    </CardTitle>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="border-gold-500/50 text-gold-500" data-testid="character-level">
                            Nível {level}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-gold-500/10 text-gold-500 hover:bg-gold-500/20 border-none w-fit" data-testid="character-type">
                            {type === "PC" ? "Personagem" : "NPC"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span data-testid="character-race">{race}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span data-testid="character-class">{characterClass}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
