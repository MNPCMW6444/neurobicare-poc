import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { EEGReading } from "muse-js/dist/lib/muse-interfaces";
import { useState } from "react";
import { connectToMuse } from "./muse/connection";
import { Observable } from "rxjs";
import { addChannelSample } from "./store/reducers/museReducer";
import { useDispatch } from "react-redux";
import EEGVisuManager from "./comps/EEGVisuManager";
import Grid from "@mui/material/Grid";
import POC from "./comps/POC";
import Clock from "./comps/Clock";

function App() {
  const [eegO, seteegO] = useState<Observable<EEGReading>>();
  const dispatch = useDispatch();

  eegO && eegO.subscribe((eeg) => dispatch(addChannelSample(eeg)));

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      width="110vw"
      height="110vh"
      bgcolor="#eae4f5"
      padding="15%"
      margin={0}
    >
      <Grid item>
        <Button
          sx={{
            color: "#cab7ec",
            fontSize: "300%",
            backgroundColor: "#492e7b",
            borderRadius: "35px",
          }}
          variant="contained"
          onClick={async () => seteegO(await connectToMuse())}
        >
          {eegO ? "disconnect" : "connect"}
        </Button>{" "}
      </Grid>
      {eegO && (
        <>
          {" "}
          <Grid item>
            <Clock />
          </Grid>
          <Grid item>
            <POC />
          </Grid>
          <Grid item>
            <EEGVisuManager />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default App;
