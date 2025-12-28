'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiBook, FiList, FiPlayCircle, FiStar, FiMenu, FiChevronLeft } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isGuide = pathname === '/guide';

    return (
        <aside
            className={cn(
                "sidebar",
                !isOpen && "collapsed"
            )}
        >
            <div className="sidebar-header" style={{ justifyContent: isOpen ? 'space-between' : 'center', padding: '1.25rem' }}>
                {isOpen && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Image src="/logo.png" alt="AllSet Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
                        <span className="logo-text">AllSet</span>
                    </div>
                )}
                <button onClick={toggle} className="sidebar-toggle-btn" style={{ margin: 0 }}>
                    {isOpen ? <FiChevronLeft size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {isOpen && (
                <nav className="sidebar-nav" style={{ padding: '0 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link
                        href="/dashboard"
                        className={cn(
                            "nav-item",
                            isActive('/dashboard') && "active"
                        )}
                        style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.75rem 1rem' }}
                    >
                        Dashboard
                    </Link>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link
                            href="/guide"
                            className={cn(
                                "nav-item",
                                isGuide && "active"
                            )}
                            style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.75rem 1rem' }}
                        >
                            Guide
                        </Link>

                        <div className="nav-sub-items" style={{ marginTop: '0.25rem', marginLeft: '1.5rem', borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href="/guide#prerequisites" className="nav-sub-item" style={{ padding: '4px 0', fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>Prerequisites</a>
                            <a href="/guide#flow" className="nav-sub-item" style={{ padding: '4px 0', fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>How it works</a>
                            <a href="/guide#features" className="nav-sub-item" style={{ padding: '4px 0', fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>Features</a>
                        </div>
                    </div>
                </nav>
            )}
        </aside>
    );
}
