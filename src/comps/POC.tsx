import Grid from "@mui/material/Grid";

import ScoreGraph from "./ScoreGraph";

export default function POC({ currentEEG }: any) {
  return (
    <Grid
      container
      wrap="nowrap"
      justifyContent="center"
      alignItems="center"
      width="60%"
      marginLeft="10%"
    >
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

const getAttentionScoreFromObject = (object: any) => {
  let score = 5;
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
      (4 * yoadedObject.BETA_HIGH +
        3 * yoadedObject.BETA_MID +
        3 * yoadedObject.BETA_LOW)
      + (3 * yoadedObject.THETA + 4 * yoadedObject.ALPHA_LOW + yoadedObject.ALPHA_HIGH);
  } catch (e) { }
  return Math.floor(score < 5 ? 5 : score > 100 ? 100 : score);
};

const getCalmnessScoreFromObject = (object: any) => {
  let score = 5;
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
      (4 * yoadedObject.THETA +
        3 * yoadedObject.ALPHA_LOW +
        2 * yoadedObject.ALPHA_HIGH) + (3 * yoadedObject.BETA_HIGH + 2 * yoadedObject.BETA_MID + yoadedObject.BETA_LOW);
  } catch (e) { }
  return Math.floor(score < 5 ? 5 : score > 100 ? 100 : score);
};
