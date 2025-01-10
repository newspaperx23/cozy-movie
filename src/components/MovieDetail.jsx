import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { auth, db } from '../Services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function MovieDetail() {
  const movieBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = "2edec388cc7fc7d9060e383221bbb565";
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
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
      const q = query(watchlistRef, where("uid", "==", uid), where("movieId", "==", movieId));
      const querySnapshot = await getDocs(q);
      setIsInWatchlist(!querySnapshot.empty); // ถ้าเจอข้อมูล จะตั้งค่าเป็น true
    } catch (error) {
      console.error("Error checking watchlist:", error);
    }
  };

  // ตรวจสอบว่า movieDetail มีค่าหรือยัง
  if (!movieDetail) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <Header />
      <div className="w-3/4">
        <div className="flex justify-center items-center flex-col text-center gap-3 mt-32">
          {/* แสดงโปสเตอร์ */}
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="rounded-md shadow-md"
          />
          {/* แสดงชื่อหนัง */}
          <h1 className="text-4xl mb-3 mt-3">{movieDetail.title}</h1>
          {/* แสดงรายละเอียดเพิ่มเติม */}
          <p>
            <strong>Overview:</strong> {movieDetail.overview}
          </p>
          <p>
            <strong>Release Date:</strong> {movieDetail.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movieDetail.vote_average}
          </p>
          {/* ปุ่มเพิ่มเข้า Watchlist */}
          <button
            onClick={addToWatchlist}
            disabled={isInWatchlist}
            className={`mt-4 px-4 py-2 rounded ${
              isInWatchlist ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
          >
            {isInWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
