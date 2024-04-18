import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Movies from './Movies';
import BookingForm from './BookingForm';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import SeatSelection from './SeatSelection';
import './global.css';  // This is important to set up global styles
import './App.css';     // Specific styles for components in App.js



function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/movies" className="nav-link">Movies</Link></li>
                        <li className="nav-item"><Link to="/movielist" className="nav-link">Movie List</Link></li>
                        <li className="nav-item"><Link to="/booking" className="nav-link">Book Tickets</Link></li>
                        <li className="nav-item"><Link to="/add-movie" className="nav-link">Add Movie</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movielist" element={<MovieList />} />
                    <Route path="/booking" element={<BookingForm />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/seat-selection/:movieId" element={<SeatSelection />} /> {/* Dynamic route */}

                </Routes>
            </div>
        </Router>
    );
}

export default App;
