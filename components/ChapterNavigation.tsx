import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChapterLink {
    slug: string;
    title: string;
}

interface ChapterNavigationProps {
    prev: ChapterLink | null;
    next: ChapterLink | null;
    basePath: string;
}

export function ChapterNavigation({ prev, next, basePath }: ChapterNavigationProps) {
    if (!prev && !next) return null;

    return (
        <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gold-500/20"
            data-testid="chapter-navigation"
        >
            <div className="w-full sm:w-auto">
                {prev ? (
                    <Link href={`${basePath}/${prev.slug}`} className="block w-full" data-testid="prev-chapter">
                        <Button variant="outline" className="w-full sm:w-auto gap-2 h-auto py-4 px-6 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 group text-left justify-start">
                            <ChevronLeft className="h-5 w-5 text-gold-500 group-hover:-translate-x-1 transition-transform" />
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Anterior</span>
                                <span className="text-gold-500 font-cinzel line-clamp-1">{prev.title}</span>
                            </div>
                        </Button>
                    </Link>
                ) : (
                    <div className="hidden sm:block w-[200px]" />
                )}
            </div>

            <div className="w-full sm:w-auto">
                {next ? (
                    <Link href={`${basePath}/${next.slug}`} className="block w-full" data-testid="next-chapter">
                        <Button variant="outline" className="w-full sm:w-auto gap-2 h-auto py-4 px-6 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 group text-right justify-end">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Próximo</span>
                                <span className="text-gold-500 font-cinzel line-clamp-1">{next.title}</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                ) : (
                    <div className="hidden sm:block w-[200px]" />
                )}
            </div>
        </div>
    );
}
