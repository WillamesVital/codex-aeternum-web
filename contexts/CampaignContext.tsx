"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

export interface Campaign {
    id: string;
    user_id: string;
    title: string;
    synopsis: string;
    spiritualTheme: string;
    createdAt: Date;
    status: "active" | "completed" | "paused" | "Ativa" | "Em andamento" | "Encerrada" | "Concluída";

    // Grimoire Chapter 33 Fields
    vigil: string;
    focus: "Restoration" | "Resistance" | "Revelation" | "";
    corruptionRoots: {
        primary: string;
        secondary?: string;
    };
    locations: {
        city: { name: string; sin: string; virtue: string; description?: string };
        sanctuary: { name: string; status: string; hope: string; description?: string };
        rift: { location: string; intensity: string; desire: string; description?: string };
    };
    catalysts: Array<{ name: string; type: string; purpose: string }>;
    npcs: {
        ally: { name: string; virtue: string; sin: string };
        opponent: { name: string; root: string; goal: string };
        neutral: { name: string; secret: string; risk: string };
    };
    initialArc: {
        whisper: string;
        signal: string;
        corruption: string;
        choice: string;
        judgment: string;
    };
}

interface CampaignContextType {
    campaigns: Campaign[];
    addCampaign: (campaign: Omit<Campaign, "id" | "createdAt" | "status">) => void;
    updateCampaign: (id: string, updates: Partial<Campaign>) => void;
    deleteCampaign: (id: string) => void;
    isLoading: boolean;
}

interface CampaignRow {
    id: string;
    user_id: string;
    title: string;
    status: string;
    created_at: string;
    data: {
        synopsis?: string;
        spiritualTheme?: string;
        vigil?: string;
        focus?: "Restoration" | "Resistance" | "Revelation" | "";
        corruptionRoots?: { primary: string; secondary?: string };
        locations?: {
            city: { name: string; sin: string; virtue: string; description?: string };
            sanctuary: { name: string; status: string; hope: string; description?: string };
            rift: { location: string; intensity: string; desire: string; description?: string };
        };
        npcs?: {
            ally: { name: string; virtue: string; sin: string };
            opponent: { name: string; root: string; goal: string };
            neutral: { name: string; secret: string; risk: string };
        };
        catalysts?: Array<{ name: string; type: string; purpose: string }>;
        initialArc?: {
            whisper: string;
            signal: string;
            corruption: string;
            choice: string;
            judgment: string;
        };
        // Legacy fields support
        corruptionRoots_legacy?: any;
        locations_legacy?: any;
        npcs_legacy?: any;
        catalysts_legacy?: any;
        initialArc_legacy?: any;
        vigil_legacy?: any;
        focus_legacy?: any;
    };
    // Legacy top-level fields
    corruptionRoots?: any;
    locations?: any;
    npcs?: any;
    catalysts?: any;
    initialArc?: any;
    vigil?: any;
    focus?: any;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    // Fetch campaigns from Supabase
    useEffect(() => {
        if (!user) {
            setCampaigns([]);
            setIsLoading(false);
            return;
        }

        const fetchCampaigns = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("campaigns")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching campaigns:", error.message, error);
            } else if (data) {
                // Map Supabase data to Campaign interface
                // Ensure dates are Date objects
                const mapped: Campaign[] = (data as unknown as CampaignRow[]).map((item) => ({
                    ...item,
                    user_id: item.user_id,
                    status: item.status as Campaign["status"],
                    createdAt: new Date(item.created_at),
                    synopsis: item.data?.synopsis || "",
                    spiritualTheme: item.data?.spiritualTheme || "",
                    // Ensure nested objects exist if they were saved as null/undefined
                    corruptionRoots: item.data?.corruptionRoots || item.corruptionRoots,
                    locations: item.data?.locations || item.locations,
                    npcs: item.data?.npcs || item.npcs,
                    catalysts: item.data?.catalysts || item.catalysts,
                    initialArc: item.data?.initialArc || item.initialArc,
                    vigil: item.data?.vigil || item.vigil,
                    focus: item.data?.focus || item.focus,
                }));
                setCampaigns(mapped);
            }
            setIsLoading(false);
        };

