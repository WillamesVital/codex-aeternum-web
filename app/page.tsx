import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, ScrollText, Sword, Sparkles, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-32 md:py-48 lg:py-56 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-background to-background z-0" />
        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-sm font-medium animate-fade-in">
            Bem-vindo a Aeternum
          </div>
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-gold-500 drop-shadow-2xl font-cinzel mb-6">
            Codex Aeternum
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl mb-10">
            Onde lendas são forjadas e o conhecimento é poder.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/codex">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-8 py-6 text-lg shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.6)] transition-all duration-300">
                Explorar o Codex
              </Button>
            </Link>
            <Link href="/grimoire">
              <Button variant="outline" size="lg" className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10 px-8 py-6 text-lg">
                Abrir Grimório
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flavor Section */}
      <section className="w-full py-16 bg-black/20 border-y border-gold-500/10">
        <div className="container px-4 mx-auto text-center">
          <Sparkles className="h-8 w-8 text-gold-500 mx-auto mb-6 opacity-50" />
          <blockquote className="font-cinzel text-2xl md:text-3xl text-gold-100/80 italic max-w-4xl mx-auto leading-relaxed">
            &quot;O que foi criado para durar para sempre, agora mal sustenta um novo amanhecer.&quot;
          </blockquote>
          <p className="mt-4 text-gold-500/50 text-sm uppercase tracking-widest">— As Crônicas Perdidas</p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Codex Card */}
            <Link href="/codex" className="group">
              <Card className="h-full bg-zinc-900/50 border-gold-500/20 group-hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-2xl font-cinzel text-gold-100 group-hover:text-gold-400 transition-colors">O Codex</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Mergulhe na história profunda, conheça os povos e descubra os segredos de Aeternum.
                  </p>
                  <div className="flex items-center text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Ler História <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Grimoire Card */}
            <Link href="/grimoire" className="group">
              <Card className="h-full bg-zinc-900/50 border-gold-500/20 group-hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <ScrollText className="h-12 w-12 text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-2xl font-cinzel text-gold-100 group-hover:text-gold-400 transition-colors">O Grimório</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Consulte as regras, magias e mecânicas essenciais para mestres e jogadores.
                  </p>
                  <div className="flex items-center text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Ver Regras <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Advenae Card */}
            <Link href="/advenae" className="group">
              <Card className="h-full bg-zinc-900/50 border-gold-500/20 group-hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <Compass className="h-12 w-12 text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-2xl font-cinzel text-gold-100 group-hover:text-gold-400 transition-colors">Liber Advenae</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    O Livro do Jogador. Guia essencial para criar e evoluir seus heróis.
                  </p>
                  <div className="flex items-center text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Ler Livro <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Characters Card */}
            <Link href="/characters" className="group">
              <Card className="h-full bg-zinc-900/50 border-gold-500/20 group-hover:border-gold-500/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <Sword className="h-12 w-12 text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-2xl font-cinzel text-gold-100 group-hover:text-gold-400 transition-colors">A Forja</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Crie seus heróis, gerencie suas fichas e prepare-se para a aventura.
                  </p>
                  <div className="flex items-center text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Criar Personagem <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
