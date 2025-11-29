"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollText, Shield, Sword, Search, Book, Palette, Compass, Crown, User as UserIcon, LogOut, X, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";


interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { user, signOut } = useAuth();
    const isMaster = !!user;

    const menuVariants: Variants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        data-testid="mobile-menu"
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-gold-500/20 bg-background shadow-2xl md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gold-500/10">
                            <span className="font-cinzel text-lg font-bold text-gold-500 flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Menu
                            </span>
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-gold-500">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                            {/* Main Navigation */}
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navegação</p>
                                <Link
                                    href="/codex"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <ScrollText className="h-5 w-5" />
                                    <span>Codex</span>
                                </Link>
                                <Link
                                    href="/grimoire"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <Book className="h-5 w-5" />
                                    <span>Grimoire</span>
                                </Link>
                                <Link
                                    href="/advenae"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <Compass className="h-5 w-5" />
                                    <span>Advenae</span>
                                </Link>
                                <Link
                                    href="/oracle"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    <span>Oráculo</span>
                                </Link>
                                <Link
                                    href="/characters"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <Sword className="h-5 w-5" />
                                    <span>Personagens</span>
                                </Link>
                                <Link
                                    href="/gallery"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                >
                                    <Palette className="h-5 w-5" />
                                    <span>Galeria</span>
                                </Link>
                            </div>

                            {/* Master Section */}
                            {isMaster && (
                                <div className="space-y-2 pt-4 border-t border-gold-500/10">
                                    <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Crown className="h-3 w-3" /> Área do Mestre
                                    </p>
                                    <Link
                                        href="/campaigns"
                                        onClick={onClose}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                    >
                                        <span className="ml-8">Minhas Campanhas</span>
                                    </Link>
                                    <Link
                                        href="/npcs"
                                        onClick={onClose}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gold-500/10 text-foreground hover:text-gold-500 transition-colors"
                                    >
                                        <span className="ml-8">Dramatis Personae</span>
                                    </Link>
                                </div>
                            )}

                            {/* User Section */}
                            <div className="space-y-2 pt-4 border-t border-gold-500/10">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Conta</p>
                                {!user ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/login" onClick={onClose}>
                                            <Button variant="outline" className="w-full justify-center">Entrar</Button>
                                        </Link>
                                        <Link href="/signup" onClick={onClose}>
                                            <Button className="w-full justify-center">Cadastrar</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 px-2 py-1">
                                            <div className="h-8 w-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 font-bold">
                                                {user.user_metadata?.full_name ? user.user_metadata.full_name[0].toUpperCase() : <UserIcon className="h-4 w-4" />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-foreground">{user.user_metadata?.full_name || "Usuário"}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                            onClick={() => {
                                                signOut();
                                                onClose();
                                            }}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sair
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gold-500/10 flex justify-between items-center bg-muted/20">
                            <span className="text-xs text-muted-foreground">Tema</span>
                            <ThemeSwitcher />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
