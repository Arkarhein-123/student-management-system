import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";

export interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
}

// Exactly what the backend returns on successful login
export interface AuthResponse {
    token: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthState {
    user: UserProfile | null;
    token: string | null; // ◄ Added to store JWT separately
    userRole: UserRole | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;

    setAuthSuccess: (authData: AuthResponse) => void; // ◄ Changed from UserProfile to AuthResponse
    setAuthFailure: (errorMessage: string) => void;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            userRole: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,

            setAuthSuccess: (authData: AuthResponse) =>
                set({
                    user: {
                        name: authData.name,
                        email: authData.email,
                        role: authData.role,
                    },
                    token: authData.token, // ◄ Saves JWT token
                    userRole: authData.role,
                    isLoggedIn: true,
                    isLoading: false,
                    error: null,
                }),

            setAuthFailure: (errorMessage: string) =>
                set({
                    user: null,
                    token: null,
                    userRole: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: errorMessage,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    userRole: null,
                    isLoggedIn: false,
                    isLoading: false,
                    error: null,
                }),

            clearError: () => set({ error: null }),
        }),
        {
            name: "jdc-auth-storage", // Key name in localStorage
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                userRole: state.userRole,
                isLoggedIn: state.isLoggedIn,
            }), // Only persist these essential fields
        },
    ),
);
