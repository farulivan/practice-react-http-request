import type { MovieType } from '../App';
import Movie from './Movie';
import classes from './MoviesList.module.css';

interface MovieListProps {
  movies: MovieType[]
}

const MovieList = (props: MovieListProps) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
