'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

const roles = [
    { id: 'backend', title: 'Backend Developer', description: 'Server-side logic, databases, and APIs.' },
    { id: 'frontend', title: 'Frontend Developer', description: 'User interfaces, client-side logic, and UX.' },
    { id: 'fullstack', title: 'Fullstack Developer', description: 'Both frontend and backend development.' },
    { id: 'devops', title: 'DevOps Engineer', description: 'CI/CD, infrastructure, and cloud services.' },
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
                <p className="onboarding-page-subtitle">Select the role that best describes your work.</p>
            </div>

            <div className="roles-grid">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`card role-card ${selectedRole === role.id ? 'selected' : ''}`}
                    >
                        <h3 className="role-title">{role.title}</h3>
                        <p className="role-description">{role.description}</p>
                    </div>
                ))}
            </div>

            <div className="onboarding-actions">
                <Button size="lg" onClick={handleContinue} disabled={!selectedRole}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
