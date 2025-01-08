import React, { useEffect, useState, useRef } from 'react';
import GlobalAPI from '../Services/GlobalAPI';
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const MovieList = ({ genreID }) => {
  const [movies, setMovies] = useState([]);
  const elementRef = useRef();
  const screenWidth = window.innerWidth;  // Get the screen width dynamically

  useEffect(() => {
    if (genreID) {
      getMovieByGenreId();
    }
  }, [genreID]); // Dependency on genreID to update the movie list when it changes

  const getMovieByGenreId = async () => {
    try {
      const resp = await GlobalAPI.getMovieByGenreID(genreID);
      console.log("Movies by Genre:", resp.results);
      setMovies(resp.results); // Store the results in state
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 100;  // Adjusted for smoother scrolling
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 100;  // Adjusted for smoother scrolling
  };

  return (
    <div>
      <IoChevronBackOutline 
        className='hidden md:block text-white text-[30px] absolute -mx-5 mt-[100px] cursor-pointer z-20' 
        onClick={() => sliderLeft(elementRef.current)}
      />
      <IoChevronForwardOutline 
        className='hidden md:block text-white text-[30px] absolute mx-8 mt-[100px] cursor-pointer right-0' 
        onClick={() => sliderRight(elementRef.current)}
      />
      <div ref={elementRef} className='flex overflow-x-auto scrollbar-none gap-3 md:gap-8 scroll-smooth pt-5 px-3 pb-5'>
        {movies.map((item) => (
          <Link to={`movie/${item.id}`} key={item.id}>
                <MovieCard key={item.id} movie={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
