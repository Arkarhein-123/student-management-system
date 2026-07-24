import type { UserRole } from "@/store/useAuthStore";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    isActive: boolean;
}

export interface UserCreatePayload {
    name: string;
    email: string;
    role: UserRole;
}
