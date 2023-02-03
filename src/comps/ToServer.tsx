import axios from "axios";
import domain from "./util/domain";

export default function ToServer({ currentEEG }: any) {
  const toSend: any = {};
  debugger;
  if (currentEEG?.info?.channelNames[0])
    toSend[currentEEG?.info?.channelNames[0]] = currentEEG?.data[0];
  if (currentEEG?.info?.channelNames[0])
    toSend[currentEEG?.info?.channelNames[1]] = currentEEG?.data[1];
  if (currentEEG?.info?.channelNames[0])
    toSend[currentEEG?.info?.channelNames[2]] = currentEEG?.data[2];
  if (currentEEG?.info?.channelNames[0])
    toSend[currentEEG?.info?.channelNames[3]] = currentEEG?.data[3];

  toSend.A2 && axios.post(domain + "data", { data: toSend });

  return <></>;
}
