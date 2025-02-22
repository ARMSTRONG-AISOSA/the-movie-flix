import { useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import './homePage.css';

const HomePage = () => {

    // State: a hook
    const tes = useState;

    // Movie data object
    const movies = [
        { id: 1, title: "Toy Story", release_date: 2020 },
        { id: 2, title: "Primal", release_date: 2024 },
        { id: 3, title: "Deadepool 3", release_date: 2024 }
    ];

    // Functions
    function handleSearch() {
        // Form Submit
    }

    return (
        <div className='home-page'>
            <form
                onSubmit={handleSearch}
                className='search-form'
            >
                <input type="text" placeholder='Search for movies...' className='search-input' />

                <button type='submit' className='search-button'>Search</button>
            </form>

            <div className='movies-grid'>
                {movies.map((movie) => (
                    <>
                        <MovieCard movie={movie} key={movie.id} />
                        <br />
                    </>

                ))}
            </div>
        </div>
    )
}

export default HomePage