import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import NeurobicareColors from "./util/NeurobicareColors";

const ourChannels = ["A1", "A2", "F7", "F8"];

export default function EEGGraph({ data }: any) {
  const bands = Object.keys(data);

  const dataE = bands.map((bandName) => {
    let ret = {
      name: bandName,
    };
    ourChannels.forEach((channelName: string, i: number) => {
      const newObj: any = {};
      newObj[channelName as keyof any] = data[bandName][i];
      ret = { ...ret, ...newObj };
    });

    return ret;
  });

  return (
    <BarChart
      height={250}
      width={1000}
      data={dataE}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {ourChannels.map((channelName, i: number) => {
        return (
          <Bar
            key={i}
            dataKey={channelName}
            fill={(NeurobicareColors as any)[("p" + i) as keyof any]}
          />
        );
      })}
    </BarChart>
  );
}
