export type NpcStatus = 'alive' | 'dead' | 'missing' | 'spirit';

export interface Npc {
    id: string;
    user_id: string;
    campaign_id?: string;
    name: string;
    lineage?: string;
    role?: string;
    status: NpcStatus;
    location?: string;
    description?: string;
    avatar_url?: string;
    created_at: string;
    campaigns?: {
        title: string;
    };
}

export type CreateNpcDTO = Omit<Npc, 'id' | 'created_at' | 'user_id'> & { user_id?: string };
export type UpdateNpcDTO = Partial<Omit<Npc, 'id' | 'created_at'>>;
