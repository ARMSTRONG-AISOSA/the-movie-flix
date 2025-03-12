import { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import MovieCardModal from '../../components/movieCardModal/MovieCardModal';
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
    const [inputPage, setInputPage] = useState(""); // state for the input page number
    const [searchHistory, setSearchHistory] = useState(() => {

        // The try/catch block is used to handle any parsing errors and defaults to an empty array if something goes wrong.
        try {
            return (
                JSON.parse(localStorage.getItem("searchHistory")) || []
                //JSON.parse convert retrived JSON string('[]') into an Array([]) object
            );
        } catch (error) {
            console.log("searchHistory", error);
            return [];
        }
    });


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
                // console.log(response);
                // console.log(fetchedTotalPages);
                // console.log(`Movies for page ${page}:`, fetchedMovies);

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
    // Switch pages
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
        window.scrollTo(0, 0); //scroll to top (after each function call)
    };


    // Function to handle searches
    function handleSearch(e) {
        // keep the form submit from refreshing the page 
        e.preventDefault();

        // searchQuery is the new search term entered by the user
        if (!searchQuery.trim()) {
            return
        };

        setPage(1); //Reset to first page on new search

        //Save new search history
        // [searchQuery, ...searchHistory] creates a new array and the searchQuery is added to the front of the array.
        const updatedHistory = [searchQuery, ...searchHistory].slice(0, 5); //Keep last 5 searches
        setSearchHistory(updatedHistory); //Updates the Ui
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory)); //Converts a JavaScript value(Array/Object) to a JavaScript Object Notation (JSON) string.
    };

    // Function to open modal with details of clicked movie
    const openMovieDetails = (movie) => {
        setSelectedMovie(movie);
    };

    // Close Modal
    const closeMovieDetails = () => {
        setSelectedMovie(null);
    };

    // Function to delete a specific search term
    const deleteSearch = (queryToDelete) => {
        //This line creates a new array (updatedHistory) by filtering out the search term that needs to be deleted.

        // If query !== queryToDelete → Keep the item in the new array. ✅
        // If query === queryToDelete → Remove it from the new array. ❌

        const updatedHistory = searchHistory.filter(query => query !== queryToDelete);
        setSearchHistory(updatedHistory); //Update Ui
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory)); //Update local storage
    };

    // Function to handle page number input
    const handlePageInput = (e) => {
        const value = e.target.value;

        // Allow only numbers and empty values
        if (value === "" || /^[0-9]+$/.test(value)) {
            setInputPage(value);
        }
    };

    // Function to  navigate to the entered page
    const goToPage = () => {
        const pageNumber = parseInt(inputPage, 10);

        // Ensure the input is valid and within range
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
            setInputPage("") // Clear input after navigation
            window.scrollTo(0, 0); //Scroll to top
        } else {
            alert(`Please enter a number between 1 and ${totalPages}`);
        }
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
                        onChange={(e) => (setSearchQuery(e.target.value))}
                        value={searchQuery}
                    />

                    <button
                        type='submit' className='search-button'
                    >Search</button>

                    {/* Search History Dropdown */}
                    {/* True if search history (from localStorage) is not empty*/}
                    {searchHistory.length > 0 && (
                        <div className='search-history'>
                            {searchHistory.map((pastQuery, index) => (
                                <div
                                    key={index}
                                    className='search-item'
                                >
                                    <span
                                        onClick={() => setSearchQuery(pastQuery)}
                                    >{pastQuery}</span>
                                    <button
                                        onClick={
                                            () => deleteSearch(pastQuery)
                                        }
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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

                {/* Input field for direct page navigation */}

                <input
                    type='text'
                    value={inputPage}
                    onChange={handlePageInput}
                    placeholder='Go To page...'
                    className='page-input'
                />

                <button
                    onClick={goToPage}
                >Go</button>

                <button
                    onClick={nextPage}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>

            {/* Render Movie Modal */}
            <MovieCardModal
                movie={selectedMovie}
                onClose={closeMovieDetails}
            />

        </div>

    )
}

export default HomePage