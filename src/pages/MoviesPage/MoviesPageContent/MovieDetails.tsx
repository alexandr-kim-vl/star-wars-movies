import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import movieCovers from './movieCovers';
import { AppApi } from '~/api';
import { ContentLoadingIndicator } from '~/components';
import { IMovie } from '~/types';

interface IMovieDetailsProps {
  episodeIndex: string;
}

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '52%',
  },
});

const indexToIdentityMap: Record<string, number> = {
  1: 4,
  2: 5,
  3: 6,
  4: 1,
  5: 2,
  6: 3,
};

export default function MovieDetails({ episodeIndex }: IMovieDetailsProps) {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    const fetchMovie = async () => {
      const fetchedMovie = await AppApi.get<IMovie>(
        `films/${episodeIndex}`,
        {
          cancelToken: cancelTokenSource.token,
        },
      );
      if (fetchedMovie) {
        setMovie(fetchedMovie);
      }
    };
    fetchMovie().finally(() => {
      setIsLoading(false);
    });
    return () => {
      cancelTokenSource.cancel();
    };
  }, [episodeIndex]);

  const isOutdated = indexToIdentityMap[episodeIndex] !== movie?.episode_id;

  if (isLoading || isOutdated) {
    return <ContentLoadingIndicator />;
  }

  if (!movie) {
    return null;
  }

  return (
    <>
      <Card component="article">
        <CardMedia
          className={classes.media}
          image={movieCovers[movie.episode_id]}
          title={movie.title}
        />
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1">
            {movie.opening_crawl}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            component={ReactRouterLink}
            size="small"
            to="/review"
            variant="outlined"
          >
            Оставить рецензию
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
