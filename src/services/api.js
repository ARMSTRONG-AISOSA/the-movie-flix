const API_KEY = "5de6ed9ebc4ca6d72c84cfeec47e8c20";
const BASE_URL = "https://api.themoviedb.org/3";



export const getPopularMovies = async (page) => {
    try {

        // Fetch: a function used to send a network request
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error searching for movie:', error);
    }
}

export const searchMovies = async (query, page) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to search/fetch movies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error searching for movie:', error)
    }
}