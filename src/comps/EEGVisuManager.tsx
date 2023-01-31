import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { store } from "../store/store";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { FrequencyRangeInHz } from "../types";
import { FrequencyBands } from "../constants";
import EEGGraph from "./EEGGraph";
import storeObservabler from "../muse/storeObservabler";

export default function EEGVisu() {
  const [currentEEG, setcurrentEEG] = useState<any>();

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
    storeObservabler(store)
      .pipe(
        epoch({ duration: 256, interval: 100 }) as any,
        fft({ bins: 256 }) as any,
        powerByBand(frequencyBands) as any
      )
      .subscribe((eeg: any) => {
        eeg && setcurrentEEG(eeg);
      });
  }, [frequencyBands]);

  return (
    <Typography>
      EEG: {currentEEG ? <EEGGraph data={currentEEG} /> : "Not Exist..."}
    </Typography>
  );
}
