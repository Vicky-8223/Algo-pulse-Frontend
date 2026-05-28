'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Brain, Zap, Menu, X } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-gradient-to-r from-card/60 via-card/50 to-card/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            AlgoPulse
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:bg-accent/20 transition-colors">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-200">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-accent/20 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border/40 bg-card/50 p-4 space-y-3 animate-slide-in-top">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary">Sign Up</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Track Your Leetcode Progress here{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                 Algo Pulse
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Track your coding prep, identify patterns in weak areas, and get personalized recommendations powered by real-time analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 hover:gap-3 transition-all duration-200 transform hover:scale-105">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full hover:bg-accent/10 transition-all duration-200">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Get Started with AlgoPulse.</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4 animate-slide-in-right">
            {[
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Track progress with beautiful dashboards',
                delay: 0,
              },
              {
                icon: Brain,
                title: 'AI Recommendations',
                description: 'Get personalized learning paths',
                delay: 100,
              },
              {
                icon: Zap,
                title: 'LeetCode Integration',
                description: 'Connect and analyze your submissions',
                delay: 200,
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{ animationDelay: `${feature.delay}ms` }}
                className="group p-4 sm:p-5 rounded-lg border border-border/40 bg-gradient-to-br from-card/50 to-transparent hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 cursor-default animate-slide-in-bottom"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border/20 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 sm:p-12 text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to level up your coding skills?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use AlgoPulse to ace their technical interviews and master data structures.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Start Your Free Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center text-muted-foreground">
          <p className="text-sm sm:text-base">&copy; 2026 AlgoPulse. Track harder, learn smarter.</p>
        </div>
      </div>
    </div>
  );
}
