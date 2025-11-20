import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getGrimoireChaptersMeta } from "@/lib/grimoire-loader";
import Link from "next/link";
import { Book } from "lucide-react";

export default function GrimoireIndex() {
    const chapters = getGrimoireChaptersMeta();

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gold-500 font-cinzel mb-4">
                    Grimoire Magistrum
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    &quot;O Livro do Mestre - O Custódio da Criação&quot;. Aqui jazem os segredos para guiar as almas através de Aeternum.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter) => (
                    <Link href={`/grimoire/${chapter.slug}`} key={chapter.slug}>
                        <Card className="h-full hover:border-gold-500 transition-colors cursor-pointer bg-background/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-start gap-2">
                                    <Book className="h-5 w-5 mt-1 shrink-0" />
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
