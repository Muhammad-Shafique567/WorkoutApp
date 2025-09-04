// API configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://workoutapp-ps3e.onrender.com' 
  : ''; // Empty string for development (uses proxy)

export const API_ENDPOINTS = {
  WORKOUTS: `${API_BASE_URL}/api/workouts`,
  WORKOUT_BY_ID: (id) => `${API_BASE_URL}/api/workouts/${id}`
};

export default API_ENDPOINTS;
