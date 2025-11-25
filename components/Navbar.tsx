"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollText, Shield, Sword, Search, Book, Palette, Compass, Crown, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";
import { useAuth } from "@/contexts/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, signOut } = useAuth();

    // For now, we consider any logged in user can access "Mestre" area
    // In future we can check user.user_metadata.role === 'master'
    const isMaster = !!user;

    return (
        <>
            <nav
                data-testid="navbar"
                className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-background/80 backdrop-blur-md"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-2"
                        data-testid="nav-logo"
                    >
                        <Shield className="h-8 w-8 text-gold-500" />
                        <span className="font-cinzel text-xl font-bold text-gold-500">
                            Codex Aeternum
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/codex"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                            data-testid="nav-link-codex"
                        >
                            <ScrollText className="h-4 w-4" />
                            <span>Codex</span>
                        </Link>
                        <Link
                            href="/grimoire"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                            data-testid="nav-link-grimoire"
                        >
                            <Book className="h-4 w-4" />
                            <span>Grimoire</span>
                        </Link>
                        <Link
                            href="/advenae"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                            data-testid="nav-link-advenae"
                        >
                            <Compass className="h-4 w-4" />
                            <span>Advenae</span>
                        </Link>
                        <Link
                            href="/characters"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                            data-testid="nav-link-characters"
                        >
                            <Sword className="h-4 w-4" />
                            <span>Personagens</span>
                        </Link>
                        <Link
                            href="/gallery"
                            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors"
                            data-testid="nav-link-gallery"
                        >
                            <Palette className="h-4 w-4" />
                            <span>Galeria</span>
                        </Link>
                        {isMaster && (
                            <Link
                                href="/campaigns"
                                className="flex items-center space-x-1 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
                                data-testid="nav-link-master"
                            >
                                <Crown className="h-4 w-4" />
                                <span>Mestre</span>
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10"
                            aria-label="Buscar"
                            data-testid="nav-search-button"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <div className="hidden sm:flex space-x-4 items-center">
                            {!user ? (
                                <>
                                    <Link href="/login" data-testid="nav-signin">
                                        <Button variant="outline" size="sm">
                                            Entrar
                                        </Button>
                                    </Link>
                                    <Link href="/signup" data-testid="nav-signup">
                                        <Button size="sm">Cadastrar</Button>
                                    </Link>
                                </>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full border border-gold-500/20 overflow-hidden">
                                            {user.user_metadata?.full_name ? (
                                                <span className="font-cinzel font-bold text-gold-500">
                                                    {user.user_metadata.full_name
                                                        .split(" ")
                                                        .map((n: string) => n[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </span>
                                            ) : (
                                                <UserIcon className="h-5 w-5 text-gold-500" />
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-black/90 border-gold-500/20 text-gold-100">
                                        <DropdownMenuLabel>
                                            {user.user_metadata?.full_name || "Minha Conta"}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-gold-500/20" />
                                        <DropdownMenuItem className="focus:bg-gold-500/10 focus:text-gold-500 cursor-pointer">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            <span>{user.email}</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-gold-500/20" />
                                        <DropdownMenuItem onClick={signOut} className="focus:bg-red-500/10 focus:text-red-500 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sair</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
