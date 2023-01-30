enum BrainMap {
  A1,
  A2,
  fp1,
  Fp2,
  F7,
  F3,
  FZ,
  F4,
  F8,
  T3,
  C3,
  Cz,
  C4,
  T4,
  T5,
  P3,
  Pz,
  P4,
  T6,
  Q1,
  Q2,
  AUX,
}

enum FrequencyBandsPoints {
  minTheta = 4,
  minAlphaLow = 8,
  minAlphaHigh = 10,
  minBetaLow = 12.5,
  minBetaMid = 16.5,
  minBetaHigh = 21,
  minGamma = 30,
  max = 60,
}

enum performanceConfig {
  defaultHistoryDurationInSeconds = 10,
  defaultSamplingRateInHz = 256,
}

export { BrainMap, FrequencyBandsPoints, performanceConfig };
