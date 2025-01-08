import React from 'react';
import GenresList from '../Constants/GenresList';
import MovieList from './MovieList';

const GenreMovieList = () => {
  return (
    <div>
        {GenresList.genere.map((item, index) => index < 5 && (
            <div key={item.id} className='p-5 px-8 md:px-16'>  {/* Add the key here */}
                <h2 className='text-[20px] text-white font-bold w-[110px] border text-center rounded-md bg-gradient-to-r from-gray-800 to-gray-950'>{item.name}</h2>
                <MovieList genreID={item.id}/>
            </div>
        ))}
    </div>
  );
};

export default GenreMovieList;
