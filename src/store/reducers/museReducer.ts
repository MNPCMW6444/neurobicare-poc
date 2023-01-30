import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { channelNames, EEGReading as MuseChannelReading } from "muse-js";
import { PipableEEG, RawEEG } from "../../types";
import { BrainMap } from "../../constants/enums";

type MuseReading = {
  index: number;
  timestamp: number;
  samples: RawEEG;
};

export type MuseState = {
  partialMuseReadings: MuseReading[];
  museReadings: PipableEEG[];
};

const initialState: MuseState = {
  partialMuseReadings: [],
  museReadings: [],
};

const museChannelsMap = new Map([
  [channelNames[0], BrainMap.A1],
  [channelNames[1], BrainMap.F7],
  [channelNames[2], BrainMap.F8],
  [channelNames[3], BrainMap.A2],
  [channelNames[4], BrainMap.AUX],
]);

export const museSlice = createSlice({
  name: "muse",
  initialState,
  reducers: {
    addChannelSample: (
      state: MuseState,
      action: PayloadAction<MuseChannelReading>
    ) => {
      const existing = state.partialMuseReadings.filter(
        (reading) => reading.index === action.payload.index
      );
      let res = existing.length > 0 ? existing[0] : ({} as MuseReading);
      res.index = action.payload.index;
      res.timestamp = action.payload.timestamp;
      if (!res.samples) res.samples = {} as RawEEG;
      let avg = 0;
      action.payload.samples.forEach((sample) => {
        avg = avg + sample;
      });
      avg = avg / action.payload.samples.length;
      res.samples[
        BrainMap[
          museChannelsMap.get(channelNames[action.payload.electrode]) as any
        ] as keyof RawEEG
      ] = avg;
      state.partialMuseReadings = state.partialMuseReadings.filter(
        (reading) => reading.index !== action.payload.index
      );
      if (
        "A1" in res.samples &&
        "A2" in res.samples &&
        "F7" in res.samples &&
        "F8" in res.samples
      ) {
        const pipableRes = {} as PipableEEG;
        pipableRes.data = Object.values(res.samples);
        pipableRes.timestamp = res.timestamp; //new Date(res.timestamp);
        pipableRes.info = {};
        pipableRes.info.channelNames = Object.keys(res.samples);
        state.museReadings.push(pipableRes);
      } else state.partialMuseReadings.push(res);
    },
  },
});

export const { addChannelSample } = museSlice.actions;

export const actions = museSlice.actions;

export default museSlice.reducer;
