import { Box, Typography } from "@mui/material";
import useClear from "../hooks/clear";
import NeurobicareColors from "./util/NeurobicareColors";

export default function Clock({ timestamp }: { timestamp: number }) {
  const clear = useClear();
  if (new Date().getSeconds() - new Date(timestamp).getSeconds() > 1) clear();

  return (
    <Box paddingTop="10%" paddingBottom="10%">
      <Typography variant="h6" color={NeurobicareColors.p0}>
        Store Time: {new Date(timestamp).toLocaleTimeString()}
      </Typography>
      <Typography variant="h6" color={NeurobicareColors.p0}>
        Now Time: {new Date().toLocaleTimeString()}
      </Typography>
    </Box>
  );
}
