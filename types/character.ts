export type CharacterType = 'PC' | 'NPC';

export interface Character {
    id?: string;
    user_id?: string;
    name: string;
    lineage: string;
    vocation: string;
    type?: 'PC';
    description?: string;
    created_at?: string;
    updated_at?: string;
}
