import { Box, Typography } from '@material-ui/core';

export default function Greetings() {
  return (
    <Box component="article">
      <Typography
        color="primary"
        component="h1"
        gutterBottom
        variant="h5"
      >
        Добро пожаловать!
      </Typography>
      <Typography color="primary" component="p" variant="h6">
        Начните с выбора интересующего Вас фильма.
      </Typography>
    </Box>
  );
}
