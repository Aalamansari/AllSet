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
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await auth.signup(email, password);
            router.push('/onboarding/role');
        } catch (err: any) {
            console.error('Signup failed:', err);
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
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

                    {error && (
                        <div className="error-message-Banner">
                            {error}
                        </div>
                    )}

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
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
