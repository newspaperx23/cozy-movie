import React from 'react';
import GenreMovieList from './GenreMovieList';
import Header from './Header';

const Moviespage = () => {
  return (
    <div>
    <Header/>
        <div className="p-5 py-28 px-8 md:px-16">
      <h2 className="text-xl text-white font-bold border-b-2 border-gray-500 pb-2 mb-4">
        All Movies
      </h2>
      <GenreMovieList />
    </div>
    </div>
  );
};

export default Moviespage;