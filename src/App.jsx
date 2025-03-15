import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure you're importing BrowserRouter as Router
import './App.css';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import Watchlist from './components/WatchList';
import Animationpage from './components/animationpage';
import Moviespage from './components/Moviespage';
import SeriesPage from './components/SeriesPage';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <Router> {/* This is correct now */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/watchlist' element={<Watchlist/>}/>
        <Route path='/animation' element={<Animationpage/>}/>
        <Route path='/moviespage' element={<Moviespage/>}/>
        <Route path='/seriespage' element={<SeriesPage/>}/>
        <Route path='/contactpage' element={<ContactPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
