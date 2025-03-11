import { Link } from 'react-router-dom';
import './navbar.css';
import DynamicLogo from '../dynamicLogo/DynamicLogo';

const Navbar = () => {

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <DynamicLogo />
            </div>
            <div className='navbar-links'>
                <Link to='/the-movie-flix' className='nav-link'>Home</Link>
                <Link to='/the-movie-flix/favorites' className='nav-link'>Favorites</Link>
                <Link to='#' className='nav-link'>Categoties</Link>
                <Link to='/the-movie-flix/favorites' className='nav-link'>Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar;


// When you define a function inside useEffect and return it, React will run that function when:
// The component unmounts (removed from the DOM).
// The effect re-runs due to changes in dependencies (if any).

// Use a cleanup function whenever your effect:
// Adds event listeners (e.g., resize, scroll, keydown).
// Starts intervals or timeouts (e.g., setInterval, setTimeout).
// Opens WebSocket or API connections.
// How return Works in useEffect
