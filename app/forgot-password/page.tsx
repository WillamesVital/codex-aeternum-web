"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${redirectUrl}/auth/callback?next=/update-password`,
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
                        Recuperar Senha
                    </CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                        Digite seu email para receber o link de redefinição
                    </p>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-6">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <p className="text-center text-lg font-medium">Email enviado!</p>
                            <p className="text-center text-sm text-muted-foreground">
                                Verifique sua caixa de entrada (e spam) para redefinir sua senha.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="mt-4">
                                    Voltar para Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
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
                                {loading ? "Enviando..." : "Enviar Link"}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
