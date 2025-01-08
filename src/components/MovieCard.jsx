import React from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieCard = ({ movie }) => {
  return (
    <div className='relative flex flex-col items-center group shadow-lg'>
      <div className='w-[200px] h-[120px] md:w-[300px] md:h-[180px]'>
        <img 
          src={IMAGE_BASE_URL + movie.poster_path} 
          className='w-full h-full object-cover rounded-lg 
            hover:border-[3px] border-gray-400 hover:scale-110 transition-all duration-150 ease-in cursor-pointer'
          alt={movie.title} 
        />
      </div>
      <h2 className='absolute bottom-2 left-2 right-2 text-center text-white text-sm font-bold bg-black bg-opacity-50 px-2 rounded-md 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        {movie.title}
      </h2>
    </div>
  );
};

export default MovieCard;
