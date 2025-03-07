import { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import './homePage.css';
import { getPopularMovies, searchMovies } from '../../services/api';

const HomePage = () => {

    // State: a hook
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [selectedMovie, setSelectedMovie] = useState(null);

    // UseEffect
    // Movie data object
    useEffect(() => {
        const loadMovies = async () => {

            setLoading(true);//Show loading while fetching data

            let fetchedMovies = [];
            let fetchedTotalPages = 1;
            let response = [];

            try {

                if (searchQuery) {
                    response = await searchMovies(searchQuery, page);

                } else {
                    response = await getPopularMovies(page);
                }

                fetchedMovies = response.results; // Extract movie results
                fetchedTotalPages = response.total_pages; // Extracts total pages from API

                //Console
                console.log(response);
                console.log(fetchedTotalPages);
                console.log(`Movies for page ${page}:`, fetchedMovies);

                // Data
                setMovies(fetchedMovies); //Update Movie object data
                setTotalPages(fetchedTotalPages); //Update total pages
                setError(null); //Clear previous errors
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false); // Clears this when we are no longer fetching data
            }
        }

        loadMovies();
    }, [page, searchQuery]); //Re-run effect when "page" or "searchQuery" changes

    // Functions
    //Switch pages
    const nextPage = () => {
        // updater function
        // it receives the previous state value(prevPage).
        // It returns the new state value (prevPage + 1).
        // done to prevent stale state
        setPage((prevPage) => prevPage + 1);
        window.scrollTo(0, 0); //scroll to top (after each function call)
    };

    const prevPage = () => {
        setPage((prevPage) => Math.max((prevPage - 1), 1));
    };


    // Function to handle searches
    function handleSearch(e) {
        // keep the form submit from refreshing the page 
        e.preventDefault();

        if (!searchQuery.trim()) {
            return
        };

        setPage(1); //Reset to first page on new search
    };

    // Function to open modal with details of clicked movie
    const openMovieDetails = (movie) => {
        setSelectedMovie(movie);
    };

    // Function to close modal
    const closeMovieDetails = () => {
        setSelectedMovie(null);;
    };

    return (
        <div>
            {/* --- */}
            <div className='home-page'>
                {/* Search form */}
                <form
                    onSubmit={handleSearch}
                    className='search-form'
                >
                    <input
                        type="text"
                        placeholder='Search for movies...' className='search-input'
                        value={searchQuery}
                        onChange={(e) => (setSearchQuery(e.target.value))}
                    />

                    <button type='submit' className='search-button'>Search</button>
                </form>

                {/* Error message */}
                {error && <p className='error'>{error}</p>}

                {/* Movies grid */}
                {loading ? (
                    <div>Loading movies</div>
                ) : (
                    <div className='movies-grid'>
                        {movies.map((movie) => (
                            <>
                                {/* Conditional render */}
                                {movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                            onClick={() => openMovieDetails(movie)}
                                        />

                                )}
                            </>

                        ))}
                    </div>
                )}

            </div>

            {/* Pagination Buttons */}
            <div className='pagination'>
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                > Previous</button>

                <span> Page {page} of {totalPages} Total Pages </span>

                <button
                    onClick={nextPage}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>

            {/* Movie Modal */}
            {selectedMovie && (
                <div 
                className='movie-modal'
                onClick={closeMovieDetails}
                >
                    <div className='modal-content'>
                        <span
                            className='close-btn'
                            onClick={closeMovieDetails}
                        >&times;</span>

                        <h2>{selectedMovie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.tite} />
                        <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                    </div>
                </div>
            )}
        </div>

    )
}

export default HomePage