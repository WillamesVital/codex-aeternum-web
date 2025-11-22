import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Construction, Sword, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCharacterPage() {
    return (
        <div className="container mx-auto py-24 px-4 text-center">
            <div className="max-w-2xl mx-auto">
                <Link href="/characters" className="inline-flex items-center text-muted-foreground hover:text-gold-500 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar para Meus Personagens
                </Link>

                <Sword className="h-16 w-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    Forjar Nova Lenda
                </h1>

                <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20 mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Construction className="h-5 w-5" />
                            <span>Em Construção</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A forja de heróis está sendo preparada. Em breve você poderá criar seus personagens.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
