import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getGrimoireChaptersMeta } from "@/lib/grimoire-loader";
import Link from "next/link";
import { Book, ArrowRight } from "lucide-react";

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
                    <Link href={`/grimoire/${chapter.slug}`} key={chapter.slug} className="group">
                        <Card className="h-full bg-background/50 backdrop-blur-sm border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gold-500/70 uppercase tracking-wider">
                                        Capítulo {chapter.order}
                                    </span>
                                    <Book className="h-5 w-5 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
                                </div>
                                <CardTitle className="text-xl font-cinzel text-gold-100 group-hover:text-gold-400 transition-colors">
                                    {chapter.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                    {chapter.description}
                                </p>
                                <div className="flex items-center text-xs font-medium text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Ler Capítulo <ArrowRight className="ml-1 h-3 w-3" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
