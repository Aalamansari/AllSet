'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { profiles, Profile } from '@/lib/profiles';
import { generateScript } from '@/lib/script-generator';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default function DashboardPage() {
    const router = useRouter();
    const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }
        setUserName(user.name);
        setUserProfiles(profiles.getAll());
    }, [router]);

    const handleDownload = (profile: Profile) => {
        const scriptContent = generateScript(profile.name, profile.stack);
        const blob = new Blob([scriptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profile.name.replace(/\s+/g, '_')}_setup.ps1`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleDelete = (id: string) => {
        profiles.delete(id);
        setUserProfiles(profiles.getAll());
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header-content">
                    <div className="logo-text">
                        AllSet
                    </div>
                    <div className="user-nav">
                        <span className="user-welcome">Welcome, {userName}</span>
                        <Button variant="ghost" size="sm" onClick={() => {
                            auth.logout();
                            router.push('/');
                        }}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-actions">
                    <div className="dashboard-title-group">
                        <h1>Your Profiles</h1>
                        <p>Manage your setup configurations.</p>
                    </div>
                    <Link href="/onboarding/role">
                        <Button>+ New Profile</Button>
                    </Link>
                </div>

                {userProfiles.length === 0 ? (
                    <div className="empty-state">
                        <h3>No profiles yet</h3>
                        <p>Create your first setup profile to get started.</p>
                        <Link href="/onboarding/role">
                            <Button>Create Profile</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="profiles-grid">
                        {userProfiles.map((profile) => (
                            <div key={profile.id} className="card group profile-card">
                                <div className="delete-btn-wrapper">
                                    <button
                                        onClick={() => handleDelete(profile.id)}
                                        className="delete-btn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </div>

                                <div className="profile-content">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{profile.name}</h3>
                                        <span className="profile-role-badge">
                                            {profile.role}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-400">Includes:</p>
                                        <div className="tools-list">
                                            {profile.stack.slice(0, 4).map(tool => (
                                                <span key={tool} className="tool-badge">
                                                    {tool}
                                                </span>
                                            ))}
                                            {profile.stack.length > 4 && (
                                                <span className="more-badge">+{profile.stack.length - 4} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <Button className="w-full" onClick={() => handleDownload(profile)}>
                                            Download Setup Script
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
