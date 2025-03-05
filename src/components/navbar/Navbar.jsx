import { Link } from 'react-router-dom';
import './navbar.css';
import { mobile_logo, tablet_logo, desktop_logo } from '../../assets/index';
import { useEffect, useState } from 'react';

const Navbar = () => {

    // State Management
    const [logo, setLogo] = useState(mobile_logo);

    // useEffect
    useEffect(() => {

        // window.innerWidth: checks the current screen width
        const updateLogo = () => {
            if (window.innerWidth >= 1024) {
                setLogo(desktop_logo);
            } else if (window.innerWidth >= 768) {
                setLogo(tablet_logo);
            } else {
                setLogo(mobile_logo);
            }
        };

        updateLogo(); // set initial logo

        // Add event listener
        // Every time the window is resized, updateLogo() will run
        window.addEventListener('resize', updateLogo);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', updateLogo);
        };  // !Important: Check below for some notes.

    }, [])


    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to='/the-movie-flix'>
                    <img
                        src={logo}
                        className='logo'
                        alt="logo"
                    />
                </Link>
            </div>
            <div className='navbar-links'>
                <Link to='/the-movie-flix' className='nav-link'>Home</Link>
                <Link to='/the-movie-flix/favorites' className='nav-link'>Favorites</Link>
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
