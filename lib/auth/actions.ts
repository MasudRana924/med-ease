import api from "@/lib/api/client";
import { AuthResponse, LoginCredentials, SignupCredentials } from "@/types";

export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", credentials);
        return response.data;
    },
    signup: async (data: SignupCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/register", data);
        return response.data;
    }
};
