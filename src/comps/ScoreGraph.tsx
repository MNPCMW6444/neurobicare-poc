import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts";

export default function ScoreGraph({
  score,
  name,
}: {
  score: number;
  name: string;
}) {
  const data = [
    {
      name: "100",
      score: 100,
      fill: "white",
    },
    {
      name,
      score: score,
      fill: "#83a6ed",
    },
  ];

  console.log(score);

  return (
    <RadialBarChart
      width={730}
      height={250}
      innerRadius="10%"
      outerRadius="80%"
      data={data}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        label={{ fill: "white", position: "insideStart" }}
        background
        dataKey="score"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
      <Tooltip />
    </RadialBarChart>
  );
}
