'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface WeaknessItem {
  topic: string;
  weaknessScore: number;
}

interface Props {
  data: WeaknessItem[];
}

export default function WeaknessRadarChart({
  data,
}: Props) {

  return (
    <div
      className="
        bg-card
        border
        border-border
        rounded-xl
        p-6
      "
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Topic Weakness Analysis
        </h2>

        <p
          className="
            text-sm
            text-muted-foreground
            mt-1
          "
        >
          AI-evaluated weakness distribution
        </p>

      </div>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <RadarChart data={
            data.filter(item=>item&& typeof item.weaknessScore === 'number')
          }>

            <PolarGrid />

            <PolarAngleAxis
              dataKey="topic"
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
            />

            <Radar
              name="Weakness"
              dataKey="weaknessScore"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}