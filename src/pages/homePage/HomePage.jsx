import { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import './homePage.css';
import { getPopularMovies, searchMovies } from '../../services/api';

const HomePage = () => {
    // State hooks
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);

            let response = [];

            try {
                response = searchQuery 
                    ? await searchMovies(searchQuery, page) 
                    : await getPopularMovies(page);

                setMovies(response.results);
                setTotalPages(response.total_pages);
                setError(null);
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [page, searchQuery]);

    // Functions
    const nextPage = () => {
        setPage((prevPage) => {
            const newPage = prevPage + 1;
            window.scrollTo(0, 0);
            return newPage;
        });
    };

    const prevPage = () => {
        setPage((prevPage) => {
            const newPage = Math.max(prevPage - 1, 1);
            window.scrollTo(0, 0);
            return newPage;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setPage(1);
    };

    // Function to open modal with movie details
    const openMovieDetails = (movie) => {
        setSelectedMovie(movie);
    };

    // Function to close modal
    const closeMovieDetails = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <div className='home-page'>
                {/* Search Form */}
                <form onSubmit={handleSearch} className='search-form'>
                    <input 
                        type="text" 
                        placeholder='Search for movies...' 
                        className='search-input' 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button type='submit' className='search-button'>Search</button>
                </form>

                {/* Error Message */}
                {error && <p className='error'>{error}</p>}

                {/* Movies Grid */}
                {loading ? (
                    <div>Loading movies...</div>
                ) : (
                    <div className='movies-grid'>
                        {movies.map((movie) => (
                            <div key={movie.id} onClick={() => openMovieDetails(movie)}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className='pagination'>
                <button onClick={prevPage} disabled={page === 1}>Previous</button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={nextPage} disabled={page >= totalPages}>Next</button>
            </div>

            {/* Movie Details Modal */}
            {selectedMovie && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeMovieDetails}>&times;</span>
                        <h2>{selectedMovie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                        <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;