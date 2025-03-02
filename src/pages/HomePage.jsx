import { useState, useEffect } from 'react';
import request from '../api/tmdb';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function requestTrendingMovies() {
      const data = await request('trending/movie/day');
      setMovies(data);
    }

    requestTrendingMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
