import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../Services/GlobalAPI";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const screenWidth = window.innerWidth;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const Slider = () => {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const resp = await GlobalAPI.getTrendingVideos();
      console.log("Trending Movies:", resp.results);
      setMovieList(resp.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 100;
  };
  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 100;
  };

  return (
    <>
      <div>
        <HiChevronLeft
          className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer"
          onClick={() => sliderLeft(elementRef.current)}
        />
        <HiChevronRight
          className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0"
          onClick={() => sliderRight(elementRef.current)}
        />
      </div>
      <div
        className="flex overflow-x-auto w-full px-6 md:px-16 py-4 scrollbar-none scroll-smooth mt-28"
        ref={elementRef}
      >
        {movieList.map((item, index) => (
          <div key={index} className="relative min-w-full h-[310px] mr-5">
            {/* รูปภาพ */}
            <img
              src={IMAGE_BASE_URL + item.backdrop_path}
              alt={item.title || item.name} // รองรับทั้ง title และ name
              className="w-full h-full object-cover rounded-md shadow-md"
            />
            {/* Overlay สำหรับชื่อหนัง */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 rounded-md transition-all">
              <h3 className="text-white text-3xl cursor-pointer font-bold text-center truncate px-4">
                {item.title || item.name} {/* ใช้ title หากไม่มีให้ใช้ name */}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div></div>
    </>
  );
};

export default Slider;
