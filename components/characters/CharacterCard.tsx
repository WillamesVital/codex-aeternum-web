import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, Shield, Zap } from "lucide-react";

interface CharacterCardProps {
    name: string;
    race: string;
    characterClass: string;
    level: number;
    type: "PC" | "NPC";
}

export function CharacterCard({ name, race, characterClass, level, type }: CharacterCardProps) {
    return (
        <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20 hover:border-gold-500/50 transition-colors cursor-pointer group overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between mb-1">
                    <CardTitle className="text-lg font-cinzel text-gold-500 group-hover:text-gold-400 transition-colors">
                        {name}
                    </CardTitle>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="border-gold-500/50 text-gold-500">
                            Nível {level}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-gold-500/10 text-gold-500 hover:bg-gold-500/20 border-none w-fit">
                            {type === "PC" ? "Personagem" : "NPC"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{race}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>{characterClass}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
