'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { IconType } from 'react-icons';

// Import from different icon packs
import {
    DiVisualstudio,
    DiJava,
    DiGit,
    DiGithubBadge,
    DiNodejsSmall,
    DiPython,
    DiPostgresql,
    DiMysql,
    DiMongodb,
    DiRedis,
    DiDocker,
    DiReact,
    DiAngularSimple,
    DiRust,
    DiGo
} from 'react-icons/di';

import {
    SiIntellijidea,
    SiSublimetext,
    SiDotnet,
    SiSqlite,
    SiKubernetes,
    SiAmazonwebservices,
    SiNextdotjs,
    SiVuedotjs,
    SiNestjs,
    SiExpress,
    SiPostman,
    SiInsomnia,
    SiFigma,
    SiGooglechrome,
    SiNotion,
    SiObsidian,
    SiSlack
} from 'react-icons/si';

import { VscVscode, VscAzure } from 'react-icons/vsc';
import { FaDatabase, FaCode } from 'react-icons/fa';

interface Tool {
    id: string;
    name: string;
    category: string;
    icon: IconType;
}

const tools: Tool[] = [
    // IDEs
    { id: 'vscode', name: 'VS Code', category: 'IDE', icon: VscVscode },
    { id: 'vs-community', name: 'Visual Studio', category: 'IDE', icon: DiVisualstudio },
    { id: 'intellij', name: 'IntelliJ IDEA', category: 'IDE', icon: SiIntellijidea },
    { id: 'sublime', name: 'Sublime Text', category: 'IDE', icon: SiSublimetext },
    { id: 'cursor', name: 'Cursor', category: 'IDE', icon: FaCode },

    // Version Control
    { id: 'git', name: 'Git', category: 'Version Control', icon: DiGit },
    { id: 'git-desktop', name: 'GitHub Desktop', category: 'Version Control', icon: DiGithubBadge },

    // Runtimes & Languages
    { id: 'node', name: 'Node.js', category: 'Runtime', icon: DiNodejsSmall },
    { id: 'python', name: 'Python', category: 'Runtime', icon: DiPython },
    { id: 'java', name: 'Java JDK', category: 'Runtime', icon: DiJava },
    { id: 'go', name: 'Go', category: 'Runtime', icon: DiGo },
    { id: 'rust', name: 'Rust', category: 'Runtime', icon: DiRust },
    { id: 'dotnet', name: '.NET SDK', category: 'Runtime', icon: SiDotnet },

    // Databases
    { id: 'postgres', name: 'PostgreSQL', category: 'Database', icon: DiPostgresql },
    { id: 'sql-server', name: 'SQL Server', category: 'Database', icon: FaDatabase },
    { id: 'mysql', name: 'MySQL', category: 'Database', icon: DiMysql },
    { id: 'mongo', name: 'MongoDB', category: 'Database', icon: DiMongodb },
    { id: 'redis', name: 'Redis', category: 'Database', icon: DiRedis },
    { id: 'sqlite', name: 'SQLite', category: 'Database', icon: SiSqlite },
    { id: 'dbeaver', name: 'DBeaver', category: 'Database', icon: FaDatabase },

    // DevOps & Cloud
    { id: 'docker', name: 'Docker', category: 'DevOps', icon: DiDocker },
    { id: 'kubernetes-cli', name: 'Kubernetes', category: 'DevOps', icon: SiKubernetes },
    { id: 'aws-cli', name: 'AWS CLI', category: 'DevOps', icon: SiAmazonwebservices },
    { id: 'azure-cli', name: 'Azure CLI', category: 'DevOps', icon: VscAzure },

    // Frameworks
    { id: 'react', name: 'React', category: 'Framework', icon: DiReact },
    { id: 'nextjs', name: 'Next.js', category: 'Framework', icon: SiNextdotjs },
    { id: 'angular', name: 'Angular', category: 'Framework', icon: DiAngularSimple },
    { id: 'vue', name: 'Vue.js', category: 'Framework', icon: SiVuedotjs },
    { id: 'nest', name: 'NestJS', category: 'Framework', icon: SiNestjs },
    { id: 'express', name: 'Express', category: 'Framework', icon: SiExpress },

    // Tools
    { id: 'postman', name: 'Postman', category: 'Tools', icon: SiPostman },
    { id: 'insomnia', name: 'Insomnia', category: 'Tools', icon: SiInsomnia },
    { id: 'figma', name: 'Figma', category: 'Tools', icon: SiFigma },
    { id: 'chrome', name: 'Chrome', category: 'Tools', icon: SiGooglechrome },
    { id: 'notion', name: 'Notion', category: 'Productivity', icon: SiNotion },
    { id: 'obsidian', name: 'Obsidian', category: 'Productivity', icon: SiObsidian },
    { id: 'slack', name: 'Slack', category: 'Productivity', icon: SiSlack },
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
                                const IconComponent = tool.icon;
                                return (
                                    <div
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={`card tool-card ${selected ? 'selected' : ''}`}
                                    >
                                        <div className="tool-info">
                                            <div className="tool-name-row">
                                                <span className={`tool-icon ${selected ? 'selected' : ''}`}>
                                                    <IconComponent size={18} />
                                                </span>
                                                <span className="tool-name">{tool.name}</span>
                                            </div>
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
