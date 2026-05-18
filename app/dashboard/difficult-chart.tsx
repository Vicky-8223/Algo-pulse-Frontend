'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Props {
  easy: number;
  medium: number;
  hard: number;
}

export default function DifficultyChart({
  easy,
  medium,
  hard,
}: Props) {

  const data = [
    {
      name: 'Easy',
      value: easy,
      color: '#22c55e',
    },
    {
      name: 'Medium',
      value: medium,
      color: '#eab308',
    },
    {
      name: 'Hard',
      value: hard,
      color: '#ef4444',
    },
  ];

  return (
    <div className="
      bg-card
      border
      border-border
      rounded-xl
      p-6
    ">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Difficulty Breakdown
        </h2>

        <p className="
          text-sm
          text-muted-foreground
          mt-1
        ">
          Problem solving distribution
        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              animationDuration={1200}
            >

              {
                data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="
        grid
        grid-cols-3
        gap-4
        mt-6
      ">

        {
          data.map((item) => (

            <div
              key={item.name}
              className="
                rounded-lg
                border
                border-border
                p-4
              "
            >

              <p className="text-sm text-muted-foreground">
                {item.name}
              </p>

              <p className="text-2xl font-bold mt-1">
                {item.value}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}