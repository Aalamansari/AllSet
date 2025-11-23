'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState, useEffect } from 'react';
import { profiles } from '@/lib/profiles';

export default function ProfileCreationPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [role, setRole] = useState<string | null>(null);
    const [stack, setStack] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedRole = sessionStorage.getItem('allset_role');
        const storedStack = sessionStorage.getItem('allset_stack');

        if (!storedRole || !storedStack) {
            router.push('/onboarding/role');
        } else {
            setRole(storedRole);
            setStack(JSON.parse(storedStack));
        }
    }, [router]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (role && stack.length > 0) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                profiles.create(name, role, stack);
                // Clear session storage
                sessionStorage.removeItem('allset_role');
                sessionStorage.removeItem('allset_stack');
                router.push('/dashboard');
            }, 1000);
        }
    };

    return (
        <div className="profile-creation-wrapper animate-fade-in">
            <div className="onboarding-header-section">
                <h1 className="onboarding-page-title">Name your Profile</h1>
                <p className="onboarding-page-subtitle">Give your setup a name to save it for later.</p>
            </div>

            <div className="card glass profile-summary-card">
                <div className="space-y-4">
                    <div className="summary-row">
                        <span>Role</span>
                        <span className="summary-value capitalize">{role}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tools Selected</span>
                        <span className="summary-value">{stack.length} items</span>
                    </div>
                </div>

                <form onSubmit={handleCreate} className="profile-form">
                    <Input
                        id="name"
                        label="Profile Name"
                        placeholder="e.g. Office Backend Setup"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                    />

                    <div className="profile-actions">
                        <Button type="button" variant="secondary" className="flex-1" onClick={() => router.back()}>
                            Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={loading || !name}>
                            {loading ? 'Creating...' : 'Create Profile'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
