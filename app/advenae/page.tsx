import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScrollText, ArrowRight, Compass } from "lucide-react";
import { getAdvenaeChaptersMeta } from "@/lib/advenae-loader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function AdvenaePage() {
    const chapters = getAdvenaeChaptersMeta();

    return (
        <div className="container mx-auto py-12 px-6 lg:px-12 max-w-[1200px]">
            <Breadcrumbs items={[{ label: "Liber Advenae" }]} />

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gold-500 font-cinzel mb-4">
                    Liber Advenae
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    O Livro do Jogador. Aqui começa a tua jornada, Advenae.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter) => (
                    <Link key={chapter.slug} href={`/advenae/${chapter.slug}`} className="group">
                        <Card className="h-full bg-background/50 backdrop-blur-sm border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gold-500/70 uppercase tracking-wider">
                                        Capítulo {chapter.order}
                                    </span>
                                    <Compass className="h-5 w-5 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
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
