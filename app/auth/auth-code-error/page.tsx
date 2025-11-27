"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-red-500/20 bg-black/40 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-cinzel text-red-500">
                        Erro de Autenticação
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        Não foi possível validar seu acesso. Isso pode acontecer se:
                    </p>
                    <ul className="text-sm text-left list-disc list-inside space-y-1 text-muted-foreground/80 bg-black/20 p-4 rounded border border-white/5">
                        <li>O link de recuperação expirou</li>
                        <li>O link já foi utilizado</li>
                        <li>Você abriu o link em um navegador diferente do que solicitou a recuperação</li>
                    </ul>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/login">
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black font-bold">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para Login
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
