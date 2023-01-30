import { FrequencyBandsDefinitionConstant, FrequencyRangeInHz } from "../types";
import { FrequencyBandsPoints } from "./enums";

const FrequencyBands: FrequencyBandsDefinitionConstant = {
  THETA: {
    minFrequencyiInHz: FrequencyBandsPoints.minTheta,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
  },
  ALPHA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
  },
  ALPHA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
  },
  BETA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
  },
  BETA_MID: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
  },
  BETA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minGamma,
  },
  GAMMA: {
    minFrequencyiInHz: FrequencyBandsPoints.minGamma,
    maxFrequencyiInHz: FrequencyBandsPoints.max,
  },
};

export { FrequencyBands };
