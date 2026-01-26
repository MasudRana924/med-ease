import api from "@/lib/api/client";
import { Doctor } from "@/types";

interface DoctorsResponse {
    doctors: Doctor[];
}

interface DoctorResponse {
    success: boolean;
    doctor: Doctor;
}

export const DoctorService = {
    getAll: async (): Promise<Doctor[]> => {
        try {
            const response = await api.get<DoctorsResponse>("/doctors");
            if (response.data.doctors && Array.isArray(response.data.doctors)) {
                return response.data.doctors;
            }
            return [];
        } catch (error) {
            console.error("Error fetching doctors:", error);
            return [];
        }
    },

    getById: async (id: string): Promise<Doctor | null> => {
        try {
            const response = await api.get<DoctorResponse>(`/doctor/${id}`);
            if (response.data.success && response.data.doctor) {
                return response.data.doctor;
            }
            return null;
        } catch (error) {
            console.error("Error fetching doctor:", error);
            return null;
        }
    },

    getFeatured: async (): Promise<Doctor[]> => {
        const doctors = await DoctorService.getAll();
        return doctors.slice(0, 4);
    }
};
