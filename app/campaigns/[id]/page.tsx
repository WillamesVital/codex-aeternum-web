"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCampaigns, Campaign } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ArrowLeft, ScrollText, MapPin, Skull, Shield, Sword, Eye, ChevronDown, Users } from "lucide-react";
import Link from "next/link";
import { NpcList } from "@/components/campaigns/npcs/NpcList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { SessionList } from "@/components/campaigns/sessions/SessionList";
import { DMScreen } from "@/components/campaigns/dm-screen/DMScreen";

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { campaigns, isLoading, updateCampaign } = useCampaigns();
    const [campaign, setCampaign] = useState<Campaign | null>(null);

    useEffect(() => {
        if (!isLoading) {
            const found = campaigns.find((c) => c.id === id);
            if (found) {
                setCampaign(found);
            } else {
                router.push("/campaigns");
            }
        }
    }, [id, campaigns, isLoading, router]);

    if (isLoading || !campaign) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/campaigns">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-cinzel text-gold-500">{campaign.title}</h1>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span className="uppercase tracking-wider">{campaign.vigil}</span>
                            <span>•</span>
                            <span className="italic">{campaign.spiritualTheme}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gold-500/20 text-gold-500 hover:bg-gold-500/10 hover:text-gold-400 uppercase tracking-wider text-xs h-8">
                                {campaign.status === "active" ? "Ativa" :
                                    campaign.status === "paused" ? "Em andamento" : // Mapping old 'paused' to 'Em andamento' if needed, or just use the value
                                        campaign.status === "completed" ? "Concluída" :
                                            campaign.status}
                                <ChevronDown className="ml-2 h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => updateCampaign(campaign.id, { status: "Ativa" })}>
                                Ativa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateCampaign(campaign.id, { status: "Em andamento" })}>
                                Em andamento
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateCampaign(campaign.id, { status: "Encerrada" })}>
                                Encerrada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateCampaign(campaign.id, { status: "Concluída" })}>
                                Concluída
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-black/40 border border-gold-500/20">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-cinzel">Visão Geral</TabsTrigger>
                    <TabsTrigger value="sessions" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-cinzel">Diário de Sessões</TabsTrigger>
                    <TabsTrigger value="dm-screen" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-cinzel">Escudo do Mestre</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Core Info & Arc */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Synopsis */}
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-gold-400 flex items-center gap-2">
                                        <ScrollText className="h-4 w-4" /> Sinopse
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {campaign.synopsis || "Sem sinopse definida."}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Initial Arc */}
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-gold-400 flex items-center gap-2">
                                        <Eye className="h-4 w-4" /> O Arco Inicial
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 rounded bg-black/20 border border-gold-500/10">
                                            <span className="text-xs text-gold-500 uppercase block mb-1">Sussurro</span>
                                            <p className="text-sm">{campaign.initialArc?.whisper || "-"}</p>
                                        </div>
                                        <div className="p-3 rounded bg-black/20 border border-gold-500/10">
                                            <span className="text-xs text-gold-500 uppercase block mb-1">Sinal</span>
                                            <p className="text-sm">{campaign.initialArc?.signal || "-"}</p>
                                        </div>
                                        <div className="p-3 rounded bg-black/20 border border-gold-500/10">
                                            <span className="text-xs text-red-500 uppercase block mb-1">Corrupção</span>
                                            <p className="text-sm">{campaign.initialArc?.corruption || "-"}</p>
                                        </div>
                                        <div className="p-3 rounded bg-black/20 border border-gold-500/10">
                                            <span className="text-xs text-gold-500 uppercase block mb-1">Escolha</span>
                                            <p className="text-sm">{campaign.initialArc?.choice || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded bg-gold-900/10 border border-gold-500/20">
                                        <span className="text-xs text-gold-400 uppercase block mb-1">Juízo Parcial</span>
                                        <p className="text-sm italic">{campaign.initialArc?.judgment || "-"}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Locations */}
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-gold-400 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Cenários
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-gold-500">Cidade</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <p><span className="text-gold-500/70">Nome:</span> {campaign.locations?.city?.name || "-"}</p>
                                            <p><span className="text-gold-500/70">Pecado:</span> {campaign.locations?.city?.sin || "-"}</p>
                                            <p><span className="text-gold-500/70">Virtude:</span> {campaign.locations?.city?.virtue || "-"}</p>
                                            {campaign.locations?.city?.description && (
                                                <p className="mt-2 text-xs italic border-l-2 border-gold-500/20 pl-2">
                                                    {campaign.locations.city.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-gold-500">Santuário</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <p><span className="text-gold-500/70">Nome:</span> {campaign.locations?.sanctuary?.name || "-"}</p>
                                            <p><span className="text-gold-500/70">Status:</span> {campaign.locations?.sanctuary?.status || "-"}</p>
                                            <p><span className="text-gold-500/70">Esperança:</span> {campaign.locations?.sanctuary?.hope || "-"}</p>
                                            {campaign.locations?.sanctuary?.description && (
                                                <p className="mt-2 text-xs italic border-l-2 border-gold-500/20 pl-2">
                                                    {campaign.locations.sanctuary.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-red-500">Fenda</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <p><span className="text-gold-500/70">Local:</span> {campaign.locations?.rift?.location || "-"}</p>
                                            <p><span className="text-gold-500/70">Intensidade:</span> {campaign.locations?.rift?.intensity || "-"}</p>
                                            <p><span className="text-gold-500/70">Desejo:</span> {campaign.locations?.rift?.desire || "-"}</p>
                                            {campaign.locations?.rift?.description && (
                                                <p className="mt-2 text-xs italic border-l-2 border-red-500/20 pl-2">
                                                    {campaign.locations.rift.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Corruption & NPCs */}
                        <div className="space-y-6">
                            {/* Corruption Roots */}
                            <Card className="bg-black/40 border-red-900/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-red-500 flex items-center gap-2">
                                        <Skull className="h-4 w-4" /> Raízes da Corrupção
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <span className="text-xs text-red-400 uppercase tracking-wider block mb-1">Primária</span>
                                        <p className="text-sm font-medium">{campaign.corruptionRoots?.primary || "-"}</p>
                                    </div>
                                    {campaign.corruptionRoots?.secondary && (
                                        <div>
                                            <span className="text-xs text-red-400/70 uppercase tracking-wider block mb-1">Secundária</span>
                                            <p className="text-sm text-muted-foreground">{campaign.corruptionRoots.secondary}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* NPCs */}
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-gold-400 flex items-center gap-2">
                                        <Shield className="h-4 w-4" /> Personagens Chave
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-3 rounded bg-blue-900/10 border border-blue-500/20">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-blue-400 uppercase font-bold">Aliado</span>
                                            <span className="text-xs text-blue-400/70">{campaign.npcs?.ally?.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Virtude: {campaign.npcs?.ally?.virtue} • Pecado: {campaign.npcs?.ally?.sin}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded bg-red-900/10 border border-red-500/20">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-red-400 uppercase font-bold">Oponente</span>
                                            <span className="text-xs text-red-400/70">{campaign.npcs?.opponent?.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Raiz: {campaign.npcs?.opponent?.root} • Meta: {campaign.npcs?.opponent?.goal}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded bg-gray-800/30 border border-gray-500/20">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-400 uppercase font-bold">Neutro</span>
                                            <span className="text-xs text-gray-400/70">{campaign.npcs?.neutral?.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Segredo: {campaign.npcs?.neutral?.secret}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Catalysts */}
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-cinzel text-gold-400 flex items-center gap-2">
                                        <Sword className="h-4 w-4" /> Catalisadores
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {campaign.catalysts?.map((cat, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gold-500/10 pb-2 last:border-0 last:pb-0">
                                            <span className="font-medium text-gold-500/90">{cat.name || "Sem nome"}</span>
                                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-white/5">
                                                {cat.type}
                                            </span>
                                        </div>
                                    ))}
                                    {(!campaign.catalysts || campaign.catalysts.length === 0) && (
                                        <p className="text-sm text-muted-foreground italic">Nenhum catalisador registrado.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Expanded NPC Manager */}
                        <div className="lg:col-span-3">
                            <Card className="bg-black/40 border-gold-500/20">
                                <CardHeader>
                                    <CardTitle className="text-xl font-cinzel text-gold-500 flex items-center gap-2">
                                        <Users className="h-5 w-5" /> Galeria de Personagens & NPCs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <NpcList campaignId={campaign.id} allowCreation={false} allowEdit={false} allowDelete={false} userId={campaign.user_id} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="sessions" className="mt-6">
                    <SessionList campaign={campaign} />
                </TabsContent>

                <TabsContent value="dm-screen" className="mt-6">
                    <DMScreen />
                </TabsContent>
            </Tabs>
        </div >
    );
}
