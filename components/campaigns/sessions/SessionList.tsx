"use client";

import { useState } from "react";
import { Campaign, Session, useCampaigns } from "@/contexts/CampaignContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Calendar, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { SessionModal } from "./SessionModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SessionListProps {
    campaign: Campaign;
}

export function SessionList({ campaign }: SessionListProps) {
    const { updateCampaign } = useCampaigns();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<Session | null>(null);
    const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

    const handleSaveSession = (session: Session) => {
        const newSessions = editingSession
            ? campaign.sessions.map((s) => (s.id === session.id ? session : s))
            : [session, ...campaign.sessions];

        // Sort by date descending
        newSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        updateCampaign(campaign.id, { sessions: newSessions });
        setEditingSession(null);
    };

    const handleDeleteSession = (sessionId: string) => {
        if (confirm("Tem certeza que deseja excluir esta sessão?")) {
            const newSessions = campaign.sessions.filter((s) => s.id !== sessionId);
            updateCampaign(campaign.id, { sessions: newSessions });
        }
    };

    const openEditModal = (session: Session) => {
        setEditingSession(session);
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setEditingSession(null);
        setIsModalOpen(true);
    };

    const toggleExpand = (id: string) => {
        setExpandedSessionId(expandedSessionId === id ? null : id);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        try {
            return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: ptBR });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-cinzel text-gold-500">Diário de Sessões</h2>
                <Button onClick={openNewModal} className="bg-gold-600 hover:bg-gold-700 text-black">
                    <Plus className="mr-2 h-4 w-4" /> Nova Sessão
                </Button>
            </div>

            <div className="space-y-4">
                {campaign.sessions.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gold-500/20 rounded-lg">
                        <p className="text-muted-foreground">Nenhuma sessão registrada ainda.</p>
                        <Button variant="link" onClick={openNewModal} className="text-gold-500">
                            Comece registrando a primeira sessão
                        </Button>
                    </div>
                ) : (
                    campaign.sessions.map((session) => (
                        <Card key={session.id} className="bg-black/40 border-gold-500/20 transition-all hover:border-gold-500/40">
                            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleExpand(session.id)}>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gold-500/80">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(session.date)}</span>
                                        </div>
                                        <CardTitle className="text-lg font-cinzel text-gold-100">
                                            {session.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {expandedSessionId === session.id ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                                    </div>
                                </div>
                            </CardHeader>
                            {expandedSessionId === session.id && (
                                <CardContent className="pt-2 space-y-4 animate-in slide-in-from-top-2">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-gold-500">Resumo</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {session.summary}
                                        </p>
                                    </div>

                                    {session.gmNotes && (
                                        <div className="p-3 rounded bg-gold-900/10 border border-gold-500/10 space-y-1">
                                            <h4 className="text-xs font-bold text-gold-500 uppercase tracking-wider">Notas do Mestre</h4>
                                            <p className="text-sm text-muted-foreground italic whitespace-pre-wrap">
                                                {session.gmNotes}
                                            </p>
                                        </div>
                                    )}

                                    {session.nextSessionDate && (
                                        <div className="flex items-center gap-2 text-sm text-green-500/80 pt-2 border-t border-white/5">
                                            <Calendar className="h-4 w-4" />
                                            <span>Próxima Sessão: {formatDate(session.nextSessionDate)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEditModal(session); }}>
                                            <Edit2 className="h-4 w-4 mr-2" /> Editar
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-900/20" onClick={(e) => { e.stopPropagation(); handleDeleteSession(session.id); }}>
                                            <Trash2 className="h-4 w-4 mr-2" /> Excluir
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>

            <SessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSession}
                sessionToEdit={editingSession}
                campaignTitle={campaign.title}
                players={campaign.players}
            />
        </div>
    );
}
