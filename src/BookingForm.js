import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const BookingForm = ({ movies }) => {
    const [selectedMovie, setSelectedMovie] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [tickets, setTickets] = useState(1);

    // Effect to update selectedMovie when movies changes
    useEffect(() => {
        if (movies && movies.length > 0) {
            setSelectedMovie(movies[0].id); // Set default selected movie safely
        }
    }, [movies]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedMovie) return; // Guard against no selected movie

        try {
            await addDoc(collection(db, 'bookings'), {
                movieId: selectedMovie,
                customerName,
                tickets: Number(tickets),
                bookingTime: new Date(),
            });
            alert('Booking successful!');
            setCustomerName('');
            setTickets(1);
        } catch (error) {
            console.error('Error adding booking:', error);
            alert('Booking failed!');
        }
    };

    if (!movies || movies.length === 0) {
        return <div>Loading movies...</div>; // Handle case where movies are not loaded
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Tickets</h2>
            <label>
                Movie:
                <select value={selectedMovie} onChange={e => setSelectedMovie(e.target.value)}>
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>{movie.title}</option>
                    ))}
                </select>
            </label>
            <label>
                Name:
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
            </label>
            <label>
                Tickets:
                <input type="number" value={tickets} onChange={e => setTickets(e.target.value)} required />
            </label>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;
