import Link from "next/link";
import { Campaign } from "@/contexts/CampaignContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, ScrollText, Trash2, Edit } from "lucide-react";

interface CampaignCardProps {
    campaign: Campaign;
    onDelete: (id: string) => void;
    onEdit: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onDelete, onEdit }: CampaignCardProps) {
    return (
        <Card className="flex flex-col h-full border-gold-500/20 bg-black/40 backdrop-blur-sm hover:border-gold-500/50 transition-colors">
            <CardHeader>
                <CardTitle className="text-xl font-cinzel text-gold-500 line-clamp-1">
                    {campaign.title}
                </CardTitle>
                <div className="flex items-center text-xs text-muted-foreground space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{campaign.createdAt.toLocaleDateString()}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-gold-500/10 text-gold-500 text-[10px] uppercase tracking-wider">
                        {campaign.status}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {campaign.synopsis}
                </p>
                {campaign.spiritualTheme && (
                    <div className="p-3 rounded bg-gold-900/20 border border-gold-500/10">
                        <div className="flex items-center space-x-2 mb-1">
                            <ScrollText className="h-3 w-3 text-gold-400" />
                            <span className="text-xs font-medium text-gold-400 uppercase tracking-wide">
                                Tema Espiritual
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                            "{campaign.spiritualTheme}"
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gold-500/10 pt-4">
                <div className="flex space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-gold-500"
                        onClick={() => onEdit(campaign)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        onClick={() => onDelete(campaign.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <Link href={`/campaigns/${campaign.id}`}>
                    <Button size="sm" variant="outline" className="text-xs">
                        Abrir Grimório
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
