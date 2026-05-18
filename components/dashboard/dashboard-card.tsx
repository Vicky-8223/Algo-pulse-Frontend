'use client';

import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  unit: string;
  highlight?: boolean;
}

export default function DashboardCard({
  icon: Icon,
  label,
  value,
  unit,
  highlight = false,
}: DashboardCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate number counting
  useEffect(() => {
    if (typeof value === 'number' && displayValue < value) {
      const timer = setTimeout(() => {
        const increment = Math.ceil(value / 20);
        setDisplayValue(Math.min(displayValue + increment, value));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayValue, value]);

  const numValue = typeof value === 'number' ? displayValue : value;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-4 sm:p-6 rounded-lg border transition-all duration-300 group overflow-hidden ${
        highlight
          ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20'
          : 'bg-gradient-to-br from-card to-card/50 border-border/40 hover:border-accent/50 hover:shadow-lg hover:shadow-card/40'
      } ${isHovered ? 'scale-105' : 'scale-100'}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 ${
            highlight
              ? 'bg-gradient-to-r from-primary/10 via-transparent to-primary/5'
              : 'bg-gradient-to-r from-accent/5 via-transparent to-accent/5'
          }`}
          style={{
            animation: 'gradient-shift 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between h-full">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-foreground">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <p
              className={`text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                highlight
                  ? 'text-primary group-hover:text-primary'
                  : 'text-foreground group-hover:text-primary'
              }`}
            >
              {numValue}
            </p>
            {unit && (
              <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* Icon */}
        <div
          className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
            highlight
              ? 'bg-primary/20 group-hover:bg-primary/40'
              : 'bg-muted/30 group-hover:bg-accent/20'
          }`}
        >
          <Icon
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
              highlight
                ? 'text-primary group-hover:scale-110'
                : 'text-muted-foreground group-hover:text-accent group-hover:scale-110'
            }`}
          />
        </div>
      </div>

      {/* Hover border glow */}
      {highlight && (
        <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      )}
    </div>
  );
}
