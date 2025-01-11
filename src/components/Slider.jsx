import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../Services/GlobalAPI";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const screenWidth = window.innerWidth;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Slider = () => {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

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
    const currentScrollPosition = element.scrollLeft;
    const itemWidth = screenWidth - 100; // ความกว้างของแต่ละภาพ
    const nextScrollPosition =
      Math.ceil(currentScrollPosition / itemWidth) * itemWidth + itemWidth;
    element.scrollLeft = nextScrollPosition;
  };

  const sliderLeft = (element) => {
    const currentScrollPosition = element.scrollLeft;
    const itemWidth = screenWidth - 100; // ความกว้างของแต่ละภาพ
    const previousScrollPosition =
      Math.floor(currentScrollPosition / itemWidth) * itemWidth - itemWidth;
    element.scrollLeft = previousScrollPosition;
  };

  // เพิ่มฟังก์ชันเลื่อนอัตโนมัติ
  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (elementRef.current) {
        const currentScrollPosition = elementRef.current.scrollLeft;
        const itemWidth = screenWidth - 120; // ความกว้างของแต่ละภาพ
        const nextScrollPosition =
          Math.ceil(currentScrollPosition / itemWidth) * itemWidth + itemWidth;

        if (nextScrollPosition >= elementRef.current.scrollWidth) {
          // วนกลับไปเริ่มต้น
          elementRef.current.scrollLeft = 0;
        } else {
          elementRef.current.scrollLeft = nextScrollPosition;
        }
      }
    }, 5000); // ทุก 4 วินาที

    return () => clearInterval(autoSlide); // ล้าง Interval เมื่อ Component ถูกถอด
  }, []);

  return (
    <>
      <div>
        <HiChevronLeft
          className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer z-20"
          onClick={() => sliderLeft(elementRef.current)}
        />
        <HiChevronRight
          className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-20"
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
              alt={item.title || item.name}
              className="w-full h-full object-cover rounded-md shadow-md"
            />
            {/* Overlay สำหรับชื่อหนัง */}
            <div className="absolute top-10 z-10 left-10 flex flex-col items-start gap-3">
              <h3 className="text-white text-3xl cursor-pointer font-bold text-left truncate px-4">
                {item.title || item.name}
              </h3>
              <p className="w-full md:w-2/4 text-left px-4">{item.overview}</p>    
            </div>

            <div className="absolute inset-0 cursor-pointer flex items-center justify-center  bg-gradient-to-r from-black to-transparent rounded-md transition-all"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
