import './movieCardModal.css';

const movieCardModal = ({ movie, onClose }) => {

  if (!movie) return null;// Don't render if no movie is selected


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
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.tite} />
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
      </div>
    </div>
  )
}

export default movieCardModal;
