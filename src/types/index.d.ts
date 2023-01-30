interface RawEEG {
  A1?: number;
  A2?: number;
  fp1: number;
  Fp2: number;
  F7?: number;
  F3?: number;
  FZ?: number;
  F4?: number;
  F8?: number;
  T3?: number;
  C3?: number;
  Cz?: number;
  C4?: number;
  T4?: number;
  T5?: number;
  P3?: number;
  Pz?: number;
  P4?: number;
  T6?: number;
  Q1?: number;
  Q2?: number;
  Aux?: number;
}

interface AttentionScore {
  b: string;
}

interface FrequencyRangeInHz {
  minFrequencyiInHz: number;
  maxFrequencyiInHz: number;
}

interface AttentionBetaScore {
  percent: number;
}

interface FrequencyBandsDefinitionConstant {
  THETA: FrequencyRangeInHz;
  ALPHA_LOW: FrequencyRangeInHz;
  ALPHA_HIGH: FrequencyRangeInHz;
  BETA_LOW: FrequencyRangeInHz;
  BETA_MID: FrequencyRangeInHz;
  BETA_HIGH: FrequencyRangeInHz;
  GAMMA: FrequencyRangeInHz;
}

interface AplitudesPerFrequencyBands {
  THETA: number;
  ALPHA_LOW: number;
  ALPHA_HIGH: number;
  BETA_LOW: number;
  BETA_MID: number;
  BETA_HIGH: number;
  GAMMA: number;
}

type NFFT = (number) => AplitudesPerFrequencyBands;

type Last10SecOfRawEEG = RawEEG[];

interface PipableEEG {
  data: number[]; // channels
  timestamp: number;
  info?: {
    samplingRate?: Number;
    channelNames?: string[];
  };
}

export type {
  RawEEG,
  AttentionScore,
  FrequencyRangeInHz,
  AttentionBetaScore,
  FrequencyBandsDefinitionConstant,
  AplitudesPerFrequencyBands,
  NFFT,
  Last10SecOfRawEEG,
  PipableEEG,
};
