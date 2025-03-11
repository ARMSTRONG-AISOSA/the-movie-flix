import { Link } from 'react-router-dom';
import { mobile_logo, tablet_logo, desktop_logo } from '../../assets/index';
import { useEffect, useState } from 'react';
import './dynamicLogo.css';

const DynamicLogo = () => {

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
        <Link to='/the-movie-flix'>
            <img
                src={logo}
                className='logo'
                alt="logo"
            />
        </Link>
    )
}

export default DynamicLogo
