import { useEffect, useState } from "react";
import { Npc, CreateNpcDTO } from "@/types/npc";
import { fetchNpcs, createNpc, updateNpc, deleteNpc } from "@/lib/api/npcs";
import { NpcCard } from "./NpcCard";
import { NpcModal } from "./NpcModal";
import { Button } from "@/components/ui/Button";
import { Plus, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface NpcListProps {
    campaignId?: string;
    userId?: string;
    allowCreation?: boolean;
    allowEdit?: boolean;
    allowDelete?: boolean;
}

export function NpcList({ campaignId, userId, allowCreation = true, allowEdit = true, allowDelete = true }: NpcListProps) {
    const [npcs, setNpcs] = useState<Npc[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNpc, setEditingNpc] = useState<Npc | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadNpcs();
    }, [campaignId, userId]);

    const loadNpcs = async () => {
        setIsLoading(true);
        try {
            const data = await fetchNpcs({ campaignId, userId });
            setNpcs(data);
        } catch (error) {
            console.error("Failed to load NPCs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (data: CreateNpcDTO) => {
        try {
            if (editingNpc) {
                const updated = await updateNpc(editingNpc.id, data);
                setNpcs(npcs.map(n => n.id === updated.id ? updated : n));
            } else {
                const payload = {
                    ...data,
                    user_id: userId
                };
                if (campaignId) {
                    payload.campaign_id = campaignId;
                }

                const created = await createNpc(payload);
                setNpcs([...npcs, created]);
            }
        } catch (error) {
            console.error("Failed to save NPC", error);
            throw error;
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este NPC?")) return;
        try {
            await deleteNpc(id);
            setNpcs(npcs.filter(n => n.id !== id));
        } catch (error) {
            console.error("Failed to delete NPC", error);
        }
    };

    const filteredNpcs = npcs.filter(npc =>
        npc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        npc.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        npc.lineage?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar NPCs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-black/20 border-gold-500/20"
                    />
                </div>
                {allowCreation && (
                    <Button onClick={() => { setEditingNpc(undefined); setIsModalOpen(true); }} className="w-full sm:w-auto gap-2">
                        <Plus className="h-4 w-4" /> Adicionar NPC
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
                </div>
            ) : filteredNpcs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNpcs.map((npc) => (
                        <NpcCard
                            key={npc.id}
                            npc={npc}
                            onEdit={(n) => { setEditingNpc(n); setIsModalOpen(true); }}
                            onDelete={handleDelete}
                            allowEdit={allowEdit}
                            allowDelete={allowDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-gold-500/20 rounded-lg bg-black/20">
                    <Users className="h-12 w-12 text-gold-500/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum NPC encontrado.</p>
                    {allowCreation && (
                        <Button variant="link" onClick={() => { setEditingNpc(undefined); setIsModalOpen(true); }} className="text-gold-500">
                            Crie o primeiro
                        </Button>
                    )}
                </div>
            )}

            <NpcModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                npcToEdit={editingNpc}
            />
        </div>
    );
}
