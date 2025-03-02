import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import request from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    const searchMovies = async () => {
      const data = await request(`search/movie?query=${query}`);
      setMovies(data);
    };

    searchMovies();
  }, [query]);

  return (
    <main>
      <Formik
        initialValues={{ search: query }}
        onSubmit={values => {
          setSearchParams(values.search ? { query: values.search } : {});
        }}
      >
        <Form>
          <Field type="text" name="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
