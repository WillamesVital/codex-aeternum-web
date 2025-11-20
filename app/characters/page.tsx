import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Construction, Sword } from "lucide-react";
import Link from "next/link";

export default function CharactersPage() {
    return (
        <div className="container mx-auto py-24 px-4 text-center">
            <div className="max-w-2xl mx-auto">
                <Sword className="h-16 w-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    Construtor de Personagens
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    A forja está fria no momento. Nossos ferreiros estão trabalhando incansavelmente para trazer
                    as ferramentas para você criar suas lendas.
                </p>

                <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20 mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Construction className="h-5 w-5" />
                            <span>Em Construção</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Volte em breve para criar Humanos, Elenai, Ankarim e mais.
                        </p>
                    </CardContent>
                </Card>

                <Link href="/">
                    <Button variant="outline">Voltar ao Início</Button>
                </Link>
            </div>
        </div>
    );
}
