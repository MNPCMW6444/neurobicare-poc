import { Typography } from "@mui/material";
import EEGGraph from "./EEGGraph";

export default function EEGVisu({ currentEEG }: any) {
  return (
    <Typography>
      EEG: {currentEEG ? <EEGGraph data={currentEEG} /> : "Not Exist..."}
    </Typography>
  );
}
