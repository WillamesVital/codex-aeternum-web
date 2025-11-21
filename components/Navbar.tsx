"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollText, Shield, Sword, Search, Book, Palette } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";

export function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="font-cinzel text-xl font-bold text-gold-500">
                            Codex Aeternum
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/codex"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                        >
                            <ScrollText className="h-4 w-4" />
                            <span>Codex</span>
                        </Link>
                        <Link
                            href="/grimoire"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                        >
                            <Book className="h-4 w-4" />
                            <span>Grimoire</span>
                        </Link>
                        <Link
                            href="/characters"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                        >
                            <Sword className="h-4 w-4" />
                            <span>Personagens</span>
                        </Link>
                        <Link
                            href="/gallery"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                        >
                            <Palette className="h-4 w-4" />
                            <span>Galeria</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10"
                            aria-label="Buscar"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <div className="hidden sm:flex space-x-4">
                            <Button variant="outline" size="sm">
                                Entrar
                            </Button>
                            <Button size="sm">Cadastrar</Button>
                        </div>
                    </div>
                </div>
            </nav>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
