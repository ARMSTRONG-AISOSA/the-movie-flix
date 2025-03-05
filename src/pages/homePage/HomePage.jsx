import { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import './homePage.css';
import { getPopularMovies, searchMovies } from '../../services/api';

const HomePage = () => {

    // State: a hook
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);

    // UseEffect
    // Movie data object
    useEffect(() => {}, []);

    // Functions
    function handleSearch(e) {
        // keep the form submit from refreshing the page 
        e.preventDefault();
        alert(searchQuery);
        // set the input filled to empty
        setSearchQuery("");
    }

    return (
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
    )
}

export default HomePage