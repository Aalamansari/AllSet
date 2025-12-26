import { supabase } from './supabase';

export interface Profile {
    id: string;
    name: string;
    role: string;
    stack: string[];
    created_at?: string;
}

export const profiles = {
    getAll: async (): Promise<Profile[]> => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching profiles:', error);
            return [];
        }
        return data as Profile[];
    },

    create: async (name: string, role: string, stack: string[]): Promise<Profile | null> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('profiles')
            .insert({
                user_id: user.id,
                name,
                role,
                stack
            })
            .select()
            .single();

        if (error) throw error;
        return data as Profile;
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
