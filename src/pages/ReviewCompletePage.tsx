import {
  Button,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as ReactRouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  typography: {
    marginBottom: theme.spacing(3),
  },
}));

export default function ReviewCompleteRoute() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="xl">
      <Container maxWidth="sm">
        <Typography className={classes.typography} color="primary" variant="h5" component="h1" gutterBottom>
          Поздравляем!
        </Typography>
        <Typography className={classes.typography} variant="h6" component="p" gutterBottom>
          Ваша рецензия успешно отправлена на проверку.
        </Typography>
        <Button
          color="secondary"
          component={ReactRouterLink}
          to="/"
          variant="outlined"
        >
          Вернуться к выбору фильма
        </Button>
      </Container>
    </Container>
  );
}
