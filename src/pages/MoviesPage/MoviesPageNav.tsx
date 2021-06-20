import {
  List, ListItem, ListItemText, makeStyles,
} from '@material-ui/core';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';

import { IMovie, IMoviesPageParams } from '~/types';

interface IMoviesPageNavProps {
  movies: IMovie[];
}

const useStyles = makeStyles({
  list: {
    position: 'sticky',
    top: 15,
  },
});

export default function MoviesPageNav(props: IMoviesPageNavProps) {
  const { movies } = props;
  const { episodeIndex } = useParams<IMoviesPageParams>();
  const classes = useStyles();

  return (
    <List className={classes.list} component="nav">
      {movies.map((movie, index) => (
        <ListItem
          button
          component={ReactRouterLink}
          key={movie.episode_id}
          selected={episodeIndex === (index + 1).toString()}
          // Index used instead of `episode_id` because
          // swapi.dev API call "films/{episode_id}"
          // returns movie info by index and not by `episode_id`.
          to={`/movie/${index + 1}`}
        >
          <ListItemText>
            {movie.title}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
