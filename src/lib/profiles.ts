export interface Profile {
    id: string;
    name: string;
    role: string;
    stack: string[]; // List of tool IDs
    createdAt: string;
}

const STORAGE_KEY = 'allset_profiles';

export const profiles = {
    getAll: (): Profile[] => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    },

    create: (name: string, role: string, stack: string[]): Profile => {
        const newProfile: Profile = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            role,
            stack,
            createdAt: new Date().toISOString(),
        };

        if (typeof window !== 'undefined') {
            const current = profiles.getAll();
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, newProfile]));
        }
        return newProfile;
    },

    delete: (id: string) => {
        if (typeof window !== 'undefined') {
            const current = profiles.getAll();
            const filtered = current.filter(p => p.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
    }
};
