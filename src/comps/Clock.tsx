import { Box, Typography } from "@mui/material";
import useClear from "../hooks/clear";

export default function Clock({ timestamp }: { timestamp: number }) {
  const clear = useClear();

  if (new Date().getSeconds() - new Date(timestamp).getSeconds() > 1) clear();
  return (
    <Box paddingTop="10%" paddingBottom="10%">
      <Typography variant="h4" color="#492e7b">
        Store Time: {new Date(timestamp).toLocaleTimeString()}
      </Typography>
      <Typography variant="h4" color="#492e7b">
        Now Time: {new Date().toLocaleTimeString()}
      </Typography>
    </Box>
  );
}
