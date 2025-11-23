export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

const STORAGE_KEY = 'allset_user';

export const auth = {
    login: (email: string): User => {
        // Mock login - just create a user from email
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
        };
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }
        return user;
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    },

    getUser: (): User | null => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    },

    isAuthenticated: (): boolean => {
        return !!auth.getUser();
    }
};
