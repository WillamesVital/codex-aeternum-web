"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dices, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    GiDiceEightFacesEight,
    GiDiceSixFacesSix,
    GiDiceTwentyFacesTwenty,
    GiD10,
    GiD12,
    GiD4,
    GiPerspectiveDiceSixFacesRandom
} from "react-icons/gi";

interface RollResult {
    id: string;
    die: string;
    value: number;
    timestamp: Date;
}

const DICE_TYPES = [
    { label: "d4", sides: 4, color: "bg-red-900/20 border-red-500/50 hover:bg-red-900/40", icon: GiD4 },
    { label: "d6", sides: 6, color: "bg-blue-900/20 border-blue-500/50 hover:bg-blue-900/40", icon: GiDiceSixFacesSix },
    { label: "d8", sides: 8, color: "bg-green-900/20 border-green-500/50 hover:bg-green-900/40", icon: GiDiceEightFacesEight },
    { label: "d10", sides: 10, color: "bg-purple-900/20 border-purple-500/50 hover:bg-purple-900/40", icon: GiD10 },
    { label: "d12", sides: 12, color: "bg-orange-900/20 border-orange-500/50 hover:bg-orange-900/40", icon: GiD12 },
    { label: "d20", sides: 20, color: "bg-gold-500/20 border-gold-500/50 hover:bg-gold-500/40", icon: GiDiceTwentyFacesTwenty },
];

export function DiceRoller() {
    const [history, setHistory] = useState<RollResult[]>([]);
    const [lastRoll, setLastRoll] = useState<RollResult | null>(null);
    const [isRolling, setIsRolling] = useState(false);

    const rollDie = (sides: number, label: string) => {
        if (isRolling) return;

        setIsRolling(true);
        const duration = 600;
        const interval = setInterval(() => {
            const randomValue = Math.floor(Math.random() * sides) + 1;
            setLastRoll({
                id: "temp",
                die: label,
                value: randomValue,
                timestamp: new Date()
            });
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            const finalValue = Math.floor(Math.random() * sides) + 1;
            const newRoll: RollResult = {
                id: crypto.randomUUID(),
                die: label,
                value: finalValue,
                timestamp: new Date(),
            };
            setLastRoll(newRoll);
            setHistory((prev) => [newRoll, ...prev].slice(0, 3)); // Keep last 3
            setIsRolling(false);
        }, duration);
    };

    const clearHistory = () => {
        setHistory([]);
        setLastRoll(null);
    };

    return (
        <Card className="h-full border-gold-500/20 bg-black/40 backdrop-blur-sm flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 shrink-0">
                <CardTitle className="text-lg font-cinzel text-gold-500 flex items-center gap-2">
                    <Dices className="h-5 w-5" /> Rolagem de Dados
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={clearHistory} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
                {/* Top Section: Last Roll & Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    {/* Last Roll Display */}
                    <div className="flex-1 flex flex-col items-center justify-center py-2 bg-black/20 rounded-lg border border-gold-500/10 min-h-[80px] w-full sm:w-auto">
                        {lastRoll ? (
                            <div className={cn(
                                "text-center",
                                isRolling ? "animate-shake" : "animate-in zoom-in duration-300"
                            )}>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest">{lastRoll.die}</span>
                                <div className={cn(
                                    "text-4xl font-bold font-cinzel",
                                    !isRolling && lastRoll.value === 20 && lastRoll.die === "d20" ? "text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" :
                                        !isRolling && lastRoll.value === 1 && lastRoll.die === "d20" ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                                            "text-gold-100"
                                )}>
                                    {lastRoll.value}
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted-foreground/50 text-xs italic">Role...</div>
                        )}
                    </div>

                    {/* Dice Buttons Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 w-full sm:w-[180px]">
                        {DICE_TYPES.map((die) => {
                            const Icon = die.icon;
                            return (
                                <button
                                    key={die.label}
                                    onClick={() => rollDie(die.sides, die.label)}
                                    className={cn(
                                        "flex items-center justify-center p-1.5 rounded-md border transition-all active:scale-95 text-xs h-10",
                                        die.color
                                    )}
                                    title={die.label}
                                >
                                    {Icon ? <Icon className="w-6 h-6 text-gold-100/80" /> : <span className="font-cinzel font-bold text-gold-100">{die.label}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* History */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1 shrink-0">Histórico</div>
                    <div className="space-y-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gold-500/20">
                        {history.length === 0 ? (
                            <div className="text-xs text-muted-foreground/30 italic text-center py-2">Sem histórico</div>
                        ) : (
                            history.map((roll) => (
                                <div key={roll.id} className="flex justify-between items-center text-xs p-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <span className="text-gold-500/80 font-medium">{roll.die}</span>
                                    <span className={cn(
                                        "font-bold",
                                        roll.value === 20 && roll.die === "d20" ? "text-green-500" :
                                            roll.value === 1 && roll.die === "d20" ? "text-red-500" :
                                                "text-gold-100"
                                    )}>{roll.value}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
