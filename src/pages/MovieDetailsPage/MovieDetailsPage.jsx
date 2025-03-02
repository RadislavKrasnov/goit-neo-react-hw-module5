import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import request from '../../api/tmdb';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { key } = useLocation();

  useEffect(() => {
    async function fetchMovieDetails() {
      const data = await request(`movie/${movieId}`);
      setMovie(data);
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loader...</div>;

  return (
    <main>
      <button
        onClick={() => navigate(key !== 'default' ? -1 : '/')}
        className={css.backBtn}
      >
        Go back
      </button>
      <div className={css.wrapper}>
        {movie.poster_path && (
          <div className={css.poster}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        )}
        <div className={css.info}>
          <div className={css.title}>{movie.title}</div>
          <p>User Score: {(movie.vote_average * 10).toFixed(0)}%</p>
          <strong>Overview</strong>
          <p>{movie.overview}</p>
          <strong>Genres</strong>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <strong>Additional information</strong>
        <nav className={css.nav}>
          <ul>
            <li>
              <NavLink to="cast" className={buildLinkClass}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={buildLinkClass}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </main>
  );
};

export default MovieDetailsPage;
