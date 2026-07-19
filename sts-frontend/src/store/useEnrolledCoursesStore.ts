import axiosClient from "@/config/axiosClient";
import { create } from "zustand";
// Adjust this path to your axiosClient.ts location

export interface StudentEnrolledResponse {
    enrollmentId: number;
    batchId: number;
    batchCode: string;
    courseName: string;
    imageUrl: string;
    status: "PENDING" | "APPROVED" | "DROPPED";
    progressPercent: number;
}

interface EnrolledCoursesState {
    classrooms: StudentEnrolledResponse[];
    isLoading: boolean;
    error: string | null;
    fetchEnrolledCourses: (studentId: number) => Promise<void>;
}

export const useEnrolledCoursesStore = create<EnrolledCoursesState>((set) => ({
    classrooms: [],
    isLoading: false,
    error: null,

    fetchEnrolledCourses: async (studentId: number) => {
        set({ isLoading: true, error: null });
        try {
            // Path matches your backend base URL configuration structure
            const response = await axiosClient.get<StudentEnrolledResponse[]>(`/enrollment/${studentId}/enrolled`);
            set({ classrooms: response.data, isLoading: false });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to load registered classrooms.",
                isLoading: false,
            });
        }
    },
}));
