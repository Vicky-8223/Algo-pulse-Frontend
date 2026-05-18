'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user, connectLeetCode, logout } = useAuth();
  const router = useRouter();
  const [leetcodeUsername, setLeetcodeUsername] = useState(user?.leetcodeUsername || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectLeetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await connectLeetCode(leetcodeUsername);
      setSuccess('LeetCode account connected successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect LeetCode');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        {/* Account Info */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Account Information</h2>

          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="text-lg font-medium mt-2">{user?.name}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-lg font-medium mt-2">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* LeetCode Integration */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">LeetCode Integration</h2>

          {success && (
            <div className="flex gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {error && (
            <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleConnectLeetCode} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="leetcode">LeetCode Username</Label>
              <div className="flex gap-2">
                <Input
                  id="leetcode"
                  type="text"
                  placeholder="your-leetcode-username"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !leetcodeUsername.trim()}>
                  {isLoading ? 'Connecting...' : 'Update'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {user?.leetcodeUsername ? `Connected as: ${user.leetcodeUsername}` : 'Connect your LeetCode account to enable analytics'}
              </p>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-red-400">Danger Zone</h2>
          <p className="text-muted-foreground mb-6">
            Logging out will clear your session. You&apos;ll need to sign in again.
          </p>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
