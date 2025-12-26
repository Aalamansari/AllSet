'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Server, Layout, Layers, Cloud, ArrowRight } from 'lucide-react';

const roles = [
    {
        id: 'backend',
        title: 'Backend Developer',
        description: 'Server-side logic, databases, APIs, and microservices.',
        icon: Server
    },
    {
        id: 'frontend',
        title: 'Frontend Developer',
        description: 'User interfaces, client-side logic, UX/UI, and web apps.',
        icon: Layout
    },
    {
        id: 'fullstack',
        title: 'Fullstack Developer',
        description: 'End-to-end development, handling both frontend and backend.',
        icon: Layers
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        description: 'CI/CD pipelines, cloud infrastructure, and automation.',
        icon: Cloud
    },
];

export default function RoleSelectionPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            sessionStorage.setItem('allset_role', selectedRole);
            router.push('/onboarding/stack');
        }
    };

    return (
        <div className="onboarding-page-wrapper animate-fade-in">
            <div className="onboarding-header-section">
                <h1 className="onboarding-page-title">Choose your Role</h1>
                <p className="onboarding-page-subtitle">Select the role that best describes your work to get recommended tools.</p>
            </div>

            <div className="roles-grid">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`card role-card group relative overflow-hidden transition-all duration-300 ${isSelected
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                                    : 'hover:border-primary/50 hover:bg-white/5'
                                }`}
                        >
                            <div className={`p-3 rounded-lg w-fit mb-4 transition-colors ${isSelected ? 'bg-primary text-black' : 'bg-white/10 text-white group-hover:bg-primary/20 group-hover:text-primary'
                                }`}>
                                <Icon size={28} />
                            </div>

                            <h3 className={`role-title text-xl mb-2 ${isSelected ? 'text-primary' : 'text-white'}`}>
                                {role.title}
                            </h3>
                            <p className="role-description text-sm text-gray-400 leading-relaxed">
                                {role.description}
                            </p>

                            {/* Abstract decorative circle */}
                            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl transition-all duration-500 ${isSelected ? 'bg-primary/20 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
                                }`} />
                        </div>
                    );
                })}
            </div>

            <div className="onboarding-actions fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-lg border-t border-white/10 flex justify-end max-w-6xl mx-auto w-full">
                <Button
                    size="lg"
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className="flex items-center gap-2 group"
                >
                    Continue
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
    );
}
