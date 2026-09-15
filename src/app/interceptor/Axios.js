import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {

      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      if (typeof window !== "undefined") {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

      }
    }

    return Promise.reject(error);
  }
);


// ======================================================
// PROGRESS API
// ======================================================


// GET MY PROGRESS
export const getMyProgress = async () => {

  try {

    const response = await api.get(
      "/progress"
    );

    return response.data;

  } catch (error) {

    console.error(
      "Get My Progress Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// GET CAREER PROGRESS
export const getCareerProgress = async (career) => {
    return api.get(
        `/progress?career=${encodeURIComponent(career)}`
    );
};


// CREATE / UPDATE PROGRESS
export const updateProgress = async (progressData) => {

  try {

    const response = await api.post(
      "/progress",
      progressData
    );

    return response.data;

  } catch (error) {

    console.error(
      "Update Progress Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const getMatchingJobs = async () => {
  try {
    const response = await api.get("/jobs/matching");

    console.log("MATCHING JOB API RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "GET MATCHING JOBS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// DELETE PROGRESS
export const deleteProgress = async (career) => {

  try {

    const response = await api.delete(
      `/progress/${encodeURIComponent(career)}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Delete Progress Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


export default api;