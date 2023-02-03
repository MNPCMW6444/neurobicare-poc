import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts";
import NeurobicareColors from "./util/NeurobicareColors";

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
      fill: NeurobicareColors.p4,
    },
    {
      name,
      score: score,
      fill: NeurobicareColors.p0,
    },
  ];

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
        label={{ fill: NeurobicareColors.p4, position: "insideStart" }}
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
