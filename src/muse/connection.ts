import { MuseClient } from "muse-js";

const connectToMuse = async () => {
  let eeg;
  try {
    const c = new MuseClient();
    await c.connect();
    await c.start();
    eeg = c.eegReadings;
  } catch (err) {
    console.log("Connection error: " + err);
  }
  return eeg;
};

export { connectToMuse };
