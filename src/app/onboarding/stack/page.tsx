'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

interface Tool {
    id: string;
    name: string;
    category: string;
}

const tools: Tool[] = [
    // IDEs
    { id: 'vscode', name: 'VS Code', category: 'IDE' },
    { id: 'vs-community', name: 'Visual Studio', category: 'IDE' },
    { id: 'intellij', name: 'IntelliJ IDEA', category: 'IDE' },
    { id: 'sublime', name: 'Sublime Text', category: 'IDE' },
    { id: 'cursor', name: 'Cursor', category: 'IDE' },

    // Version Control
    { id: 'git', name: 'Git', category: 'Version Control' },
    { id: 'git-desktop', name: 'GitHub Desktop', category: 'Version Control' },

    // Runtimes & Languages
    { id: 'node', name: 'Node.js', category: 'Runtime' },
    { id: 'python', name: 'Python', category: 'Runtime' },
    { id: 'java', name: 'Java JDK', category: 'Runtime' },
    { id: 'go', name: 'Go', category: 'Runtime' },
    { id: 'rust', name: 'Rust', category: 'Runtime' },
    { id: 'dotnet', name: '.NET SDK', category: 'Runtime' },

    // Databases
    { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
    { id: 'sql-server', name: 'SQL Server', category: 'Database' },
    { id: 'mysql', name: 'MySQL', category: 'Database' },
    { id: 'mongo', name: 'MongoDB', category: 'Database' },
    { id: 'redis', name: 'Redis', category: 'Database' },
    { id: 'sqlite', name: 'SQLite', category: 'Database' },
    { id: 'dbeaver', name: 'DBeaver', category: 'Database' },

    // DevOps & Cloud
    { id: 'docker', name: 'Docker', category: 'DevOps' },
    { id: 'kubernetes-cli', name: 'Kubernetes', category: 'DevOps' },
    { id: 'aws-cli', name: 'AWS CLI', category: 'DevOps' },
    { id: 'azure-cli', name: 'Azure CLI', category: 'DevOps' },

    // Frameworks
    { id: 'react', name: 'React', category: 'Framework' },
    { id: 'nextjs', name: 'Next.js', category: 'Framework' },
    { id: 'angular', name: 'Angular', category: 'Framework' },
    { id: 'vue', name: 'Vue.js', category: 'Framework' },
    { id: 'nest', name: 'NestJS', category: 'Framework' },
    { id: 'express', name: 'Express', category: 'Framework' },

    // Tools
    { id: 'postman', name: 'Postman', category: 'Tools' },
    { id: 'insomnia', name: 'Insomnia', category: 'Tools' },
    { id: 'figma', name: 'Figma', category: 'Tools' },
    { id: 'chrome', name: 'Chrome', category: 'Tools' },
    { id: 'notion', name: 'Notion', category: 'Productivity' },
    { id: 'obsidian', name: 'Obsidian', category: 'Productivity' },
    { id: 'slack', name: 'Slack', category: 'Productivity' },
];

const recommendations: Record<string, string[]> = {
    'backend': ['vscode', 'node', 'python', 'postgres', 'docker', 'postman', 'git', 'cursor', 'nest', 'redis'],
    'frontend': ['vscode', 'node', 'react', 'nextjs', 'chrome', 'figma', 'git', 'cursor'],
    'fullstack': ['vscode', 'node', 'python', 'react', 'nextjs', 'postgres', 'docker', 'git', 'cursor', 'postman'],
    'devops': ['vscode', 'docker', 'kubernetes-cli', 'aws-cli', 'azure-cli', 'python', 'git', 'node'],
};

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
            const userRole = storedRole.toLowerCase() as keyof typeof recommendations;
            if (recommendations[userRole]) {
                setSelectedTools(recommendations[userRole]);
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

    const isRecommended = (toolId: string) => {
        if (!role) return false;
        const userRole = role.toLowerCase() as keyof typeof recommendations;
        return recommendations[userRole]?.includes(toolId);
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
                <p className="onboarding-page-subtitle">
                    Choose the tools you need for your <span style={{ color: 'var(--primary)', textTransform: 'capitalize', fontWeight: 600 }}>{role}</span> environment. We've pre-selected some recommendations.
                </p>
            </div>

            <div className="stack-selection-container">
                {Object.entries(groupedTools).map(([category, categoryTools]) => (
                    <div key={category} className="stack-category-group">
                        <h3 className="stack-category-title">{category}</h3>
                        <div className="stack-grid">
                            {categoryTools.map((tool) => {
                                const selected = selectedTools.includes(tool.id);
                                const recommended = isRecommended(tool.id);
                                return (
                                    <div
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={`card tool-card ${selected ? 'selected' : ''}`}
                                    >
                                        <div className="tool-info">
                                            <span className="tool-name">{tool.name}</span>
                                            {recommended && (
                                                <span className="recommended-badge">★ Recommended</span>
                                            )}
                                        </div>
                                        {selected && <div className="tool-check" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="stack-actions">
                <Button variant="secondary" onClick={() => router.back()}>
                    Back
                </Button>
                <Button size="lg" onClick={handleContinue} disabled={selectedTools.length === 0}>
                    Continue ({selectedTools.length} selected)
                </Button>
            </div>
        </div>
    );
}
