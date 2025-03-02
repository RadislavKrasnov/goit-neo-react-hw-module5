import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import request from "../api/tmdb";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const { key } = useLocation()

    useEffect(() => {
        async function fetchMovieDetails() {
            const data = await request(`movie/${movieId}`);
            setMovie(data)
        }

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loader...</div>;

    return (
        <main>
            <button onClick={() => navigate(key !== 'default' ? -1 : "/")}>Go back</button>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h1>{movie.title}</h1>
            <p>Overview</p>
            <p>{movie.overview}</p>
            <p>Genres</p>
            <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            <nav>
                <NavLink to='cast'>Cast</NavLink>
                <NavLink to='reviews'>Reviews</NavLink>
            </nav>
            <Outlet />
        </main>
    );
};

export default MovieDetailsPage;
