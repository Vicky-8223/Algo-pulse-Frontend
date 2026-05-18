'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, Settings, Menu } from 'lucide-react';
import { useSidebar } from '@/contexts/sidebar-context';
import { useState } from 'react';

export default function DashboardNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toggle: toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="border-b border-border/40 bg-gradient-to-r from-card/60 via-card/50 to-card/40 backdrop-blur-md sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden hover:bg-accent/20 h-10 w-10 p-0 transition-all duration-200"
            title="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
          >
            AlgoPulse
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User Welcome Text */}
          <div className="hidden sm:block text-right">
            {user && (
              <>
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
              </>
            )}
          </div>

          {/* User Avatar/Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-primary/10 border-primary/30 hover:bg-primary/20 transition-all duration-200"
              title="User menu"
            >
              <span className="text-xs font-bold text-primary">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border/40 rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-border/20 bg-card/50">
                  <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>

                <div className="p-2 space-y-1">
                  <Link href="/settings">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors duration-150"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
