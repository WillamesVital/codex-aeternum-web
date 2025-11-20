
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, ScrollText, Users, Shield, Sword, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-background to-background">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gold-500 drop-shadow-lg">
            Codex Aeternum
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            &quot;O que foi criado para durar para sempre, agora mal sustenta um novo amanhecer&quot;
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/codex">
              <Button size="lg" className="shadow-gold-500/20">
                Entrar no Codex
              </Button>
            </Link>
            <Link href="/characters">
              <Button variant="outline" size="lg">
                Criar Personagem
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>A Lore</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore a história de Aeternum, da Era do Desígnio ao Crepúsculo do presente.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20">
              <CardHeader>
                <Users className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>Os Povos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprenda sobre os Humanos, Elenai, Ankarim e outras raças que habitam este mundo quebrado.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-gold-500/20">
              <CardHeader>
                <ScrollText className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>As Regras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Domine as mecânicas do sistema de RPG, da criação de personagens ao combate e magia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