        fetchCampaigns();
    }, [user]);

    const addCampaign = async (data: Omit<Campaign, "id" | "createdAt" | "status">) => {
        if (!user) return;

        const newCampaign = {
            user_id: user.id,
            title: data.title,
            synopsis: data.synopsis,
            spiritual_theme: data.spiritualTheme, // Note: DB column might need to match or we map it
            status: "active",
            data: {
                vigil: data.vigil,
                focus: data.focus,
                corruptionRoots: data.corruptionRoots,
                locations: data.locations,
                npcs: data.npcs,
                catalysts: data.catalysts,
                initialArc: data.initialArc,
            }
        };

        // We need to handle the column mapping. 
        // My previous schema had: title, status, data. 
        // It did NOT have spiritual_theme or synopsis as top level columns?
        // Let's check the schema I gave: title, status, data.
        // So synopsis and spiritualTheme should go into 'data' or I need to alter schema.
        // The schema was: title TEXT, status TEXT, data JSONB.
        // So I should put everything else in data or add columns.
        // Let's put everything in data for now to match the schema I gave.

        const campaignDataToSave = {
            user_id: user.id,
            title: data.title,
            status: "active",
            data: {
                synopsis: data.synopsis,
                spiritualTheme: data.spiritualTheme,
                vigil: data.vigil,
                focus: data.focus,
                corruptionRoots: data.corruptionRoots,
                locations: data.locations,
                npcs: data.npcs,
                catalysts: data.catalysts,
                initialArc: data.initialArc,
            }
        };

        const { data: inserted, error } = await supabase
            .from("campaigns")
            .insert(campaignDataToSave)
            .select()
            .single();

        if (error) {
            console.error("Error adding campaign:", error.message, error);
            return;
        }

        if (inserted) {
            const mapped: Campaign = {
                id: inserted.id,
                user_id: inserted.user_id,
                title: inserted.title,
                status: inserted.status as Campaign["status"],
                createdAt: new Date(inserted.created_at),
                synopsis: inserted.data.synopsis,
                spiritualTheme: inserted.data.spiritualTheme,
                vigil: inserted.data.vigil,
                focus: inserted.data.focus,
                corruptionRoots: inserted.data.corruptionRoots,
                locations: inserted.data.locations,
                npcs: inserted.data.npcs,
                catalysts: inserted.data.catalysts,
                initialArc: inserted.data.initialArc,
            };
            setCampaigns((prev) => [mapped, ...prev]);
        }
    };

    const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
        // We need to merge updates into the data jsonb
        // This is tricky with partial updates if we don't have the full object.
        // For simplicity, we can fetch the current state or just update what we know.
        // But since we have local state 'campaigns', we can find the current one.

        const current = campaigns.find(c => c.id === id);
        if (!current) return;

        const updatedFull = { ...current, ...updates };

        const dataToUpdate = {
            title: updatedFull.title,
            status: updatedFull.status,
            data: {
                synopsis: updatedFull.synopsis,
                spiritualTheme: updatedFull.spiritualTheme,
                vigil: updatedFull.vigil,
                focus: updatedFull.focus,
                corruptionRoots: updatedFull.corruptionRoots,
                locations: updatedFull.locations,
                npcs: updatedFull.npcs,
                catalysts: updatedFull.catalysts,
                initialArc: updatedFull.initialArc,
            }
        };

        const { error } = await supabase
            .from("campaigns")
            .update(dataToUpdate)
            .eq("id", id);

        if (error) {
            console.error("Error updating campaign:", error);
            return;
        }

        setCampaigns((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
    };

    const deleteCampaign = async (id: string) => {
        const { error } = await supabase
            .from("campaigns")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting campaign:", error);
            return;
        }

        setCampaigns((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <CampaignContext.Provider
            value={{ campaigns, addCampaign, updateCampaign, deleteCampaign, isLoading }}
        >
            {children}
        </CampaignContext.Provider>
    );
}

export function useCampaigns() {
    const context = useContext(CampaignContext);
    if (context === undefined) {
        throw new Error("useCampaigns must be used within a CampaignProvider");
    }
    return context;
}
