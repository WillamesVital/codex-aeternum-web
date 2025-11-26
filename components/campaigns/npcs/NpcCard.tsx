import { useState } from "react";
import { Npc } from "@/types/npc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/Dialog";
import { Edit, Trash2, MapPin, Skull, Ghost, HelpCircle, User } from "lucide-react";

interface NpcCardProps {
    npc: Npc;
    onEdit: (npc: Npc) => void;
    onDelete: (id: string) => void;
    allowEdit?: boolean;
    allowDelete?: boolean;
}

const statusConfig = {
    alive: { label: "Vivo", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: User },
    dead: { label: "Morto", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: Skull },
    missing: { label: "Desaparecido", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: HelpCircle },
    spirit: { label: "Espírito", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Ghost },
};

export function NpcCard({ npc, onEdit, onDelete, allowEdit = true, allowDelete = true }: NpcCardProps) {
    const status = statusConfig[npc.status] || statusConfig.alive;
    const StatusIcon = status.icon;

    return (
        <Card className="bg-black/40 border-gold-500/20 hover:border-gold-500/40 transition-colors group">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                        {npc.avatar_url && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="h-12 w-12 rounded-full overflow-hidden border border-gold-500/30 cursor-pointer hover:border-gold-500 transition-colors">
                                        <img
                                            src={npc.avatar_url}
                                            alt={npc.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] p-0 bg-transparent border-none shadow-none flex items-center justify-center">
                                    <DialogTitle className="sr-only">{npc.name}</DialogTitle>
                                    <div className="relative w-full max-h-[80vh] overflow-hidden rounded-lg border-2 border-gold-500/50 bg-black/90">
                                        <img
                                            src={npc.avatar_url}
                                            alt={npc.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                        <div>
                            <CardTitle className="text-lg font-cinzel text-gold-400">{npc.name}</CardTitle>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                {npc.lineage && <span>{npc.lineage}</span>}
                                {npc.lineage && npc.role && <span>•</span>}
                                {npc.role && <span className="italic">{npc.role}</span>}
                            </div>
                            {npc.campaigns?.title && (
                                <div className="text-xs text-gold-500/80 mt-1 flex items-center gap-1">
                                    <span>Campanha: {npc.campaigns.title}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Badge variant="outline" className={`${status.color} flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {npc.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-gold-500/70" />
                        <span>{npc.location}</span>
                    </div>
                )}

                {npc.description && (
                    <p className="text-sm text-muted-foreground/80 italic border-l-2 border-gold-500/10 pl-2 line-clamp-3">
                        {npc.description}
                    </p>
                )}

                <div className="pt-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {allowEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(npc)} className="h-8 w-8 hover:text-gold-500">
                            <Edit className="h-4 w-4" />
                        </Button>
                    )}
                    {allowDelete && (
                        <Button variant="ghost" size="icon" onClick={() => onDelete(npc.id)} className="h-8 w-8 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
