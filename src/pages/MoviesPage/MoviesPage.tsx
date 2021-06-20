import { Container, Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

import MoviesPageContent from './MoviesPageContent';
import MoviesPageNav from './MoviesPageNav';
import { AppApi } from '~/api';
import { PageLoadingIndicator } from '~/components';
import { IMovie } from '~/types';

interface IGetMoviesResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: IMovie[];
}

const useStyles = makeStyles({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default function MoviesPage() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await AppApi.get<IGetMoviesResponse>('films');
      if (response) {
        setMovies(response.results);
      }
    };
    fetchMovies().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Container className={classes.container} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <MoviesPageNav movies={movies} />
          </Grid>
          <Grid component="section" item xs={12} sm={8} md={9}>
            {Boolean(movies.length) && <MoviesPageContent />}
          </Grid>
        </Grid>
      </Container>
      {isLoading && <PageLoadingIndicator />}
    </>
  );
}
