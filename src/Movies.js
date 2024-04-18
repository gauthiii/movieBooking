import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movieCollectionRef = collection(db, 'movies');
            const docSnap = await getDocs(movieCollectionRef);
            const moviesData = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMovies(moviesData);
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Movies List</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>{movie.title} - {movie.director}</li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
