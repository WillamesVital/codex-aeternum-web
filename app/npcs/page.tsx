"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { NpcList } from "@/components/campaigns/npcs/NpcList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NpcsPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUserId(user.id);
            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-cinzel text-gold-500">Dramatis Personae</h1>
                    <p className="text-muted-foreground">Gerencie todos os seus NPCs e personagens.</p>
                </div>
            </div>

            <Card className="bg-black/40 border-gold-500/20">
                <CardHeader>
                    <CardTitle className="text-xl font-cinzel text-gold-500 flex items-center gap-2">
                        <Users className="h-5 w-5" /> Galeria Completa
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* NpcList handles fetching by userId if campaignId is not provided, 
                        but we need to update NpcList to support passing userId explicitly or 
                        handling the "no campaign" case by fetching for the user. 
                        
                        Currently NpcList takes `campaignId`. We should update it to accept `userId` too.
                        Wait, I updated fetchNpcs but not NpcList props.
                        I need to update NpcList props to allow optional campaignId and optional userId.
                    */}
                    {userId && <NpcList userId={userId} />}
                </CardContent>
            </Card>
        </div>
    );
}
