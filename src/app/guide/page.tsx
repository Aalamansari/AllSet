'use client';

import { AppLayout } from '@/components/AppLayout';

export default function GuidePage() {
    return (
        <AppLayout>
            <div className="guide-container animate-fade-in">
                <header className="guide-header">
                    <h1>Setup Guide</h1>
                    <p className="subtitle">Everything you need to know to get started with AllSet scripts.</p>
                </header>

                <section className="guide-section" id="prerequisites">
                    <h2>Prerequisites</h2>
                    <div className="card guide-card">
                        <ul className="prereq-list">
                            <li>
                                <span className="icon">🪟</span>
                                <div className="content">
                                    <strong>Windows 10 (1709+) or Windows 11</strong>
                                    <p>The script utilizes native features found in modern Windows versions.</p>
                                </div>
                            </li>
                            <li>
                                <span className="icon">🛡️</span>
                                <div className="content">
                                    <strong>Administrator Privileges</strong>
                                    <p>You must run your terminal as Administrator to allow software installation and system PATH updates.</p>
                                </div>
                            </li>
                            <li>
                                <span className="icon">📦</span>
                                <div className="content">
                                    <strong>App Installer (Winget)</strong>
                                    <p>Most installations use the Windows Package Manager. If missing, install "App Installer" from the Microsoft Store.</p>
                                </div>
                            </li>
                            <li>
                                <span className="icon">🌐</span>
                                <div className="content">
                                    <strong>Internet Connection</strong>
                                    <p>Required to download the latest versions of your selected tools.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="guide-section" id="flow">
                    <h2>How it Works</h2>
                    <div className="flow-steps">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Create Profile</h3>
                            <p>Select your role and customize your stack. AllSet generates a tailored setup script.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Get the Command</h3>
                            <p>Click "Copy Command" on your dashboard to get the one-liner installation script.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Run & Relax</h3>
                            <p>Paste into PowerShell (Admin). The script automatically installs IDEs, Languages, Databases, and Tools.</p>
                        </div>
                    </div>
                </section>

                <section className="guide-section" id="features">
                    <h2>Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <strong>⚡ One-Line Setup</strong>
                            <p>No manual downloads required. Just command and go.</p>
                        </div>
                        <div className="feature-item">
                            <strong>🔧 Smart Path Handling</strong>
                            <p>Detects if tools like Node.js are newly installed and advises on path updates.</p>
                        </div>
                        <div className="feature-item">
                            <strong>🛡️ Safety Checks</strong>
                            <p>Verifies privileges and environment before making changes.</p>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
