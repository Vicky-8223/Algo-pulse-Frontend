'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings, Layout, ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/contexts/sidebar-context';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Layout,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-border/40 bg-gradient-to-b from-card/50 to-background sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border/20">
        {!isCollapsed && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navigation</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto hover:bg-accent/10 h-8 w-8 p-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/8 border border-transparent'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                {/* Animated background on hover */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                {/* Icon */}
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
                    isActive ? 'scale-110 text-primary' : 'group-hover:scale-110'
                  }`}
                />

                {/* Label */}
                {!isCollapsed && (
                  <span className="font-medium text-sm transition-all duration-200 group-hover:translate-x-0.5">
                    {item.label}
                  </span>
                )}

                {/* Active indicator */}
                {isActive && !isCollapsed && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/20 bg-card/20">
          <p className="text-xs text-muted-foreground">AlgoPulse v1.0</p>
        </div>
      )}
    </aside>
  );
}
