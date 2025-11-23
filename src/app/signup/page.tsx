'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            auth.login(email); // Just log them in for now
            router.push('/onboarding/role');
        }, 1000);
    };

    return (
        <div className="auth-container">
            <div className="auth-card-wrapper">
                <div className="card glass auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">
                            Create Account
                        </h1>
                        <p className="auth-subtitle">Get started with AllSet today</p>
                    </div>

                    <form onSubmit={handleSignup} className="auth-form">
                        <Input
                            id="email"
                            type="email"
                            label="Email address"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?{' '}
                        <Link href="/login" className="auth-link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
