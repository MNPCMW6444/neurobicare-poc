import { channelNames } from "muse-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ourChannels = ["A1", "A2", "F7", "F8"];
const yoadColors = ["#492e7b", "#cab7ec", "#917aba", "#71589e"];

export default function EEGGraph({ data }: any) {
  const bands = Object.keys(data);

  const dataE = bands.map((bandName) => {
    /* let avg = 0;
    for (let i = 0; i < data[channelName].length; i++)
      avg = avg + data[channelName][i];
    avg = avg / data[channelName].length; */
    let ret = {
      name: bandName,
      /*       value: avg,
       */
    };
    ourChannels.forEach((channelName: string, i: number) => {
      const newObj: any = {};
      newObj[channelName as keyof any] = data[bandName][i];
      ret = { ...ret, ...newObj };
    });

    return ret;
  });

  return (
    <ResponsiveContainer width={1000} height={250}>
      <BarChart
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
          return <Bar dataKey={channelName} fill={yoadColors[i]} />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
