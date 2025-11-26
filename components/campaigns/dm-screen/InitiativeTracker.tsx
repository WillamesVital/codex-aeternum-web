"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Swords, Plus, RotateCw, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Combatant {
    id: string;
    name: string;
    initiative: number;
    isNPC: boolean;
}

export function InitiativeTracker() {
    const [combatants, setCombatants] = useState<Combatant[]>([]);
    const [newName, setNewName] = useState("");
    const [newInit, setNewInit] = useState("");
    const [activeId, setActiveId] = useState<string | null>(null);

    const addCombatant = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newName || !newInit) return;

        const val = parseInt(newInit);
        if (isNaN(val)) return;

        const newCombatant: Combatant = {
            id: crypto.randomUUID(),
            name: newName,
            initiative: val,
            isNPC: false, // Default for now, maybe add toggle later
        };

        setCombatants(prev => [...prev, newCombatant].sort((a, b) => b.initiative - a.initiative));
        setNewName("");
        setNewInit("");
    };

    const removeCombatant = (id: string) => {
        setCombatants(prev => prev.filter(c => c.id !== id));
        if (activeId === id) setActiveId(null);
    };

    const nextTurn = () => {
        if (combatants.length === 0) return;

        if (!activeId) {
            setActiveId(combatants[0].id);
            return;
        }

        const currentIndex = combatants.findIndex(c => c.id === activeId);
        const nextIndex = (currentIndex + 1) % combatants.length;
        setActiveId(combatants[nextIndex].id);
    };

    const clearAll = () => {
        setCombatants([]);
        setActiveId(null);
    };

    return (
        <Card className="h-full border-gold-500/20 bg-black/40 backdrop-blur-sm flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-cinzel text-gold-500 flex items-center gap-2">
                    <Swords className="h-5 w-5" /> Iniciativa
                </CardTitle>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={nextTurn} className="h-8 w-8 text-gold-500 hover:bg-gold-500/20" title="Próximo Turno">
                        <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={clearAll} className="h-8 w-8 text-muted-foreground hover:text-red-500" title="Limpar Tudo">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
                {/* Add Form */}
                <form onSubmit={addCombatant} className="flex gap-2">
                    <Input
                        placeholder="Nome"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="flex-1 h-8 text-sm"
                    />
                    <Input
                        placeholder="Inic."
                        type="number"
                        value={newInit}
                        onChange={e => setNewInit(e.target.value)}
                        className="w-16 h-8 text-sm"
                    />
                    <Button type="submit" size="sm" className="h-8 w-8 p-0 bg-gold-600 hover:bg-gold-700 text-black">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>

                {/* List */}
                <div className="space-y-1 overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gold-500/20 min-h-[200px]">
                    {combatants.length === 0 ? (
                        <div className="text-center text-muted-foreground/50 text-sm py-8 italic">
                            Adicione combatentes...
                        </div>
                    ) : (
                        combatants.map((c) => (
                            <div
                                key={c.id}
                                className={cn(
                                    "flex items-center justify-between p-2 rounded border transition-all",
                                    activeId === c.id
                                        ? "bg-gold-500/20 border-gold-500 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "font-bold font-cinzel w-6 text-center",
                                        activeId === c.id ? "text-gold-400" : "text-muted-foreground"
                                    )}>
                                        {c.initiative}
                                    </span>
                                    <span className={cn(
                                        "font-medium",
                                        activeId === c.id ? "text-gold-100" : "text-gray-300"
                                    )}>
                                        {c.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {activeId === c.id && (
                                        <ArrowRight className="h-4 w-4 text-gold-500 animate-pulse" />
                                    )}
                                    <button
                                        onClick={() => removeCombatant(c.id)}
                                        className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
