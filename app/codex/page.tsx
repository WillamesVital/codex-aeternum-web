import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { codexChapters } from "@/lib/codex-data";
import Link from "next/link";
import { ScrollText } from "lucide-react";

export default function CodexPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    O Codex Aeternum
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Bem-vindo ao repositório de todo o conhecimento. Aqui jaz a história, as
                    regras e os segredos do mundo.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {codexChapters.map((chapter) => (
                    <Link href={`/codex/${chapter.id}`} key={chapter.id}>
                        <Card className="h-full hover:border-gold-500 transition-colors cursor-pointer bg-background/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-start gap-2">
                                    <ScrollText className="h-5 w-5 mt-1 shrink-0" />
                                    <span>{chapter.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {chapter.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
