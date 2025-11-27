"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === "default" ? "Mudar para modo Claro (Pergaminho)" : "Mudar para modo Escuro (Codex)"}
            className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10"
        >
            {theme === "default" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Alternar Tema</span>
        </Button>
    );
}
