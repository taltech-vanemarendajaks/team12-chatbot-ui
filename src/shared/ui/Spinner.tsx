import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress aria-label="Loading…" />
      </Box>
  );
}
