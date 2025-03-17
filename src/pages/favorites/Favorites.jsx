import './favorites.css';
import { useMovieContext } from '../../components/contexts/MovieContext';
import MovieCard from '../../components/movieCard/MovieCard';

const Favorites = () => {

  const { favorite } = useMovieContext();

  return (
    <div>
      {/* <h1>Favourites Test</h1>
      {favorite.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          // onClick={() => openMovieDetails(movie)}
        />
      ))} */}


    </div >
  )
}

export default Favorites
