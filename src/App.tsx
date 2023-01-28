import MoviesList from './components/MoviesList';
import './App.css';
import { Fragment } from 'react';

export interface MovieType {
  id?: number;
  title: string;
  releaseDate: string;
  openingText: string;
}

function App() {
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

  return (
    <Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </Fragment>
  );
}

export default App;