import { create } from "zustand";
export type UserRole = "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";

export interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
}

interface AuthState {
    user: UserProfile | null;
    userRole: UserRole | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;

    setAuthSuccess: (user: UserProfile) => void;
    setAuthFailure: (errorMessage: string) => void;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    userRole: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,

    setAuthSuccess: (user: UserProfile) =>
        set({ user, userRole: user.role, isLoggedIn: true, isLoading: false, error: null }),
    setAuthFailure: (errorMessage: string) =>
        set({ user: null, userRole: null, isLoggedIn: false, isLoading: false, error: errorMessage }),
    logout: () => set({ user: null, userRole: null, isLoggedIn: false, isLoading: false, error: null }),
    clearError: () => set({ error: null }),
}));
