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

function App() {
  const [eegO, seteegO] = useState<Observable<EEGReading>>();
  const dispatch = useDispatch();

  eegO && eegO.subscribe((eeg) => dispatch(addChannelSample(eeg)));

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Grid item>
        <Button onClick={async () => seteegO(await connectToMuse())}>
          {eegO ? "disconnect" : "connect"}
        </Button>{" "}
      </Grid>

      <Grid item>
        <POC />
      </Grid>

      <Grid item>
        <EEGVisuManager />
      </Grid>
    </Grid>
  );
}

export default App;
