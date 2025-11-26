import { createClient } from "@/lib/supabase";
import { Npc, CreateNpcDTO, UpdateNpcDTO } from "@/types/npc";

export async function fetchNpcs(params: { campaignId?: string; userId?: string }): Promise<Npc[]> {
    const supabase = createClient();
    let query = supabase
        .from("npcs")
        .select("*, campaigns(title)")
        .order("name", { ascending: true });

    if (params.campaignId && params.userId) {
        query = query.or(`campaign_id.eq.${params.campaignId},and(user_id.eq.${params.userId},campaign_id.is.null)`);
    } else if (params.campaignId) {
        query = query.eq("campaign_id", params.campaignId);
    } else if (params.userId) {
        query = query.eq("user_id", params.userId);
    } else {
        return [];
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching NPCs:", error);
        throw error;
    }

    return data as Npc[];
}

export async function createNpc(npc: CreateNpcDTO): Promise<Npc> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("npcs")
        .insert(npc)
        .select()
        .single();

    if (error) {
        console.error("Error creating NPC:", error);
        throw error;
    }

    return data as Npc;
}

export async function updateNpc(id: string, updates: UpdateNpcDTO): Promise<Npc> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("npcs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating NPC:", error);
        throw error;
    }

    return data as Npc;
}

export async function deleteNpc(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
        .from("npcs")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting NPC:", error);
        throw error;
    }
}
