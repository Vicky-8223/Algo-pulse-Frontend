'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { apiCall } from '@/lib/api-client';

export default function ConnectLeetCodePage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await apiCall(
  '/api/auth/leetcode',
  {
    method: 'PUT',
    body: {
      leetCodeUsername: username,
    },
   }
  );
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect LeetCode');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AlgoPulse
            </h1>
            <p className="text-muted-foreground">Connect your LeetCode account to get started.</p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300">We&apos;ll analyze your submissions and problems</p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300">Get personalized recommendations</p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300">Track your progress over time</p>
            </div>
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
              <Label htmlFor="username">LeetCode Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your-leetcode-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Found in your LeetCode profile URL</p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isLoading || !username.trim()}>
                {isLoading ? 'Connecting...' : 'Connect Account'}
              </Button>
            </div>
          </form>

          {/* Skip Button */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={handleSkip}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
