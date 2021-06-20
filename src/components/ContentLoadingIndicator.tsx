import {
  Box,
  LinearProgress,
} from '@material-ui/core';

export default function ContentLoadingIndicator() {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left={0}
        right={0}
      >
        <LinearProgress color="primary" />
      </Box>
    </Box>
  );
}
