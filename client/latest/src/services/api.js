import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const fetchTours = () => api.get("/api/tours");
export const signupUser = (formData) => api.post("/api/auth/signup", formData);
export const loginUser = (formData) => api.post("/api/auth/login", formData);
export const createTour = (tourData) => {
  if (tourData instanceof FormData) {
    return api.post("/api/tours", tourData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return api.post("/api/tours", tourData);
};
export const deleteTour = (id) => api.delete(`/api/tours/${id}`);
