'use client';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
  BarChart3,
  Flame,
  TrendingUp,
  Zap,
} from 'lucide-react';

import dynamic from 'next/dynamic';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import DashboardCard from '@/components/dashboard/dashboard-card';

import { apiCall } from '@/lib/api-client';

const ActivityHeatmap = dynamic(
  () => import('./activity-heatmap'),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          h-[420px]
          rounded-xl
          border
          border-border
          bg-card
          animate-pulse
        "
      />
    ),
  }
);

const DifficultyChart = dynamic(
  () => import('./difficult-chart'),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          h-[420px]
          rounded-xl
          border
          border-border
          bg-card
          animate-pulse
        "
      />
    ),
  }
);

const WeaknessRadarChart = dynamic(
  () => import('./weakness-radar-chart'),
  {
    ssr: false,

    loading: () => (
      <div
        className="
          h-[420px]
          rounded-xl
          border
          border-border
          bg-card
          animate-pulse
        "
      />
    ),
  }
);

interface RecommendationItem {
  title: string;
  titleSlug: string;
  difficulty: string;
  topic: string;
  reason: string;
  priorityScore: number;
}

interface SummaryResponse {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  strongTopics: number;
  weakTopics: number;
}

interface SubmissionDay {
  date: string;
  count: number;
}

interface CalendarData {
  submissions: SubmissionDay[];
}

