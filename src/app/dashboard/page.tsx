'use client';

import { useEffect, useState, useRef } from 'react';
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
    const [expandedProfileIds, setExpandedProfileIds] = useState<string[]>([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        // Prevent duplicate API calls (React Strict Mode causes double render)
        if (hasFetched.current) return;
        hasFetched.current = true;

        const loadData = async () => {
            const user = await auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUserName(user.name || user.email);
            const data = await profiles.getAll();
            setUserProfiles(data);
        };
        loadData();
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

    const handleDelete = async (id: string) => {
        try {
            await profiles.delete(id);
            const data = await profiles.getAll();
            setUserProfiles(data);
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedProfileIds(prev =>
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const toolNames: Record<string, string> = {
        'vscode': 'VS Code',
        'vs-community': 'Visual Studio',
        'intellij': 'IntelliJ',
        'node': 'Node.js',
        'postgres': 'PostgreSQL',
        'sql-server': 'SQL Server',
        'mongo': 'MongoDB',
        'docker': 'Docker',
        'kubernetes-cli': 'Kubernetes',
        'aws-cli': 'AWS CLI',
        'azure-cli': 'Azure CLI',
        'postman': 'Postman',
        'react': 'React',
        'nextjs': 'Next.js',
        'angular': 'Angular',
        'vue': 'Vue.js',
        'python': 'Python',
        'java': 'Java',
        'go': 'Go',
        'rust': 'Rust',
        'git': 'Git',
        'git-desktop': 'GitHub Desktop',
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
                        {userProfiles.map((profile) => {
                            const isExpanded = expandedProfileIds.includes(profile.id);

                            return (
                                <div key={profile.id} className="card profile-card">
                                    <div className="delete-btn-wrapper">
                                        <button
                                            onClick={() => handleDelete(profile.id)}
                                            className="delete-btn"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    </div>

                                    <div className="profile-content">
                                        <div className="profile-header">
                                            <h3 className="profile-name">{profile.name}</h3>
                                            <span className="profile-role-badge">
                                                {profile.role}
                                            </span>
                                        </div>

                                        <div className={`profile-tools-section ${isExpanded ? 'expanded' : ''}`}>
                                            <div className="tools-header-row">
                                                <p className="tools-label">Includes:</p>
                                                {isExpanded && (
                                                    <button className="close-expanded-btn" onClick={() => toggleExpand(profile.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="tools-list-container">
                                                <div className="tools-list">
                                                    {isExpanded ? (
                                                        profile.stack.map(tool => (
                                                            <span key={tool} className="tool-badge">
                                                                {toolNames[tool] || tool}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <>
                                                            {profile.stack.slice(0, 4).map(tool => (
                                                                <span key={tool} className="tool-badge">
                                                                    {toolNames[tool] || tool}
                                                                </span>
                                                            ))}
                                                            {profile.stack.length > 4 && (
                                                                <button
                                                                    className="more-badge-btn"
                                                                    onClick={() => toggleExpand(profile.id)}
                                                                >
                                                                    +{profile.stack.length - 4} more
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="profile-actions">
                                            <Button onClick={() => handleDownload(profile)}>
                                                Download Setup Script
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );

}
