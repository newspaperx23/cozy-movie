import React from 'react';
import GenresList from '../Constants/GenresList';
import MovieList from './MovieList';

const GenreMovieList = () => {
  return (
    <div>
        {GenresList.genere.map((item, index) => index < 5 && (
            <div key={item.id} className='p-5 px-8 md:px-16'>  {/* Add the key here */}
                <h2 className='text-base text-white font-normal w-[150px] border text-center rounded-md px-3'>{item.name}</h2>
                <MovieList genreID={item.id}/>
            </div>
        ))}
    </div>
  );
};

export default GenreMovieList;
