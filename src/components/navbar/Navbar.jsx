import { Link } from 'react-router-dom';
import './navbar.css';
import DynamicLogo from '../dynamicLogo/DynamicLogo';
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { } from "react-icons/md";
import { useState } from 'react';
const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <DynamicLogo />
            </div>

            <div
                className='hamburger-menu'
                onClick={
                    () => setMenuOpen(!menuOpen)
                }
            >
                {!menuOpen ? <MdMenu /> : <MdMenuOpen />}
            </div>

            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <Link
                    to='/the-movie-flix'
                    className='nav-link'
                    onClick={() => setMenuOpen(!menuOpen)}
                >Home</Link>

                <Link
                    to='/the-movie-flix/favorites'

                    className='nav-link'
                    onClick={() => setMenuOpen(!menuOpen)}
                >Favorites</Link>

                <Link to='#' className='nav-link'>Categorties</Link>
                <Link to='#' className='nav-link'>Contact</Link>
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
