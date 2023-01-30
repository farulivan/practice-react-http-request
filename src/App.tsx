import MoviesList from './components/MoviesList';
import './App.css';
import { Fragment, useCallback, useEffect, useState } from 'react';
import AddMovie, { NewMovieType } from './components/AddMovie';

export interface MovieType {
  id?: string;
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
      const response = await fetch(
        'https://react-http-ccbf7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Something when wrong!');
      }

      const data = await response.json();

      const loadedMovies: MovieType[] = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie: NewMovieType) => {
    const response = await fetch(
      'https://react-http-ccbf7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data)
    console.log('Success! Adding movie to database')

    fetchMoviesHandler();
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
}

export default App;
