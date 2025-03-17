import './movieCardModal.css';
import { useMovieContext } from '../contexts/MovieContext';

const MovieCardModal = ({ movie, onClose }) => {

  if (!movie) return null;// Don't render if no movie is selected

  // Context
  const { addToFavorite, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);



  // function
  function onFavoriteClick(e) {
    e.preventDefault();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorite(movie);
    }

  }


  return (
    <div
      className='movie-modal'
    >
      <div
        className='movie-modal-background'
        onClick={onClose}
      ></div>

      <div className='modal-content'>
        <div
          className='close-btn-div'
          onClick={onClose}>
          <span
            className='close-btn'
          >&times;</span>
        </div>

        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className='modal-fav-btn-div'>
          <button
            className={`modal-favorite-btn ${favorite ? 'active' : ''}`}
            onClick={(e) => { onFavoriteClick(e); }}
            aria-label={favorite ? "Remove from favorites" : "Add from favorites"}
          >
            ♥
          </button>
        </div>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
      </div>
    </div>
  )
}

export default MovieCardModal;