interface DifficultyData {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface WeaknessItem {
  topic: string;
  weaknessScore: number;
}

export default function DashboardPage() {

  const [recommendations, setRecommendations] =
    useState<RecommendationItem[]>([]);

  const [summary, setSummary] =
    useState<SummaryResponse | null>(null);

  const [calendarData, setCalendarData] =
    useState<CalendarData | null>(null);

  const [difficultyData, setDifficultyData] =
    useState<DifficultyData | null>(null);

  const [weaknessData, setWeaknessData] =
    useState<WeaknessItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const [
  calendarResponse,
  recommendationResponse,
  summaryResponse,
  difficultyResponse,
  weaknessResponse,
] = await Promise.all([

  apiCall<CalendarData>(
    '/api/analytics/calendar'
  ),

  apiCall<RecommendationItem[]>(
    '/api/analytics/recommendations'
  ),

  apiCall<SummaryResponse>(
    '/api/analytics/summary'
  ),

  apiCall<DifficultyData>(
    '/api/analytics/difficulty'
  ),

  apiCall<WeaknessItem[]>(
    '/api/analytics/weakness'
  ),
]);

        setCalendarData(calendarResponse);

        setRecommendations(recommendationResponse);

        setSummary(summaryResponse);

        setDifficultyData(difficultyResponse);

        setWeaknessData(weaknessResponse);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboardData();

  }, []);

  const dashboardStats = {

    totalSolved:
      summary?.totalSolved ?? 0,

    easySolved:
      summary?.easySolved ?? 0,

    mediumSolved:
      summary?.mediumSolved ?? 0,

    hardSolved:
      summary?.hardSolved ?? 0,

    acceptanceRate:
      summary?.acceptanceRate ?? 0,

    strongTopics:
      summary?.strongTopics ?? 0,

    weakTopics:
      summary?.weakTopics ?? 0,
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-background p-8">

        <div className="space-y-6">

          <div
            className="
              h-16
              rounded-xl
              bg-card
              border
              border-border
              animate-pulse
            "
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-4
            "
          >

            {
              Array.from({ length: 4 }).map((_, i) => (

                <div
                  key={i}
                  className="
                    h-36
                    rounded-xl
                    bg-card
                    border
                    border-border
                    animate-pulse
                  "
                />
              ))
            }

          </div>

          <div
            className="
              h-[450px]
              rounded-xl
              bg-card
              border
              border-border
              animate-pulse
            "
          />

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 animate-slide-in-top">

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-bold
              mb-3
              bg-gradient-to-r
              from-blue-400
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Welcome back
          </h1>

          <p className="text-muted-foreground text-lg">
            Your adaptive coding intelligence dashboard.
          </p>

        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-10
          "
        >

          {
            [
              {
                icon: BarChart3,
                label: 'Total Problems',
                value: dashboardStats.totalSolved,
                unit: '',
              },

              {
                icon: TrendingUp,
                label: 'Strong Topics',
                value: dashboardStats.strongTopics,
                unit: 'topics',
                highlight: true,
              },

              {
                icon: Zap,
                label: 'Acceptance Rate',
                value: dashboardStats.acceptanceRate,
                unit: '%',
                highlight: true,
              },

              {
                icon: Flame,
                label: 'Weak Topics',
                value: dashboardStats.weakTopics,
                unit: 'topics',
              },
            ].map((stat, index) => (

              <div
                key={index}
                className="animate-slide-in-bottom"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >

                <DashboardCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  unit={stat.unit}
                  highlight={stat.highlight}
                />

              </div>
            ))
          }

        </div>

        {/* ANALYTICS GRID */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
            mb-10
          "
        >

          <div className="xl:col-span-2">

            {
              calendarData && (

                <ActivityHeatmap
                  submissions={
                    calendarData.submissions || []
                  }
                />
              )
            }

          </div>

          <div>

            {
              difficultyData && (

                <DifficultyChart
                  easy={difficultyData.easySolved}
                  medium={difficultyData.mediumSolved}
                  hard={difficultyData.hardSolved}
                />
              )
            }

          </div>

        </div>

        {/* WEAKNESS RADAR */}
        <div className="mb-10">

          <WeaknessRadarChart
            data={weaknessData}
          />

        </div>

        {/* RECOMMENDATIONS */}
        <div className="animate-fade-in">

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              items-start
              lg:items-center
              gap-4
              mb-8
            "
          >

            <div>

              <h2 className="text-3xl font-bold">
                Recommended Problems
              </h2>

              <p
                className="
                  text-muted-foreground
                  mt-1
                "
              >
                Personalized recommendations based on
                your weaknesses and activity.
              </p>

            </div>

            <Link href="/dashboard/analytics">

              <Button
                className="
                  gap-2
                  hover:gap-3
                  transition-all
                "
              >
                View Full Analytics

                <ArrowRight className="w-4 h-4" />

              </Button>

            </Link>

          </div>

          {
            recommendations.length === 0 && (

              <div
                className="
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-8
                  text-center
                "
              >

                <h3 className="text-xl font-semibold mb-2">
                  No recommendations yet
                </h3>

                <p className="text-muted-foreground">
                  Solve more problems to unlock
                  adaptive recommendations.
                </p>

              </div>
            )
          }

          <div className="grid gap-5">

            {
              recommendations.map((rec, index) => (

                <div
                  key={index}
                  className="
                    group
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-6
                    transition-all
                    duration-300
                    hover:border-primary/40
                    hover:shadow-xl
                    hover:shadow-primary/5
                    animate-slide-in-left
                  "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >

                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-4
                    "
                  >

                    <div className="flex-1">

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          mb-4
                        "
                      >

                        <span
                          className="
                            text-xs
                            px-3
                            py-1
                            rounded-full
                            bg-blue-500/20
                            text-blue-300
                            border
                            border-blue-500/20
                          "
                        >
                          {rec.difficulty}
                        </span>

                        <span
                          className="
                            text-xs
                            px-3
                            py-1
                            rounded-full
                            bg-purple-500/20
                            text-purple-300
                            border
                            border-purple-500/20
                          "
                        >
                          {rec.topic}
                        </span>

                      </div>

                      <h3
                        className="
                          text-2xl
                          font-semibold
                          mb-2
                          group-hover:text-primary
                          transition-colors
                        "
                      >
                        {rec.title}
                      </h3>

                      <p
                        className="
                          text-muted-foreground
                          text-sm
                        "
                      >
                        {rec.reason}
                      </p>

                    </div>

                    <div>

                      <a
                        href={
                          `https://leetcode.com/problems/${rec.titleSlug}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          rounded-lg
                          bg-primary
                          px-5
                          py-3
                          text-sm
                          font-medium
                          text-primary-foreground
                          transition-all
                          hover:scale-105
                        "
                      >
                        Solve Problem
                      </a>

                    </div>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}