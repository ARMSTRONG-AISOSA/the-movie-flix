import { Link } from 'react-router-dom';
import './navbar.css';
import { mobile_logo, tablet_logo, desktop_logo } from '../../assets/index';
import { useEffect, useState } from 'react';

const Navbar = () => {

    // State Management
    const [logo, setLogo] = useState(mobile_logo);

    // useEffect
    useEffect(() => {
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
        // ✅ Add event listener
        window.addEventListener('resize', updateLogo);

        // ✅ Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', updateLogo);
        };
    }, [])


    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to='/the-movie-flix'>
                    <img
                        src={logo}
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
