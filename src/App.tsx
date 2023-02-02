import Button from "@mui/material/Button";
import { EEGReading } from "muse-js/dist/lib/muse-interfaces";
import { useState } from "react";
import { connectToMuse } from "./muse/connection";
import { Observable } from "rxjs";
import { addChannelSample } from "./store/reducers/museReducer";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import EEGProvider from "./EEGProvider";

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
      width="100vw"
      height="100vh"
      bgcolor="#eae4f5"
      padding="5%"
      margin={0}
    >
      {!eegO ? (
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
          </Button>
        </Grid>
      ) : (
        eegO && <EEGProvider />
      )}
    </Grid>
  );
}

export default App;
