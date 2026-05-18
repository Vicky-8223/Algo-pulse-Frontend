'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { apiCall } from '@/lib/api-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setError('');

  setIsLoading(true);

  try {

    const response = await apiCall<any>(
      '/api/auth/login',
      {
        method: 'POST',
        body: {
          email,
          password,
        },
      }
    );
    console.log(response);
    localStorage.setItem(
      'auth_token',
      response.data.token
    );
    const profileResponse=await apiCall<any>(
      '/api/auth/me'
    );
    const profile=profileResponse;
    if(!profile.leetcodeUsername){
      router.push('/connect-leetcode');
    }
    else {
      router.push('/dashboard');
    }

  } catch (err) {

    setError(
      err instanceof Error
        ? err.message
        : 'Login failed'
    );

  } finally {

    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AlgoPulse
              </h1>
            </Link>
            <p className="text-muted-foreground">Welcome back. Let&apos;s continue your journey.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-accent hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
