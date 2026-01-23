import axios from "axios";
import { Medicine, Nurse } from "@/types";

const API_BASE_URL = "https://hospital-backend-ybf2.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const MedicineService = {
    getAll: async (query: string = ""): Promise<Medicine[]> => {
        try {
            const response = await api.get(`/get/medicine${query}`);
            // Handle the "medicines" wrapper in response
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
            // Handle the "nurses" wrapper in response
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
    login: async (credentials: { email: string; password: string }) => {
        return api.post("/login", credentials);
    }
};

export default api;
