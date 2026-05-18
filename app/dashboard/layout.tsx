'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SidebarProvider } from '@/contexts/sidebar-context';

import DashboardNav from '@/components/dashboard/dashboard-nav';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem('auth_token');

    if (!token) {

      router.push('/login');

    } else {

      setIsCheckingAuth(false);
    }

  }, [router]);

  if (isCheckingAuth) {

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">

        <DashboardNav />

        <div className="flex">

          <DashboardSidebar />

          <main className="flex-1 overflow-auto w-full">

            <div className="animate-in fade-in duration-500">
              {children}
            </div>

          </main>

        </div>

      </div>
    </SidebarProvider>
  );
}