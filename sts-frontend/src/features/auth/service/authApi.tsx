import axiosClient from "../../../config/axiosClient";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export const authApi = {
    register: async (data: RegisterRequest): Promise<void> => {
        await axiosClient.post("/auth/register", data);
    },
};
