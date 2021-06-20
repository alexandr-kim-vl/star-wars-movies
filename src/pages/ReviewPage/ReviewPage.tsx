import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import validationSchema from './validationSchema';
import { ContentLoadingIndicator } from '~/components';

interface ReviewFormValues {
  username?: string;
  email?: string;
  review?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  formRow: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
}));

export default function ReviewRoute() {
  const classes = useStyles();
  const history = useHistory();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ReviewFormValues>({
    resolver: yupResolver(validationSchema),
    shouldFocusError: true,
  });

  const registeredUsername = register('username');
  const registeredEmail = register('email');
  const registeredReview = register('review');

  const onSuccess = async () => {
    await new Promise(
      (resolve) => {
        setTimeout(resolve, 1000);
      },
    );
    history.push('/review-complete');
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <Container maxWidth="sm">
        <Typography className={classes.heading} color="primary" variant="h5" component="h1">
          Ваша рецензия
        </Typography>
        <form onSubmit={handleSubmit(onSuccess)} noValidate autoComplete="off">
          <div className={classes.formRow}>
            <TextField
              error={Boolean(errors.username)}
              fullWidth
              helperText={errors.username?.message || undefined}
              inputRef={registeredUsername.ref}
              label="Имя пользователя"
              name={registeredUsername.name}
              onBlur={registeredUsername.onBlur}
              onChange={registeredUsername.onChange}
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              error={Boolean(errors.email)}
              fullWidth
              helperText={errors.email?.message || undefined}
              inputRef={registeredEmail.ref}
              label="Email"
              name={registeredEmail.name}
              onBlur={registeredEmail.onBlur}
              onChange={registeredEmail.onChange}
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              error={Boolean(errors.review)}
              fullWidth
              helperText={errors.review?.message || undefined}
              inputRef={registeredReview.ref}
              multiline
              name={registeredReview.name}
              onBlur={registeredReview.onBlur}
              onChange={registeredReview.onChange}
              rows={8}
              label="Текст рецензии"
            />
          </div>
          {isSubmitting && <ContentLoadingIndicator />}
          <div className={classes.formRow}>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              Отправить
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
}
