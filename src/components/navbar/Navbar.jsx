import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to='/the-movie-flix'>Logo</Link>
      </div>
    </nav>
  )
}

export default Navbar;
