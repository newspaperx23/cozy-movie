import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "2edec388cc7fc7d9060e383221bbb565";

// Get trending videos
const getTrendingVideos = async () => {
  try {
    const response = await axios.get(
      `${movieBaseUrl}/trending/all/day?api_key=${api_key}`
    );
    return response.data; // Return the data to be used by the caller
  } catch (error) {
    console.error("Error fetching trending videos:", error.message);
    throw error; // Rethrow the error to handle it outside
  }
};

// Get movies by genre ID
export const getMovieByGenreID = async (id) => {
  try {
    const response = await axios.get(
      `${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`
    );
    return response.data; // Return the data to be used by the caller
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${id}:`, error.message);
    throw error; // Rethrow the error to handle it outside
  }
};

// Test API connection
export const checkApi = async () => {
  try {
    const response = await axios.get(
      `${movieBaseUrl}/trending/all/day?api_key=${api_key}`
    );
    console.log("Data fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching API:", error.message);
  }
};

// Export all functions
export default {
  getTrendingVideos,
  getMovieByGenreID
};
