import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";

export interface UserProfile {
    id: number; 
    name: string;
    email: string;
    role: UserRole;
}

// Matches your backend org.jdc.portal.dto.response.AuthResponse structure
export interface AuthResponse {
    id: number; 
    token: string;
    name: string;
    email: string;
    role: UserRole;
    isLoggedIn: boolean;
}

interface AuthState {
    user: UserProfile | null;
    token: string | null;
    userRole: UserRole | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;

    setAuthSuccess: (authData: AuthResponse) => void;
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
                        id: authData.id, 
                        name: authData.name,
                        email: authData.email,
                        role: authData.role,
                    },
                    token: authData.token,
                    userRole: authData.role,
                    isLoggedIn: authData.isLoggedIn,
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
            name: "jdc-auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                userRole: state.userRole,
                isLoggedIn: state.isLoggedIn,
            }),
        },
    ),
);
