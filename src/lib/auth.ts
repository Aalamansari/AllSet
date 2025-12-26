import { supabase } from './supabase';

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export const auth = {
    login: async (email: string, password?: string) => {
        if (password) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data.user;
        } else {
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
            });
            if (error) throw error;
            return null;
        }
    },

    signup: async (email: string, password?: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: password || undefined,
        });
        if (error) throw error;
        return data.user;
    },

    logout: async () => {
        await supabase.auth.signOut();
    },

    getUser: async (): Promise<User | null> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        return {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.full_name || user.email?.split('@')[0],
            role: user.user_metadata?.role,
        };
    },

    isAuthenticated: async (): Promise<boolean> => {
        const user = await auth.getUser();
        return !!user;
    }
};
