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
                            className={`card role-card ${isSelected ? 'selected' : ''}`}
                        >
                            <div className={`role-icon-wrapper ${isSelected ? 'selected' : ''}`}>
                                <Icon size={28} />
                            </div>

                            <h3 className={`role-title ${isSelected ? 'selected' : ''}`}>
                                {role.title}
                            </h3>
                            <p className="role-description">
                                {role.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="onboarding-actions">
                <Button
                    size="lg"
                    onClick={handleContinue}
                    disabled={!selectedRole}
                >
                    Continue
                    <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </Button>
            </div>
        </div>
    );
}
