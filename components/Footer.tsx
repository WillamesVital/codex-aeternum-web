import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-gold-500/20 bg-background py-8">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-gold-500" />
                    <span className="font-cinzel text-lg font-bold text-gold-500">
                        Codex Aeternum
                    </span>
                </div>
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Codex Aeternum. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
