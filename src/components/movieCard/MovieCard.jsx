import { useState } from 'react';
import './movieCard.css';

const MovieCard = ({ movie, onClick }) => {

    // State Management
    const [imageLoaded, setImageLoaded] = useState(false);


    // function
    function onFavoriteClick() {
        alert("Favorite Clicked!");
        console.log("poster Data", movie);
    }

    // Skeleton Image 
    const skeletonImgHandle = () => {
        setImageLoaded(true);
    }

    return (
        <div className='movie-card'>

            <div className='movie-poster' onClick={onClick}>
                {!imageLoaded && <div className={`skeleton-image `}>
                    <p
                        // className={`${visibility ? "visible" : "hide"}`}
                        className={`visibility-animation`}
                    >No Image Found!</p>
                </div>}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    onLoad={skeletonImgHandle}
                />

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
