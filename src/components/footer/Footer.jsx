import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mobile_logo, tablet_logo, desktop_logo } from '../../assets/index';
import './footer.css';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {


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
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-section">
                    <Link to='/the-movie-flix'>
                        <img
                            src={logo}
                            className='logo'
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Discover the best movies and explore our collection of reviews and ratings.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to='/the-movie-flix' >Home</Link></li>
                        <li><Link to='/the-movie-flix/favorites'>Favorites</Link></li>
                        <li><Link to='#'>Categories</Link></li>
                        <li><Link to='#'>Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaXTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 The Movie Flix | All rights reserved <a href="#">Armstrong</a></p>
            </div>
        </footer>
    )
}

export default Footer
