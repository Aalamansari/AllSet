'use client';

import { usePathname } from 'next/navigation';

const steps = [
    { path: '/onboarding/role', label: 'Role' },
    { path: '/onboarding/stack', label: 'Tech Stack' },
    { path: '/onboarding/profile', label: 'Profile' },
];

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const currentStep = steps.findIndex(step => pathname.includes(step.path));

    return (
        <div className="onboarding-container">
            <header className="onboarding-header">
                <div className="onboarding-header-content">
                    <div className="onboarding-title">AllSet Setup</div>
                    <div className="progress-steps">
                        {steps.map((step, index) => (
                            <div
                                key={step.path}
                                className={`progress-step ${index <= currentStep ? 'active' : 'inactive'}`}
                            />
                        ))}
                    </div>
                </div>
            </header>
            <main className="onboarding-main">
                {children}
            </main>
        </div>
    );
}
