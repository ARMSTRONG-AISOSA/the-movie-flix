import { Link } from 'react-router-dom';
import './footer.css';
import DynamicLogo from '../dynamicLogo/DynamicLogo';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-section">
                    <DynamicLogo />
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
