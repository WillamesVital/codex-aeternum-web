import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Palette } from "lucide-react";

export const metadata = {
    title: "Galeria de Artes | Codex Aeternum",
    description: "Uma coleção de artes conceituais, personagens e locais do universo de Aeternum.",
};

export default function GalleryPage() {
    return (
        <div className="container mx-auto py-24 px-4">
            <div className="text-center mb-16">
                <Palette className="h-16 w-16 text-gold-500 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold text-gold-500 font-cinzel mb-4">
                    Galeria de Artes
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Contemple as visões do Firmamentum, os horrores do Inferis e os habitantes deste mundo quebrado.
                </p>
            </div>

            <GalleryGrid />
        </div>
    );
}
