"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Session } from "@/contexts/CampaignContext";
import { Save } from "lucide-react";

interface SessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (session: Session) => void;
    sessionToEdit?: Session | null;
    campaignTitle: string;
    players: string[];
}

const INITIAL_DATA: Omit<Session, "id"> = {
    date: new Date().toISOString().split('T')[0],
    title: "",
    summary: "",
    gmNotes: "",
    nextSessionDate: "",
};

export function SessionModal({ isOpen, onClose, onSave, sessionToEdit, campaignTitle, players }: SessionModalProps) {
    const [formData, setFormData] = useState<Omit<Session, "id">>(INITIAL_DATA);
    const [sendEmail, setSendEmail] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (sessionToEdit) {
                setFormData({
                    date: sessionToEdit.date,
                    title: sessionToEdit.title,
                    summary: sessionToEdit.summary,
                    gmNotes: sessionToEdit.gmNotes || "",
                    nextSessionDate: sessionToEdit.nextSessionDate || "",
                });
            } else {
                setFormData({
                    ...INITIAL_DATA,
                    date: new Date().toISOString().split('T')[0]
                });
            }
        }
    }, [isOpen, sessionToEdit]);

    const handleSubmit = async () => {
        setIsSending(true);
        const session = {
            id: sessionToEdit?.id || crypto.randomUUID(),
            ...formData,
        };

        onSave(session);

        if (sendEmail && players.length > 0) {
            try {
                await fetch('/api/send-session-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session,
                        campaignTitle,
                        players
                    }),
                });
            } catch (error) {
                console.error("Failed to send email:", error);
            }
        }

        setIsSending(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-background border-gold-500/20">
                <DialogHeader>
                    <DialogTitle className="font-cinzel text-2xl text-gold-500">
                        {sessionToEdit ? "Editar Sessão" : "Nova Sessão"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Data da Sessão</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Próxima Sessão (Agendamento)</Label>
                            <Input
                                type="date"
                                value={formData.nextSessionDate}
                                onChange={(e) => setFormData({ ...formData, nextSessionDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Input
                            placeholder="Ex: O Encontro na Taverna"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Resumo dos Eventos</Label>
                        <Textarea
                            placeholder="O que aconteceu..."
                            className="min-h-[100px]"
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gold-500/80">Anotações do Mestre (Privado)</Label>
                        <Textarea
                            placeholder="Segredos, ideias, consequências..."
                            className="min-h-[80px] border-gold-500/20 bg-black/20"
                            value={formData.gmNotes}
                            onChange={(e) => setFormData({ ...formData, gmNotes: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="send-email"
                            className="h-4 w-4 rounded border-gold-500/50 bg-background text-gold-600 focus:ring-gold-500"
                            checked={sendEmail}
                            onChange={(e) => setSendEmail(e.target.checked)}
                        />
                        <Label htmlFor="send-email" className="cursor-pointer">
                            Enviar resumo por e-mail e agendar calendário ({players.length} jogadores)
                        </Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} disabled={isSending}>Cancelar</Button>
                    <Button onClick={handleSubmit} className="bg-gold-600 hover:bg-gold-700 text-black" disabled={isSending}>
                        <Save className="mr-2 h-4 w-4" /> {isSending ? "Enviando..." : "Salvar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
