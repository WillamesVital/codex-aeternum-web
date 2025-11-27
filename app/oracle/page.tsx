"use client";

import { useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function OraclePage() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [latestResponse, setLatestResponse] = useState<string | null>(null);

    const handleClear = () => {
        setLatestResponse(null);
        setInput("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setLatestResponse(""); // Clear previous response to show streaming

        try {
            // We send only the current prompt for this "Oracle" style interaction
            // If you want history, you'd need to manage it, but the UI suggests single Q&A
            const messages = [{ role: 'user', content: input.trim() }];

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages })
            });

            if (!response.ok) throw new Error('Failed to fetch response');
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedResponse += chunk;
                setLatestResponse(accumulatedResponse);
            }

        } catch (error) {
            console.error('Error:', error);
            setLatestResponse("O Véu está espesso... não consigo ouvir as vozes agora. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <Sparkles className="h-10 w-10 text-gold-500" />
                    </div>
                    <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gold-500 tracking-widest uppercase">
                        Vozes do Firmamentum
                    </h1>
                    <p className="font-serif text-lg text-muted-foreground italic">
                        "Pergunte ao Custódio da Memória. O mundo responde aos que sabem ouvir."
                    </p>
                </div>

                {/* Input Section (Top) */}
                <div className="relative">
                    <div className="border border-gold-500/20 rounded-lg p-1 bg-background/50 backdrop-blur-sm shadow-lg">
                        <form onSubmit={handleSubmit} className="relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="O que você busca saber sobre Aeternum?"
                                className="w-full bg-transparent border-none rounded-lg p-6 min-h-[120px] focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground resize-none font-serif text-lg"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                {latestResponse && (
                                    <Button
                                        type="button"
                                        onClick={handleClear}
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-foreground font-cinzel text-xs flex items-center gap-1"
                                    >
                                        <Trash2 className="h-3 w-3" /> LIMPAR
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-gold-500 hover:bg-gold-600 text-background font-cinzel font-bold px-6 py-2 rounded-md shadow-lg transition-all flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <Sparkles className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            PERGUNTAR <Send className="h-3 w-3" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Response Section (Bottom) */}
                {latestResponse && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-background/80 backdrop-blur-md rounded-lg p-8 shadow-2xl border-t-4 border-gold-500 relative overflow-hidden">

                            {/* Label Tag */}
                            <div className="absolute top-0 left-8 bg-gold-500 px-3 py-1 rounded-b-md shadow-sm">
                                <span className="font-cinzel text-[10px] font-bold text-background tracking-widest uppercase">
                                    O Oráculo Responde
                                </span>
                            </div>

                            {/* Content */}
                            <div className="mt-6 prose prose-lg max-w-none font-serif leading-relaxed text-foreground prose-headings:text-gold-500 prose-p:text-foreground prose-strong:text-gold-400 prose-em:text-foreground prose-li:text-foreground prose-ul:text-foreground prose-ol:text-foreground">
                                <ReactMarkdown>{latestResponse}</ReactMarkdown>
                            </div>

                            {/* Footer Signature */}
                            <div className="mt-8 pt-4 border-t border-gold-500/20 text-right">
                                <span className="font-cinzel text-xs italic text-muted-foreground">— Custódio da Memória</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
