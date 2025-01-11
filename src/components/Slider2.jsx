import React, { useEffect, useState } from "react";
import GlobalAPI from "../Services/GlobalAPI";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const genere = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Slider2 = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const resp = await GlobalAPI.getTrendingVideos();
      setMovieList(resp.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const progressBarColor = "#28a745";
  const textColor = "#ffffff";

  // ฟังก์ชันที่จะเปลี่ยน genre_ids เป็นชื่อ genre
  const getGenres = (genreIds) => {
    return genreIds
      .map((id) => genere.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(" | ");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-[90%] mb-4">
        <div className="mt-32 w-full">
          <Slider {...settings}>
            {movieList.map((item) => (
              <Link to={`movie/${item.id}`} key={item.id}>
                <div className="relative min-w-full h-[310px] mr-5">
                  <img
                    src={IMAGE_BASE_URL + item.backdrop_path}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover md:rounded-md shadow-md"
                  />
                  <div className="absolute top-10 z-10 left-10 flex flex-col items-start gap-3">
                    <h3 className="text-white text-3xl cursor-pointer font-bold text-left px-4">
                      {item.title || item.name}
                    </h3>
                    <p className="w-full text-xs md:w-2/4 text-left px-4">
                      {item.overview && item.overview.length > 100
                        ? item.overview.slice(0, 150) + "..."
                        : item.overview}
                    </p>
                    <div className="flex items-center justify-center">
                      <p className="px-4">
                        <CircularProgressbar
                          value={item.vote_average * 10}
                          text={`${item.vote_average}%`}
                          styles={{
                            path: {
                              stroke: progressBarColor,
                            },
                            text: {
                              fill: textColor,
                              fontSize: "28px",
                            },
                          }}
                          className="h-10"
                        />
                      </p>
                      <p className=" flex border rounded my-2 px-2 tracking-widest text-[10px] opacity-70">
                        {item.original_language}
                      </p>
                    </div>
                    {/* แสดง genre */}
                    <div className="px-4 text-xs opacity-70">
                       {getGenres(item.genre_ids)}
                    </div>
                  </div>
                  <div className="absolute inset-0 cursor-pointer flex items-center justify-center bg-gradient-to-r from-black to-transparent md:rounded-md transition-all"></div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Slider2;
