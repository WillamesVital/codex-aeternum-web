"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-gold-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-cinzel text-center text-gold-500">
                        Codex Aeternum
                    </CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                        Entre para acessar seus grimórios
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mestre@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-muted-foreground hover:text-gold-500 transition-colors"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded border border-red-500/20">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-gold-600 hover:bg-gold-700 text-black font-bold"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Não tem uma conta?{" "}
                        <Link href="/signup" className="text-gold-500 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
