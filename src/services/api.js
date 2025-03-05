const API_KEY = "5de6ed9ebc4ca6d72c84cfeec47e8c20";
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async () => {
    try {

        // Fetch: a function used to send a network request
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );

        // Console check        
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }

        // The .json() method parses the response body and converts it from JSON format into a JavaScript object.
        const data = await response.json();

        // Console check
        console.log(data);
        console.log(data.results);

        return data.results;
    } catch (error) {
        console.error('Error searching for movie:', error);
    }
}

export const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie/popular?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        // Console check
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to search/fetch movies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Console check
        console.log(data);
        console.log(data.results);

        return data.results;
    } catch (error) {
        console.error('Error searching for movie:', error)
    }
}