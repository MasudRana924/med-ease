import api from "@/lib/api/client";
import { Medicine } from "@/types";

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
