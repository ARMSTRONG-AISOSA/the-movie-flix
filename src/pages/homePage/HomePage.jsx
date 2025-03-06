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

    // UseEffect
    // Movie data object
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                setLoading(true);//Show loading while fetching data
                const popularMovies = await getPopularMovies(page);
                //Console

                console.log(`Movies for page ${page}:`, popularMovies);

                setMovies(popularMovies);
                setError(null); //Clear previous errors
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false); // Clears this when we are no longer fetching data
            }
        }

        loadPopularMovies();
    }, [page]); //Re-run effect when "page" changes

    // Functions
    //Switch to next page
    const nextPage = () => {
        // updater function
        // it receives the previous state value(prevPage).
        // It returns the new state value (prevPage + 1).
        // done to prevent stale state
        setPage((prevPage) => prevPage + 1);
    };

    //Switch to prev. page
    const prevPage = () => {
        setPage((prevPage) => Math.max((prevPage - 1), 1));
    };


    function handleSearch(e) {
        // keep the form submit from refreshing the page 
        e.preventDefault();
        if (!searchQuery.trim()) {
            return
        }

        // alert(searchQuery);
        // set the input filled to empty
        setSearchQuery("");
    }

    return (
        <>
            {/* Movies Grid */}
            <div className='home-page'>
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

                {loading ? (
                    <div>Loading movies</div>
                ) : (
                    <div className='movies-grid'>
                        {movies.map((movie) => (
                            <>
                                {/* Conditional render */}
                                {movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                                    <>
                                        <MovieCard movie={movie} key={movie.id} />
                                    </>
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

                <span> Page {page} </span>

                <button
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>
        </>

    )
}

export default HomePage