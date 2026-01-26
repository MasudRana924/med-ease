import axios from "axios";
import { Medicine, Nurse, AuthResponse, ErrorResponse } from "@/types";

const API_BASE_URL = "https://hospital-backend-ybf2.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests if available
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
    (error) => {
        return Promise.reject(error);
    }
);

export const MedicineService = {
    getAll: async (query: string = ""): Promise<Medicine[]> => {
        try {
            const response = await api.get(`/get/medicine${query}`);
            let data = [];
            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data.medicines) {
                data = response.data.medicines;
            }
            return data;
        } catch (error) {
            console.error("Error fetching medicines:", error);
            return [];
        }
    },

    getFeatured: async (): Promise<Medicine[]> => {
        const medicines = await MedicineService.getAll();
        return medicines.slice(0, 4);
    }
};

export const NurseService = {
    getAll: async (): Promise<Nurse[]> => {
        try {
            const response = await api.get("/get/nurses");
            let data = [];
            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data.nurses) {
                data = response.data.nurses;
            }
            return data;
        } catch (error) {
            console.error("Error fetching nurses:", error);
            return [];
        }
    },

    getFeatured: async (): Promise<Nurse[]> => {
        const nurses = await NurseService.getAll();
        return nurses.slice(0, 4);
    }
};

export const AuthService = {
    login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/login", credentials);
        return response.data;
    },
    signup: async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/register", data);
        return response.data;
    }
};

export default api;
