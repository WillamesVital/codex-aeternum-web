import { useEffect, useState } from "react";
import { useCampaigns } from "@/contexts/CampaignContext";
import { createClient } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Npc, CreateNpcDTO, NpcStatus } from "@/types/npc";
import { Upload, X } from "lucide-react";

interface NpcModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (npc: CreateNpcDTO) => Promise<void>;
    npcToEdit?: Npc;
}

export function NpcModal({ isOpen, onClose, onSave, npcToEdit }: NpcModalProps) {
    const { campaigns } = useCampaigns();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState<CreateNpcDTO>({
        campaign_id: undefined,
        name: "",
        lineage: "",
        role: "",
        status: "alive",
        location: "",
        description: "",
        avatar_url: "",
    });

    useEffect(() => {
        if (npcToEdit) {
            setFormData({
                campaign_id: npcToEdit.campaign_id,
                name: npcToEdit.name,
                lineage: npcToEdit.lineage || "",
                role: npcToEdit.role || "",
                status: npcToEdit.status,
                location: npcToEdit.location || "",
                description: npcToEdit.description || "",
                avatar_url: npcToEdit.avatar_url || "",
            });
        } else {
            setFormData({
                campaign_id: undefined,
                name: "",
                lineage: "",
                role: "",
                status: "alive",
                location: "",
                description: "",
                avatar_url: "",
            });
        }
    }, [npcToEdit, isOpen]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log("File selected:", file.name);
        setIsUploading(true);
        try {
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log("Uploading to path:", filePath);

            const { error: uploadError } = await supabase.storage
                .from('npc-avatars')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error details:", uploadError);
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('npc-avatars')
                .getPublicUrl(filePath);

            console.log("Public URL generated:", publicUrl);
            setFormData({ ...formData, avatar_url: publicUrl });
        } catch (error: any) {
            console.error("Error uploading image:", error);
            alert(`Erro ao fazer upload: ${error.message || "Erro desconhecido"}. Verifique o console para mais detalhes.`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-md border-gold-500/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-cinzel text-gold-500">
                        {npcToEdit ? "Editar NPC" : "Novo NPC"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image Upload Section */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold-500/30 bg-black/40 flex items-center justify-center group">
                                {formData.avatar_url ? (
                                    <>
                                        <img
                                            src={formData.avatar_url}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setFormData({ ...formData, avatar_url: "" })}
                                                className="text-white hover:text-red-500"
                                            >
                                                <X className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Upload className="h-8 w-8 text-gold-500/50" />
                                )}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                />
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {isUploading ? "Enviando..." : "Foto do NPC"}
                            </span>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-black/20 border-gold-500/20 focus:border-gold-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as NpcStatus })}
                                        className="flex h-9 w-full rounded-md border border-gold-500/20 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <option value="alive" className="bg-zinc-950">Vivo</option>
                                        <option value="dead" className="bg-zinc-950">Morto</option>
                                        <option value="missing" className="bg-zinc-950">Desaparecido</option>
                                        <option value="spirit" className="bg-zinc-950">Espírito</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lineage">Linhagem</Label>
                                    <select
                                        id="lineage"
                                        value={formData.lineage}
                                        onChange={(e) => setFormData({ ...formData, lineage: e.target.value })}
                                        className="flex h-9 w-full rounded-md border border-gold-500/20 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <option value="" className="bg-zinc-950">Selecione...</option>
                                        <option value="Humano" className="bg-zinc-950">Humano</option>
                                        <option value="Elenai" className="bg-zinc-950">Elenai</option>
                                        <option value="Ankarim" className="bg-zinc-950">Ankarim</option>
                                        <option value="Nahari" className="bg-zinc-950">Nahari</option>
                                        <option value="Vayren" className="bg-zinc-950">Vayren</option>
                                        <option value="Auren" className="bg-zinc-950">Auren</option>
                                        <option value="Caídos" className="bg-zinc-950">Caídos</option>
                                        <option value="Terrenos" className="bg-zinc-950">Terrenos</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Função/Cargo</Label>
                                    <Input
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="bg-black/20 border-gold-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="campaign">Campanha Associada</Label>
                        <select
                            id="campaign"
                            value={formData.campaign_id || ""}
                            onChange={(e) => setFormData({ ...formData, campaign_id: e.target.value || undefined })}
                            className="flex h-9 w-full rounded-md border border-gold-500/20 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                        >
                            <option value="" className="bg-zinc-950">Nenhuma (Global)</option>
                            {campaigns.map((campaign) => (
                                <option key={campaign.id} value={campaign.id} className="bg-zinc-950">
                                    {campaign.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Localização Atual</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="bg-black/20 border-gold-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Notas & Descrição</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-black/20 border-gold-500/20 min-h-[100px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading || isUploading} className="bg-gold-500 text-black hover:bg-gold-400">
                            {isLoading ? "Salvando..." : "Salvar NPC"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
