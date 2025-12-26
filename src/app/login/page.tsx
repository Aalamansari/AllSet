'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await auth.login(email, password);
            router.push('/dashboard'); // Go to dashboard after login
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
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
                            Welcome Back
                        </h1>
                        <p className="auth-subtitle">Sign in to your AllSet account</p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?{' '}
                        <Link href="/signup" className="auth-link">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
