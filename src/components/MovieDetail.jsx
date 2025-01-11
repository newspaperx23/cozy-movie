import React, { useState, useEffect } from "react";
import { useHref, useParams } from "react-router-dom";
import Header from "./Header";
import { auth, db } from "../Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoMdAdd } from "react-icons/io";
import { CiYoutube } from "react-icons/ci";

function MovieDetail() {
  const movieBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = "2edec388cc7fc7d9060e383221bbb565";
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieBackdrop, setMovieBackdrop] = useState(null);
  const [user, setUser] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // ดึงข้อมูลหนัง
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${movieBaseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // ดึงข้อมูลหนัง
  useEffect(() => {
    const fetchMovieBackdrop = async () => {
      try {
        const response = await fetch(
          `${movieBaseUrl}/movie/${id}/images?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovieBackdrop(data.backdrops[0]);
        console.log(data.backdrops[0]);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieBackdrop();
  }, [id]);

  // ดึงข้อมูลวีดีโอ
  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `${movieBaseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const dataTrailer = await response.json();

        // ตรวจสอบว่ามีผลลัพธ์ก่อนเซ็ตค่า
        if (dataTrailer.results && dataTrailer.results.length > 0) {
          setMovieTrailer(dataTrailer.results[0]); // เก็บข้อมูลวิดีโอแรก
        } else {
          console.error("No trailers found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    fetchMovieTrailer();
  }, [id]);

  // ตรวจสอบสถานะผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkWatchlist(currentUser.uid, id); // ตรวจสอบว่าหนังอยู่ใน Watchlist หรือยัง
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [id]);

  // ฟังก์ชันเพิ่มหนังเข้า Watchlist
  const addToWatchlist = async () => {
    if (!user) return;

    try {
      const watchlistRef = collection(db, "favorites");
      await addDoc(watchlistRef, {
        uid: user.uid,
        movieId: id,
        addedAt: new Date().toISOString(),
      });
      setIsInWatchlist(true); // อัปเดตสถานะ
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  // ฟังก์ชันตรวจสอบว่าอยู่ใน Watchlist หรือยัง
  const checkWatchlist = async (uid, movieId) => {
    try {
      const watchlistRef = collection(db, "favorites");
      const q = query(
        watchlistRef,
        where("uid", "==", uid),
        where("movieId", "==", movieId)
      );
      const querySnapshot = await getDocs(q);
      setIsInWatchlist(!querySnapshot.empty); // ถ้าเจอข้อมูล จะตั้งค่าเป็น true
    } catch (error) {
      console.error("Error checking watchlist:", error);
    }
  };

  // ตรวจสอบว่า movieDetail มีค่าหรือยัง
  if (!movieDetail) {
    return <p className="text-center">Error ...</p>;
  }
  console.log(movieDetail.vote_average);
  const ratingVote = movieDetail.vote_average;
  const progressBarColor = "#28a745"; // สีเขียว
  const textColor = "#ffffff"; // ข้อความสีขาว

  console.log(movieDetail);

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center">
        <div className="flex w-full  mt-0 md:mt-36 justify-center">
          {/* Backdrops */}
          <div className="relative w-full">
            {movieBackdrop && movieBackdrop.file_path && (
              <img
                src={`https://image.tmdb.org/t/p/original/${movieBackdrop.file_path}`}
                alt="Movie Backdrop"
                className="rounded-md shadow-md w-full h-[450px] lg:h-[560px] object-cover"
              />
            )}

            <div className="absolute top-0 w-full h-[450px] lg:h-[560px] bg-gradient-to-t from-black to-transparent rounded-md"></div>
          </div>

          {/* Movie Detail */}
          <div className="absolute pt-11 z-10 mt-20 md:mt-0 flex flex-col md:flex-row items-center">
            <img
              src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="rounded-md shadow-lg shadow-black"
            />
            <div className="flex-col justify-center items-center">
              <h1 className="text-4xl mt-3 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] p-8 text-center md:text-left tracking-widest font-semibold">
                {movieDetail.title}
              </h1>

              <div className="md:float-left flex justify-center items-center">
                <div className="flex md:pl-8 gap-3">
                  <CircularProgressbar
                    value={ratingVote * 10}
                    text={`${ratingVote.toFixed(1)}%`}
                    styles={{
                      path: {
                        stroke: progressBarColor,
                      },
                      text: {
                        fill: textColor,
                        fontSize: "28px",
                      },
                    }}
                    className="h-16"
                  />
                  <p className="items-center justify-center flex opacity-70">
                    {movieDetail.release_date.split("-")[0]}
                  </p>
                  <p className="items-center justify-center flex opacity-70">
                    {movieDetail.genres && movieDetail.genres.length > 0
                      ? movieDetail.genres[0].name
                      : "No genres available"}
                  </p>
                </div>
              </div>

              <div className="md:flex justify-center text-center md:text-left  md:w-[500px] clear-both">
                <p className="mb-3 text-wrap text-sm p-8 pt-0 mt-3">
                  {movieDetail.overview}
                </p>
              </div>
              <div className="flex justify-center md:justify-start md:ml-8 gap-4">
                {user && (
                  <button
                    onClick={addToWatchlist}
                    disabled={isInWatchlist}
                    className={`mt-4 px-4 py-2 rounded mb-4 ${
                      isInWatchlist
                        ? "bg-gray-800 cursor-not-allowed"
                        : "border text-white hover:scale-110 transition-all hover:border-orange-600"
                    }`}
                  >
                    {isInWatchlist ? (
                      "Added to Watchlist"
                    ) : (
                      <span className="flex justify-center items-center gap-2">
                        <IoMdAdd className="text-2xl" />
                        Add to Watchlist
                      </span>
                    )}
                  </button>
                )}

                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${movieTrailer.key}`,
                      "_blank"
                    )
                  }
                  className="bg-red-700 hover:bg-red-950 transition-all hover:scale-110 px-3 py-2 rounded my-4 flex justify-center items-center gap-2"
                >
                  <CiYoutube className="text-2xl" />
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
