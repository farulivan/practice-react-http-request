import MoviesList from './components/MoviesList';
import './App.css';
import { Fragment, useCallback, useEffect, useState } from 'react';

export interface MovieType {
  id?: number;
  title: string;
  releaseDate: string;
  openingText: string;
}

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Something when wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData: any) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, []);
  
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const dummyMovies: MovieType[] = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  let content = <p>Found no movies</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
}

export default App;
