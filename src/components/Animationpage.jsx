import React from 'react';
import GenresList from '../Constants/GenresList';
import MovieList from './MovieList';
import Header from './Header';

const AnimationPage = () => {
  // ค้นหาหมวด Animation
  const animationGenre = GenresList.genere.find((item) => item.id === 16);

  return (
    <div>
    <Header/>
        <div className="p-5 py-28 px-8 md:px-16">
        {animationGenre ? (
            <>
            <h2 className="text-xl text-white font-bold border-b-2 border-gray-500 pb-2 mb-4">
                {animationGenre.name}
            </h2>
            <MovieList genreID={animationGenre.id} />
            </>
        ) : (
            <p className="text-white">Animation category not found.</p>
        )}
        </div>
    </div>
  );
};

export default AnimationPage;
