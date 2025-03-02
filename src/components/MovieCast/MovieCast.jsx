import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../api/tmdb';

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
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
