import axiosClient from "../../../config/axiosClient";
import type { AuthResponse } from "@/store/useAuthStore";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    emailOrName: string;
    password: string;
}

export const authApi = {
    register: async (data: RegisterRequest): Promise<void> => {
        await axiosClient.post("/auth/register", data);
    },
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        // ◄ Now returns AuthResponse
        const request = await axiosClient.post<AuthResponse>("/auth/login", data);
        return request.data;
    },
};
