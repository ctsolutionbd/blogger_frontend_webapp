import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Django backend URL

export const fetchTrendingBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}blogs/trending/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending blogs:", error);
    throw error;
  }
};
