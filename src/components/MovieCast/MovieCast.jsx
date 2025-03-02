import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../api/tmdb';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      const data = await request(`movie/${movieId}/credits`);
      setCast(data?.cast);
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <ul className={css.castList}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.id} className={css.castItem}>
              {actor.profile_path && (
                <div className={css.image}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
              )}
              <p>{actor.name}</p>
            </li>
          ))
        ) : (
          <p>No cast available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
