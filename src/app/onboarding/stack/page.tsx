'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

interface Tool {
    id: string;
    name: string;
    category: string;
    icon?: string;
}

const tools: Tool[] = [
    { id: 'vscode', name: 'Visual Studio Code', category: 'IDE' },
    { id: 'vs-community', name: 'Visual Studio Community', category: 'IDE' },
    { id: 'git-desktop', name: 'GitHub Desktop', category: 'Version Control' },
    { id: 'git', name: 'Git', category: 'Version Control' },
    { id: 'node', name: 'Node.js (LTS)', category: 'Runtime' },
    { id: 'python', name: 'Python 3.11', category: 'Runtime' },
    { id: 'java', name: 'Java JDK 17', category: 'Runtime' },
    { id: 'sql-server', name: 'Microsoft SQL Server', category: 'Database' },
    { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
    { id: 'mongo', name: 'MongoDB', category: 'Database' },
    { id: 'docker', name: 'Docker Desktop', category: 'DevOps' },
    { id: 'postman', name: 'Postman', category: 'Tools' },
    { id: 'notion', name: 'Notion', category: 'Productivity' },
    { id: 'angular', name: 'Angular CLI', category: 'Framework' },
    { id: 'react', name: 'Create React App', category: 'Framework' },
];

export default function StackSelectionPage() {
    const router = useRouter();
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = sessionStorage.getItem('allset_role');
        if (!storedRole) {
            router.push('/onboarding/role');
        } else {
            setRole(storedRole);
            // Pre-select some tools based on role (optional, but nice)
            if (storedRole === 'backend') {
                setSelectedTools(['vs-community', 'sql-server', 'node', 'postman', 'docker']);
            }
        }
    }, [router]);

    const toggleTool = (id: string) => {
        setSelectedTools(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleContinue = () => {
        sessionStorage.setItem('allset_stack', JSON.stringify(selectedTools));
        router.push('/onboarding/profile');
    };

    const groupedTools = tools.reduce((acc, tool) => {
        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool);
        return acc;
    }, {} as Record<string, Tool[]>);

    return (
        <div className="onboarding-page-wrapper animate-fade-in">
            <div className="onboarding-header-section">
                <h1 className="onboarding-page-title">Select your Stack</h1>
                <p className="onboarding-page-subtitle">Choose the tools you need for your {role} environment.</p>
            </div>

            <div className="onboarding-page-wrapper">
                {Object.entries(groupedTools).map(([category, categoryTools]) => (
                    <div key={category} className="stack-category-group">
                        <h3 className="stack-category-title">{category}</h3>
                        <div className="stack-grid">
                            {categoryTools.map((tool) => (
                                <div
                                    key={tool.id}
                                    onClick={() => toggleTool(tool.id)}
                                    className={`card tool-card ${selectedTools.includes(tool.id) ? 'selected' : ''}`}
                                >
                                    <span className="tool-name">{tool.name}</span>
                                    {selectedTools.includes(tool.id) && (
                                        <div className="tool-check" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="stack-actions">
                <Button variant="secondary" onClick={() => router.back()}>
                    Back
                </Button>
                <Button size="lg" onClick={handleContinue} disabled={selectedTools.length === 0}>
                    Continue ({selectedTools.length})
                </Button>
            </div>
        </div>
    );
}
