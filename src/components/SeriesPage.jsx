import React from 'react';
import GenresList from '../Constants/GenresList';
import MovieList from './MovieList';
import Header from './Header';

const SeriesPage = () => {
  // ค้นหาหมวด TV Movie
  const tvMovieGenre = GenresList.genere.find((item) => item.id === 10770);

  return (
    <div>
    <Header/>
            <div className="p-5 py-28 px-8 md:px-16">
        {tvMovieGenre ? (
            <>
            <h2 className="text-xl text-white font-bold border-b-2 border-gray-500 pb-2 mb-4">
                {tvMovieGenre.name}
            </h2>
            <MovieList genreID={tvMovieGenre.id} />
            </>
        ) : (
            <p className="text-white">TV Movies category not found.</p>
        )}
        </div>
    </div>
    
  );
};

export default SeriesPage;