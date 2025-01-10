import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure you're importing BrowserRouter as Router
import './App.css';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import Watchlist from './components/WatchList';

function App() {
  return (
    <Router> {/* This is correct now */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
    </Router>
  );
}

export default App;
