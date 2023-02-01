import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FrequencyBands } from "../constants";
import useClear from "../hooks/clear";
import storeObservabler from "../muse/storeObservabler";
import { store } from "../store/store";
import { FrequencyRangeInHz } from "../types";

export default function Clock() {
  const [timestamp, settimestamp] = useState<number>(0);
  const clear = useClear();

  const freqnames = Object.keys(FrequencyBands);
  const freqrange: FrequencyRangeInHz[] = Object.values(FrequencyBands);

  const frequencyBands = {} as any;

  freqnames.forEach((freqname: string, index: number) => {
    frequencyBands[freqname] = [
      freqrange[index].minFrequencyiInHz,
      freqrange[index].maxFrequencyiInHz,
    ];
  });

  useEffect(() => {
    storeObservabler(store).subscribe((eeg: any) => {
      eeg && settimestamp(eeg.timestamp);
    });
  }, []);

  if (new Date().getSeconds() - new Date(timestamp).getSeconds() > 1) clear();
  return (
    <>
      <Typography variant="h4" color="#492e7b">
        Store Time: {new Date(timestamp).toLocaleTimeString()}
      </Typography>
      <Typography variant="h4" color="#492e7b">
        Now Time: {new Date().toLocaleTimeString()}
      </Typography>
    </>
  );
}
