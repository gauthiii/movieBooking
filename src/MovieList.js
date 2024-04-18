import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './MovieList.css'; // Import the CSS file for styling

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const movieCollectionRef = collection(db, 'movies');
        const querySnapshot = await getDocs(movieCollectionRef);
        const moviesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setMovies(moviesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/seat-selection/${movieId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
          <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p><strong>Release Date:</strong> {new Date(movie.releaseDate.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
            <p><strong>Language:</strong> {movie.language}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
