import axiosClient from "@/config/axiosClient";
import type { UserRole } from "@/store/useAuthStore";
import type { UserCreatePayload, UserResponse } from "@/types/user";

export const adminApi = {
    // GET /admin/users
    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await axiosClient.get<UserResponse[]>("/admin/users");
        return response.data;
    },

    // GET /admin/users/{role}
    getUsersByRole: async (role: string): Promise<UserResponse[]> => {
        const response = await axiosClient.get<UserResponse[]>(`/admin/users/${role}`);
        return response.data;
    },

    // Flexible GET method for single-endpoint fetching
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
    updateUserRole: async (userId: number, role: string | UserRole): Promise<UserResponse> => {
        const response = await axiosClient.put<UserResponse>(`/admin/users/${userId}/role`, { role });
        return response.data;
    },

    // PATCH /admin/users/{userId}/status
    toggleUserStatus: async (userId: number, isActive: boolean): Promise<UserResponse> => {
        // { isActive } automatically expands to { isActive: isActive }
        const response = await axiosClient.patch<UserResponse>(`/admin/users/${userId}/status`, { isActive });
        return response.data;
    },

    // PUT /admin/users/{userId}
    updateUser: async (
        userId: number,
        data: { name: string; email: string; password?: string },
    ): Promise<UserResponse> => {
        const response = await axiosClient.put<UserResponse>(`/admin/users/${userId}`, data);
        return response.data;
    },
};
