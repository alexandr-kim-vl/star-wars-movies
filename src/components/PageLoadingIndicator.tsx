import {
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function PageLoadingIndicator() {
  const classes = useStyles();

  return (
    <Backdrop classes={classes} open>
      <CircularProgress color="primary" size={100} />
    </Backdrop>
  );
}
