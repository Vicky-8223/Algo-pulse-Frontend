'use client';


import 'react-calendar-heatmap/dist/styles.css';

import { Tooltip } from 'react-tooltip';
import dynamic from 'next/dynamic';

const CalendarHeatmap = dynamic(
  () => import('react-calendar-heatmap'),
  {
    ssr: false,

    loading: () => (
      <div className="
        h-52
        rounded-lg
        bg-card
        animate-pulse
      " />
    ),
  }
);

interface SubmissionDay {
  date: string;
  count: number;
}

interface Props {
  submissions: SubmissionDay[];
}

export default function ActivityHeatmap({
  submissions,
}: Props) {

  const totalSubmissions =
    submissions.reduce(
      (sum, item) => sum + item.count,
      0
    );

  const activeDays =
    submissions.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Submission Activity
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Daily coding consistency and practice intensity
        </p>

      </div>

      {/* STATS */}
      <div className="flex flex-wrap gap-8 mb-8">

        <div>
          <p className="text-3xl font-bold text-primary">
            {totalSubmissions}
          </p>

          <p className="text-sm text-muted-foreground">
            Total Submissions
          </p>
        </div>

        <div>
          <p className="text-3xl font-bold text-primary">
            {activeDays}
          </p>

          <p className="text-sm text-muted-foreground">
            Active Days
          </p>
        </div>

      </div>

      {/* HEATMAP */}
      <div className="overflow-x-auto">

        <CalendarHeatmap

          startDate={
            new Date(
              new Date().setFullYear(
                new Date().getFullYear() - 1
              )
            )
          }

          endDate={new Date()}

          values={submissions}

          classForValue={(value) => {

            if (!value) {
              return 'color-empty';
            }

            const submission =
              value as SubmissionDay;

            if (submission.count >= 15) {
              return 'color-github-4';
            }

            if (submission.count >= 8) {
              return 'color-github-3';
            }

            if (submission.count >= 4) {
              return 'color-github-2';
            }

            return 'color-github-1';
          }}

          tooltipDataAttrs={(value: any) =>
            ({
              'data-tooltip-id': 'heatmap-tooltip',

              'data-tooltip-content':
                value && value.date
                  ? `${value.date} — ${value.count} submissions`
                  : 'No submissions',
            } as any)
          }

          showWeekdayLabels
        />

      </div>

      {/* TOOLTIP */}
      <Tooltip
        id="heatmap-tooltip"
        className="
          !bg-black
          !text-white
          !rounded-lg
          !px-3
          !py-2
          !text-sm
          !shadow-lg
        "
      />

      {/* LEGEND */}
      <div className="flex items-center justify-end gap-2 mt-6 text-xs text-muted-foreground">

        <span>Less</span>

        <div className="w-3 h-3 rounded-sm bg-[#161b22]" />

        <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />

        <div className="w-3 h-3 rounded-sm bg-[#006d32]" />

        <div className="w-3 h-3 rounded-sm bg-[#26a641]" />

        <div className="w-3 h-3 rounded-sm bg-[#39d353]" />

        <span>More</span>

      </div>

    </div>
  );
}