import './movieCard.css';

const MovieCard = ({ movie, onClick }) => {

    // function
    function onFavoriteClick() {
        alert("Favorite Clicked!");
        console.log("poster Data", movie);
    }

    return (
        <div className='movie-card' onClick={onClick}>
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className='movie-overlay'>

                    <button
                        className='favorite-btn'
                        onClick={(e) => {
                            // Prevents clicking the heart from triggering the card click
                            e.stopPropagation();
                            onFavoriteClick();
                        }}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className='movie-info'>
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard;
