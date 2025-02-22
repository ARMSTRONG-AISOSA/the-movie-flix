import { useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import './homePage.css';

const HomePage = () => {

    // State: a hook
    const [searchQuery, setSearchQuery] = useState("");

    // Movie data object
    const movies = [
        { id: 1, title: "Toy Story", release_date: 2020 },
        { id: 2, title: "Primal", release_date: 2024 },
        { id: 3, title: "Deadepool 3", release_date: 2024 }
    ];

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
                                <br />
                            </>
                        )}
                    </>

                ))}
            </div>
        </div>
    )
}

export default HomePage