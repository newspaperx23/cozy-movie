import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalAPI from '../Services/GlobalAPI';
import Header from './Header';

function MovieDetail() {
  const movieBaseUrl = "https://api.themoviedb.org/3"; // URL สำหรับ TMDB API
  const apiKey = "2edec388cc7fc7d9060e383221bbb565"; // API Key
  const { id } = useParams(); // ดึง ID จากพารามิเตอร์ใน URL
  const [movieDetail, setMovieDetail] = useState(null); // State สำหรับเก็บรายละเอียดหนัง

  // ใช้ useEffect เพื่อดึงข้อมูลหนัง
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${movieBaseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovieDetail(data); // เก็บข้อมูลหนังใน state
      } catch (error) {
        console.error("Error fetching movie details:", error); // จัดการข้อผิดพลาด
      }
    };

    fetchMovieDetail(); // เรียกฟังก์ชันดึงข้อมูล
  }, [id]); // ทำงานเมื่อ id เปลี่ยน

  // ตรวจสอบว่า movieDetail มีค่าหรือยัง
  if (!movieDetail) {
    return <p className='text-center'>Loading...</p>; // แสดงข้อความระหว่างรอดึงข้อมูล
  }

  return (
    <div className='flex justify-center'>
      <Header />
      <div className='w-3/4'>
        <div className='flex justify-center items-center flex-col text-center gap-3 mt-32'>
            {/* แสดงโปสเตอร์ */}
            <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className=' rounded-md shadow-md'/>
                        {/* แสดงชื่อหนัง */}
            <h1 className='text-4xl mb-3 mt-3'>{movieDetail.title}</h1>
            {/* แสดงรายละเอียดเพิ่มเติม */}
            <p><strong>Overview:</strong> {movieDetail.overview}</p>
            <p><strong>Release Date:</strong> {movieDetail.release_date}</p>
            <p><strong>Rating:</strong> {movieDetail.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
