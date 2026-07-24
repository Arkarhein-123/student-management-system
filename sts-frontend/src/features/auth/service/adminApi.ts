import axiosClient from "@/config/axiosClient";
import type { UserRole } from "@/store/useAuthStore";
import type { UserCreatePayload, UserResponse } from "@/types/user";


export const adminApi = {
    // GET /admin/users or /admin/users/{role}
    getUsers: async (role?: string): Promise<UserResponse[]> => {
        const endpoint = role && role !== "ALL" ? `/admin/users/${role}` : "/admin/users";
        const response = await axiosClient.get<UserResponse[]>(endpoint);
        return response.data;
    },

    // POST /admin/users/create
    createUser: async (payload: UserCreatePayload): Promise<UserResponse> => {
        const response = await axiosClient.post<UserResponse>("/admin/users/create", payload);
        return response.data;
    },

    // PUT /admin/users/{userId}/role
    updateUserRole: async (userId: number, role: UserRole): Promise<UserResponse> => {
        const response = await axiosClient.put<UserResponse>(`/admin/users/${userId}/role`, { role });
        return response.data;
    },
};
