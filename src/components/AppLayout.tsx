'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('sidebar_open');
        if (saved !== null) {
            setIsSidebarOpen(saved === 'true');
        }
        setIsMounted(true);
    }, []);

    const toggleSidebar = () => {
        const newState = !isSidebarOpen;
        setIsSidebarOpen(newState);
        localStorage.setItem('sidebar_open', String(newState));
    };

    if (!isMounted) return <div className="layout-wrapper" style={{ minHeight: '100vh', background: 'var(--background)' }}>{children}</div>;

    return (
        <div className="layout-wrapper">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <main
                className="layout-content"
                style={{
                    marginLeft: isSidebarOpen ? '260px' : '70px',
                    transition: 'margin-left 0.3s ease'
                }}
            >
                {children}
            </main>
        </div>
    );
}
