import Grid from "@mui/material/Grid";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { useEffect, useState } from "react";
import { FrequencyBands } from "../constants";
import storeObservabler from "../muse/storeObservabler";
import { store } from "../store/store";
import { FrequencyRangeInHz } from "../types";
import ScoreGraph from "./ScoreGraph";

export default function POC() {
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
  }, [store]);

  return (
    <Grid container wrap="nowrap" justifyContent="center" alignItems="center">
      <Grid item>
        <ScoreGraph
          score={getAttentionScoreFromObject(currentEEG)}
          name="Attention"
        />
      </Grid>
      <Grid item>
        <ScoreGraph
          score={getCalmnessScoreFromObject(currentEEG)}
          name="Calmness"
        />
      </Grid>
    </Grid>
  );
}

//const ourChannels = ["A1", "A2", "F7", "F8"];

const getAttentionScoreFromObject = (object: any) => {
  let score = 50;
  try {
    const keys = Object.keys(object);
    const values = Object.keys(object).map(
      (key: string) => (object[key][2] + object[key][3]) / 2
    );
    let yoadedObject: any = {};
    values.forEach((value, i) => {
      yoadedObject[keys[i] as any] = value;
    });
    score =
      100 -
      (yoadedObject.BETA_HIGH +
        2 * yoadedObject.BETA_MID +
        3 * yoadedObject.BETA_LOW) *
        4;
  } catch (e) {}
  return score;
};

const getCalmnessScoreFromObject = (object: any) => {
  let score = 50;
  try {
    const keys = Object.keys(object);
    const values = Object.keys(object).map(
      (key: string) => (3 * object[key][0] + 7 * object[key][1]) / 20
    );
    let yoadedObject: any = {};
    values.forEach((value, i) => {
      yoadedObject[keys[i] as any] = value;
    });
    score =
      100 -
      (3 * yoadedObject.THETA +
        2 * yoadedObject.ALPHA_LOW +
        yoadedObject.ALPHA_HIGH) *
        4;
  } catch (e) {}
  return score;
};
