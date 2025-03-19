import { useState } from 'react';
import './favorites.css';
import { useMovieContext } from '../../components/contexts/MovieContext';
import MovieCard from '../../components/movieCard/MovieCard';
import MovieCardModal from '../../components/movieCardModal/MovieCardModal';

const Favorites = () => {

  // State
  // Modal for selected Moviecard
  // Null is initialised becaused selected movie is being used to hold an object
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Pass in favorited movie data
  const { favorites } = useMovieContext();

  // Function to open modal with details of clicked movie
  const openMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  // Close Modal
  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't aded any favorite movies yet!</p>
        </div>
      ) : (
        <div className='movies-grid'>
        {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => openMovieDetails(movie)}
              />

        ))}
      </div>
      )}


      {/* Render Movie Modal */}
      <MovieCardModal
        movie={selectedMovie}
        onClose={closeMovieDetails}
      />
    </div >
  )
}

export default Favorites
