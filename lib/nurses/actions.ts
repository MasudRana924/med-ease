import api from "@/lib/api/client";
import { Nurse } from "@/types";

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
