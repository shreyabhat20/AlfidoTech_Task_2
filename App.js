import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'abc'; // Replace with your TMDB API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchQuery,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleSelectMovie = (movieId) => {
    fetchMovieDetails(movieId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <main>
        {selectedMovie ? (
          <div className="movie-details">
            <button onClick={() => setSelectedMovie(null)}>Back to Results</button>
            <h2>{selectedMovie.title}</h2>
            <img
              src={
                selectedMovie.poster_path
                  ? `${IMAGE_BASE_URL}${selectedMovie.poster_path}`
                  : 'https://via.placeholder.com/200'
              }
              alt={selectedMovie.title}
            />
            <p><strong>Plot:</strong> {selectedMovie.overview}</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average}/10</p>
            <p><strong>Cast:</strong> [Fetch cast data via additional API calls]</p>
          </div>
        ) : (
          <div className="movie-results">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => handleSelectMovie(movie.id)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${movie.poster_path}`
                      : 'https://via.placeholder.com/200'
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}/10</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
