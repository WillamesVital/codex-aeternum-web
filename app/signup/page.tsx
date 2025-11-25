"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: displayName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-gold-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-cinzel text-center text-gold-500">
                        Junte-se ao Codex
                    </CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                        Crie sua conta para forjar lendas
                    </p>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-6">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <p className="text-center text-lg font-medium">Conta criada com sucesso!</p>
                            <p className="text-center text-sm text-muted-foreground">
                                Enviamos um link de confirmação para o seu email.
                                <br />
                                Por favor, verifique sua caixa de entrada (e spam) para ativar sua conta.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="mt-4">
                                    Voltar para Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Nome de Usuário</Label>
                                <Input
                                    id="displayName"
                                    type="text"
                                    placeholder="Como quer ser chamado?"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
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
                                    minLength={6}
                                />
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
                                {loading ? "Criando conta..." : "Criar Conta"}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="text-gold-500 hover:underline">
                            Entrar
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
