import EEGVisuManager from "./comps/EEGVisuManager";
import Grid from "@mui/material/Grid";
import POC from "./comps/POC";
import Clock from "./comps/Clock";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { useEffect, useState } from "react";
import { FrequencyBands } from "./constants";
import { FrequencyRangeInHz } from "./types";
import storeObservabler from "./muse/storeObservabler";
import { store } from "./store/store";
import { map } from "rxjs/operators";

const fgetter = () => {
  const freqnames = Object.keys(FrequencyBands);
  const freqrange: FrequencyRangeInHz[] = Object.values(FrequencyBands);

  const frequencyBands = {} as any;

  freqnames.forEach((freqname: string, index: number) => {
    frequencyBands[freqname] = [
      freqrange[index].minFrequencyiInHz,
      freqrange[index].maxFrequencyiInHz,
    ];
  });
  return frequencyBands;
};

export default function EEGProvider() {
  const frequencyBands = fgetter();

  const [final, setFinal] = useState();

  useEffect(() => {
    const proccesed = storeObservabler(store).pipe(
      epoch({ duration: 256, interval: 100 }) as any,
      fft({ bins: 256 }) as any,
      powerByBand(frequencyBands) as any
    );
    const all = storeObservabler(store);

    const combined = all.pipe(
      map((all) =>
        proccesed.pipe(map((proccesed) => ({ original: all, proccesed })))
      )
    );

    combined.subscribe((x: any) => setFinal(x));
  }, [frequencyBands]);

  return (
    <>
      <Grid item>
        <Clock timestamp={((final as any)?.original as any)?.timestamp || 0} />
      </Grid>
      <Grid item>
        <POC currentEEG={(final as any)?.proccesed} />
      </Grid>
      <Grid item>
        <EEGVisuManager currentEEG={(final as any)?.original} />
      </Grid>
    </>
  );
}
