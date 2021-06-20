import { useParams } from 'react-router-dom';

import Greetings from './Greetings';
import MovieDetails from './MovieDetails';
import { IMoviesPageParams } from '~/types';

export default function MoviesPageContent() {
  const { episodeIndex } = useParams<IMoviesPageParams>();

  if (!episodeIndex) {
    return <Greetings />;
  }

  return (
    <MovieDetails episodeIndex={episodeIndex} />
  );
}
