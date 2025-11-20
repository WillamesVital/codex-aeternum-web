"use client";

import { useState, useEffect } from "react";
import { Search, X, Loader2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    title: string;
    description: string;
    snippet: string;
    matchType: 'title' | 'content';
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setResults(data.results);
                } catch (error) {
                    console.error("Erro na busca:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Impedir scroll do body quando aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl"
                        >
                            <div className="bg-[#0F172A] border border-gold-500/30 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">

                                {/* Header / Input */}
                                <div className="flex items-center border-b border-gold-500/20 p-4 gap-3">
                                    <Search className="w-5 h-5 text-gold-500" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Buscar no Codex..."
                                        className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 text-gold-500 animate-spin" />
                                    ) : (
                                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {/* Results List */}
                                <div className="overflow-y-auto p-2">
                                    {results.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            {results.map((result) => (
                                                <Link
                                                    key={result.id}
                                                    href={`/codex/${result.id}`}
                                                    onClick={onClose}
                                                    className="group flex items-start gap-3 p-3 rounded-md hover:bg-gold-500/10 transition-colors"
                                                >
                                                    <BookOpen className="w-5 h-5 text-gold-500 mt-1 shrink-0 opacity-50 group-hover:opacity-100" />
                                                    <div>
                                                        <h4 className="font-cinzel text-gold-400 group-hover:text-gold-500 font-semibold">
                                                            {result.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {result.snippet}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : query.length >= 2 && !isLoading ? (
                                        <div className="p-8 text-center text-muted-foreground">
                                            Nenhum resultado encontrado para "{query}".
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-muted-foreground/50 text-sm">
                                            Digite para pesquisar nos capítulos, lore e regras.
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="bg-gold-500/5 p-2 text-xs text-center text-muted-foreground border-t border-gold-500/10">
                                    Pressione <span className="font-mono bg-black/20 px-1 rounded">ESC</span> para fechar
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
