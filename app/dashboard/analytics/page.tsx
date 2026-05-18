'use client';

import { useEffect, useState } from 'react';

import { apiCall } from '@/lib/api-client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface AnalyticsItem {
  topic: string;
  solvedCount: number;
  strengthLevel: 'STRONG' | 'MEDIUM' | 'WEAK';
  revisionPriority: number;
}

interface RecommendationItem {
  title: string;
  titleSlug: string;
  difficulty: string;
  topic: string;
  reason: string;
  priorityScore: number;
}

interface SolvedProblem {
  problemTitle: string;
  difficulty: string;
  likes: number;
  solvedAt: string;
  topicTags: string[];
}

export default function AnalyticsPage() {

  const [analytics, setAnalytics] =
    useState<AnalyticsItem[]>([]);

  const [recommendations, setRecommendations] =
    useState<RecommendationItem[]>([]);

  const [solvedProblems, setSolvedProblems] =
    useState<SolvedProblem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const results =
          await Promise.allSettled([

            apiCall<AnalyticsItem[]>(
              '/api/analytics/me'
            ),

            apiCall<RecommendationItem[]>(
              '/api/analytics/recommendations'
            ),

            apiCall<SolvedProblem[]>(
              '/api/analytics/solved-problems'
            ),
          ]);

        if (
          results[0].status === 'fulfilled'
        ) {
          setAnalytics(results[0].value);
        }

        if (
          results[1].status === 'fulfilled'
        ) {
          setRecommendations(results[1].value);
        }

        if (
          results[2].status === 'fulfilled'
        ) {
          setSolvedProblems(results[2].value);
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const strengthCounts = {
    STRONG: 0,
    MEDIUM: 0,
    WEAK: 0,
  };

  analytics.forEach((item) => {
    strengthCounts[item.strengthLevel]++;
  });

  const strengthData = [
    {
      name: 'Strong',
      value: strengthCounts.STRONG,
      color: '#22c55e',
    },
    {
      name: 'Medium',
      value: strengthCounts.MEDIUM,
      color: '#eab308',
    },
    {
      name: 'Weak',
      value: strengthCounts.WEAK,
      color: '#ef4444',
    },
  ];

  const categoryData =
    analytics.map((item) => ({
      name: item.topic,
      problems: item.solvedCount,
    }));

  if (loading) {

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">

        <div className="text-center space-y-4">

          <div
            className="
              w-12
              h-12
              rounded-full
              border-2
              border-primary/30
              border-t-primary
              animate-spin
              mx-auto
            "
          />

          <p className="text-muted-foreground">
            Loading analytics...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1
            className="
              text-4xl
              font-bold
              mb-3
              bg-gradient-to-r
              from-blue-400
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Analytics Dashboard
          </h1>

          <p className="text-muted-foreground text-lg">
            Deep insights into your
            coding preparation journey.
          </p>

        </div>

        {/* CHARTS */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
            mb-10
          "
        >

          {/* STRENGTH DISTRIBUTION */}
          <div
            className="
              bg-card
              border
              border-border
              rounded-2xl
              p-6
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Strength Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={strengthData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {
                    strengthData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={entry.color}
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* TOPIC DISTRIBUTION */}
          <div
            className="
              bg-card
              border
              border-border
              rounded-2xl
              p-6
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Topic Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={categoryData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip
  contentStyle={{
    backgroundColor: '#111827',
    border: '1px solid #374151',
    borderRadius: '12px',
    color: '#ffffff',
  }}
  labelStyle={{
    color: '#ffffff',
    fontWeight: 600,
  }}
  itemStyle={{
    color: '#60a5fa',
  }}
  cursor={{
    fill: 'rgba(59, 130, 246, 0.1)',
  }}
/>

                <Bar
                  dataKey="problems"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* TOPIC ANALYTICS */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-2xl
            p-6
            mb-10
            overflow-x-auto
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            Topic Analytics
          </h2>

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-border">

                <th className="text-left py-4">
                  Topic
                </th>

                <th className="text-left py-4">
                  Solved
                </th>

                <th className="text-left py-4">
                  Strength
                </th>

                <th className="text-left py-4">
                  Revision Status
                </th>

              </tr>

            </thead>

            <tbody>

              {
                analytics.map((item, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-border/40
                      hover:bg-muted/30
                      transition-colors
                    "
                  >

                    <td className="py-4 font-medium">
                      {item.topic}
                    </td>

                    <td className="py-4">
                      {item.solvedCount}
                    </td>

                    <td className="py-4">

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            item.strengthLevel ===
                            'STRONG'

                              ? 'bg-green-500/20 text-green-400 border border-green-500/20'

                              : item.strengthLevel ===
                                'MEDIUM'

                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'

                              : 'bg-red-500/20 text-red-400 border border-red-500/20'
                          }
                        `}
                      >

                        {item.strengthLevel}

                      </span>

                    </td>

                    <td className="py-4">

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            item.revisionPriority >= 70

                              ? 'bg-red-500/20 text-red-400 border border-red-500/20'

                              : item.revisionPriority >= 40

                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'

                              : 'bg-green-500/20 text-green-400 border border-green-500/20'
                          }
                        `}
                      >

                        {
                          item.revisionPriority >= 70

                            ? 'Needs Immediate Revision'

                            : item.revisionPriority >= 40

                            ? 'Needs Reinforcement'

                            : 'Well Maintained'
                        }

                      </span>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

        {/* SOLVED PROBLEMS */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-2xl
            p-6
            mb-10
            overflow-x-auto
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            Solved Problems
          </h2>

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-border">

                <th className="text-left py-4">
                  Problem
                </th>

                <th className="text-left py-4">
                  Difficulty
                </th>

                <th className="text-left py-4">
                  Likes
                </th>

                <th className="text-left py-4">
                  Topics
                </th>

                <th className="text-left py-4">
                  Solved At
                </th>

              </tr>

            </thead>

            <tbody>

              {
                solvedProblems.map((problem, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-border/40
                      hover:bg-muted/30
                      transition-colors
                    "
                  >

                    <td className="py-4 font-medium">

                      <a
                        href={
                          `https://leetcode.com/problems/${problem.problemTitle}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          hover:text-primary
                          transition-colors
                        "
                      >
                        {problem.problemTitle}
                      </a>

                    </td>

                    <td className="py-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium

                          ${
                            problem.difficulty ===
                            'Easy'

                              ? 'bg-green-500/20 text-green-400'

                              : problem.difficulty ===
                                'Medium'

                              ? 'bg-yellow-500/20 text-yellow-400'

                              : 'bg-red-500/20 text-red-400'
                          }
                        `}
                      >

                        {problem.difficulty}

                      </span>

                    </td>

                    <td className="py-4">
                      {problem.likes}
                    </td>

                    <td className="py-4">

                      <div className="flex flex-wrap gap-2">

                        {
                          problem.topicTags?.map(
                            (tag, idx) => (

                              <span
                                key={idx}
                                className="
                                  px-2
                                  py-1
                                  rounded-md
                                  bg-primary/10
                                  text-primary
                                  text-xs
                                "
                              >
                                {tag}
                              </span>
                            )
                          )
                        }

                      </div>

                    </td>

                    <td className="py-4">
                      {
                        new Date(
                          problem.solvedAt
                        ).toLocaleDateString()
                      }
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

        {/* RECOMMENDATIONS */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-2xl
            p-6
            overflow-x-auto
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            Adaptive Recommendations
          </h2>

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-border">

                <th className="text-left py-4">
                  Problem
                </th>

                <th className="text-left py-4">
                  Topic
                </th>

                <th className="text-left py-4">
                  Difficulty
                </th>

                <th className="text-left py-4">
                  Priority
                </th>

              </tr>

            </thead>

            <tbody>

              {
                recommendations.map((rec, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-border/40
                      hover:bg-muted/30
                      transition-colors
                    "
                  >

                    <td className="py-4 font-medium">

                      <a
                        href={
                          `https://leetcode.com/problems/${rec.titleSlug}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-blue-400
                          hover:underline
                        "
                      >
                        {rec.title}
                      </a>

                    </td>

                    <td className="py-4">
                      {rec.topic}
                    </td>

                    <td className="py-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium

                          ${
                            rec.difficulty ===
                            'Easy'

                              ? 'bg-green-500/20 text-green-400'

                              : rec.difficulty ===
                                'Medium'

                              ? 'bg-yellow-500/20 text-yellow-400'

                              : 'bg-red-500/20 text-red-400'
                          }
                        `}
                      >

                        {rec.difficulty}

                      </span>

                    </td>

                    <td className="py-4">

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            rec.priorityScore >= 80

                              ? 'bg-red-500/20 text-red-400 border border-red-500/20'

                              : rec.priorityScore >= 50

                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'

                              : 'bg-green-500/20 text-green-400 border border-green-500/20'
                          }
                        `}
                      >

                        {
                          rec.priorityScore >= 80

                            ? 'High Priority'

                            : rec.priorityScore >= 50

                            ? 'Recommended'

                            : 'Optional'
                        }

                      </span>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}