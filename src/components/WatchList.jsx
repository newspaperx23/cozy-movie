import React, { useState, useEffect } from 'react';
import { db, auth } from '../Services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Header';

function Watchlist() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]); // สำหรับเก็บข้อมูลหนังที่ดึงจาก TMDB API
  const movieBaseUrl = "https://api.themoviedb.org/3";
  const apiKey = "2edec388cc7fc7d9060e383221bbb565";

  // ดึงข้อมูลจาก TMDB สำหรับหนังใน Watchlist
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = [];
        // ดึงข้อมูลของแต่ละหนังใน Watchlist
        for (let movie of watchlist) {
          const response = await fetch(
            `${movieBaseUrl}/movie/${movie.movieId}?api_key=${apiKey}&language=en-US`
          );
          const data = await response.json();
          movieData.push(data); // เก็บข้อมูลหนังทั้งหมด
        }
        setMovieDetails(movieData); // อัพเดตข้อมูลหนัง
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (watchlist.length > 0) {
      fetchMovieDetails(); // เรียกใช้ฟังก์ชันดึงข้อมูลหนังหากมี Watchlist
    }
  }, [watchlist]);

  // ตรวจสอบสถานะผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchWatchlist(currentUser.uid); // ดึงรายการ Watchlist ของผู้ใช้
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // ฟังก์ชันดึงรายการหนังใน Watchlist
  const fetchWatchlist = async (uid) => {
    try {
      const watchlistRef = collection(db, "favorites");
      const q = query(watchlistRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const movies = querySnapshot.docs.map((doc) => doc.data()); // ดึงข้อมูลหนังจาก Firestore
      setWatchlist(movies);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  if (!user) {
    return <p>Please log in to see your watchlist.</p>; // แจ้งให้ผู้ใช้ล็อกอิน
  }

  return (
    <>
    <Header/>
    <div className="flex justify-center">
      <div className="w-3/4 mt-32">
        <h1 className="text-4xl text-center mb-6">Your Watchlist</h1>
        {movieDetails.length === 0 ? (
          <p className="text-center">No movies in your watchlist yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {movieDetails.map((movie, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md shadow-md"
                />
                <h3 className="text-xl mt-2">{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Watchlist;
