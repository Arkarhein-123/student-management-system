import type { UserProfile } from "@/store/useAuthStore";
import axiosClient from "../../../config/axiosClient";

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
    login: async (data: LoginRequest): Promise<UserProfile> => {
        const request = await axiosClient.post<UserProfile>("/auth/login", data);
        return request.data;
    },
};
