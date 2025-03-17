// It provides some global state
import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
};

// This provides state to any of the components wrappped inside of it; mimicing for example the <BrowserRouter />
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favorites")

            // convert from string to array/object
            if (storedFavs) setFavorites(JSON.parse(storedFavs))
        } catch (error) {
            console.error("Error loading favorites from localStorage:", error)
            // Optionally reset localStorage here
        }
    }, [])

    useEffect(() => {
        try {
            //Convert from object to string and save to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Error saving favorites to localStorage:", error);
        }
    }, [favorites]) // Runs whenever the 'favorites change'

    const addToFavorite = (movie) => {
        // The previous value of the state(favorite) is gotten (prev) and the sent/new value(movie) is added.

        setFavorites(prev => {
            if (prev.some(fav => fav.id === movie.id)) {
                // return if favorite already exist
                return prev;
            } else {
                return [...prev, movie];
            }
        })
    }

    const removeFromFavorites = (movieId) => {
        // A new array is generated removing the one that we want removed and containing only the ones we don't want to remove
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));


        // setFavorites(prev => ...)
        // This updates the favorites state.
        // The prev parameter represents the current list of favorite movies.
        // filter() creates a new array by keeping only the movies whose ID does not match movieId.
    }

    const isFavorite = (movieId) => {
        // This checks all the movie id in our favorties to see if it's equal to what we are looking at at which case it returns 'true' else it returns 'false' 
        return favorites.some(movie => movie.id === movieId)


        // .some() method in JavaScript is used to check if at least one element in an array meets a specific condition. It returns a boolean value (true or false).

        // array.some(callback(element, index, array))
        // callback → A function that tests each element.
        // element → The current element being checked.
        // index (optional) → The index of the current element.
        // array (optional) → The array being checked.
        // Returns true if at least one element satisfies the condition.
        // Returns false if no element satisfies the condition.
    }

    // To make all the values here accessible to the children 
    const contextValue = {
        favorites,
        addToFavorite,
        removeFromFavorites,
        isFavorite
    }


    // The children would have access to any state in this function 
    return <MovieContext.Provider
        value={contextValue}
    >
        {children}
    </MovieContext.Provider>
}

// Children: a reserverd prop for anything that's inside of the component that you rendered.
// Example is <App /> in <BrowserRouter>

{/* 
<BrowserRouter>
    <App />
</BrowserRouter>
*/}

// Local Storage allows us to store values(strings) directly within our browser