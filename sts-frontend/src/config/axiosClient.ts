import axios from "axios";
import { useAuthStore } from "../store/useAuthStore"; // ◄ Adjust path if necessary

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptors
axiosClient.interceptors.request.use(
    (config) => {
        // ◄ Cleanly fetch the token directly from Zustand state
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response Interceptors
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Session expired or unauthorized attempt.");
            // ◄ Automatically clear client session if unauthorized
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
