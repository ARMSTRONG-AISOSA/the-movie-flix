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
        setPage(page + 1);
    };

    //Switch to prev. page
    const prevPage = () => {
        setPage(page - 1);
    };


    function handleSearch(e) {
        // keep the form submit from refreshing the page 
        e.preventDefault();
        alert(searchQuery);
        // set the input filled to empty
        setSearchQuery("");
    }

    return (
        <>
            {loading && <p>Loading movies</p>}
            {error && <p className='error'>{error}</p>}

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