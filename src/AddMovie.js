import React, { useState } from 'react';
import { db, storage } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddMovie = () => {
    const [movieData, setMovieData] = useState({
        title: '', 
        releaseDate: '', 
        rating: '', 
        runtime: '', 
        genre: '', 
        language: ''
    });
    const [poster, setPoster] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (event) => {
        setMovieData({...movieData, [event.target.name]: event.target.value});
    };

    const handleFileChange = (event) => {
        setPoster(event.target.files[0]);
    };

    const addMovie = async () => {
        if (!poster) return;
        setUploading(true);

        const posterRef = ref(storage, `posters/${Date.now()}_${poster.name}`);
        try {
            const snapshot = await uploadBytes(posterRef, poster);
            const posterUrl = await getDownloadURL(snapshot.ref);
            await addDoc(collection(db, "movies"), {
                ...movieData,
                posterUrl,
                releaseDate: new Date(movieData.releaseDate)  // Format date if needed
            });

            alert("Movie added successfully!");
            setMovieData({title: '', releaseDate: '', rating: '', runtime: '', genre: '', language: ''});
            setPoster(null);
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Error adding movie.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', width: '100%', backgroundColor: '#222', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
            <h1 style={{ color: '#BB86FC' }}>Add New Movie</h1>
            <form>
                <div style={{ marginBottom: '10px' }}>
                    <input name="title" type="text" placeholder="Title" value={movieData.title} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input name="releaseDate" type="date" value={movieData.releaseDate} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input name="rating" type="text" placeholder="Rating" value={movieData.rating} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input name="runtime" type="text" placeholder="Runtime" value={movieData.runtime} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input name="genre" type="text" placeholder="Genre" value={movieData.genre} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input name="language" type="text" placeholder="Language" value={movieData.language} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="button" onClick={addMovie} disabled={uploading} style={{ padding: '10px 20px', backgroundColor: '#03DAC6', color: 'white', borderRadius: '4px' }}>
                    {uploading ? 'Uploading...' : 'Add Movie'}
                </button>
            </form>
        </div>
    );
};

export default AddMovie;
