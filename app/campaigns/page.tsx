"use client";

import { useState, useEffect } from "react";
import { useIsMaster } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useCampaigns, Campaign } from "@/contexts/CampaignContext";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CreateCampaignModal } from "@/components/campaigns/CreateCampaignModal";

export default function CampaignsPage() {
    const { isMaster, isLoaded, isSignedIn } = useIsMaster();
    const router = useRouter();
    const { campaigns, deleteCampaign, isLoading } = useCampaigns();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
        } else if (isLoaded && isSignedIn && !isMaster) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn, isMaster, router]);

    const handleCreate = () => {
        setEditingCampaign(null);
        setIsCreateModalOpen(true);
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setIsCreateModalOpen(true);
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="min-h-screen bg-background text-gold-500 flex items-center justify-center font-cinzel">
                Carregando o Grimório...
            </div>
        );
    }

    if (!isMaster) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center border-b border-gold-500/20 pb-6">
                    <div>
                        <h1 className="text-4xl font-cinzel text-gold-500 mb-2">Minhas Campanhas</h1>
                        <p className="text-muted-foreground font-sans">
                            Gerencie suas crônicas e guie os destinos de Aeternum.
                        </p>
                    </div>
                    <Button
                        onClick={handleCreate}
                        className="bg-gold-600 hover:bg-gold-700 text-black font-medium"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Campanha
                    </Button>
                </div>

                {campaigns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gold-500/20 rounded-lg bg-gold-500/5">
                        <h3 className="text-xl font-cinzel text-gold-400 mb-2">O Grimório está vazio</h3>
                        <p className="text-muted-foreground mb-6 text-center max-w-md">
                            Nenhuma história foi escrita ainda. O destino de Aeternum aguarda sua pena.
                        </p>
                        <Button
                            onClick={handleCreate}
                            variant="outline"
                            className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
                        >
                            Começar uma nova Jornada
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onDelete={deleteCampaign}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}

                <CreateCampaignModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    campaignToEdit={editingCampaign}
                />
            </div>
        </div>
    );
}
