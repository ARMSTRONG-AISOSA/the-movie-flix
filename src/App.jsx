import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './components/contexts/MovieContext';
import './app.css';
import HomePage from './pages/homePage/HomePage';
import Favorites from './pages/favorites/Favorites';
import ErrorPage from './pages/errorPage/ErrorPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';


function App() {

  return (
    <MovieProvider>
      <main className='main-content'>
        <Navbar />
        <Routes>
          <Route path='/the-movie-flix' element={<HomePage />} />
          <Route path='/the-movie-flix/favorites' element={<Favorites />} />
          {/* Catch-all route for 404 errors */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </MovieProvider>
  )
}


export default App

// A React component is a reusable, independent piece of UI/JSX that defines how a part of an application should appear and behave.
// JSX => React's syntax for UI
