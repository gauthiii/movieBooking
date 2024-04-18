import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import './SeatSelection.css';

const createInitialSeats = (rows, cols) => {
    let seats = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            seats.push({
                id: `row-${i}-col-${j}`,
                row: i + 1,
                col: j + 1,
                isAvailable: Math.random() > 0.2,
                isSelected: false
            });
        }
    }
    return seats;
};

const SeatSelection = () => {
    const [seats, setSeats] = useState(createInitialSeats(10, 15));
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            const movieRef = doc(db, 'movies', movieId);
            const docSnap = await getDoc(movieRef);
            if (docSnap.exists()) {
                setMovie(docSnap.data());
            } else {
                console.log("No such movie!");
            }
        };
        fetchMovie();
    }, [movieId]);

    const toggleSeatSelection = (id) => {
        setSeats(seats.map(seat => {
            if (seat.id === id && seat.isAvailable) {
                return { ...seat, isSelected: !seat.isSelected };
            }
            return seat;
        }));
    };

    return (
        <div className="seat-selection-container">
            {movie && (
                <div className="movie-details">
                    {/* <img src={movie.posterUrl} alt={movie.title} className="movie-poster"/> */}
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p>{movie.synopsis}</p>
                    </div>
                </div>
            )}
            <div className="screen">Screen</div>
            <div className="seats-grid">
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        className={`seat ${seat.isAvailable ? (seat.isSelected ? 'selected' : 'available') : 'unavailable'}`}
                        onClick={() => toggleSeatSelection(seat.id)}
                        title={`Row ${seat.row}, Seat ${seat.col}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeatSelection;
