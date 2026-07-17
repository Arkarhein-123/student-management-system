import { create } from "zustand";
import { courseApi } from "../features/courses/services/courseApi";
import type { Course, CourseDetails } from "@/types"; // Import CourseDetails here

interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;

    // New fields for details view
    currentCourse: CourseDetails | null;
    loadingDetails: boolean;
    detailsError: string | null;

    fetchCourses: () => Promise<void>;
    // New action
    fetchCourseDetails: (courseId: number, studentId: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    loading: true,
    error: null,

    currentCourse: null,
    loadingDetails: false,
    detailsError: null,

    fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
            const data = await courseApi.getAllCourses();
            set({ courses: data, loading: false });
        } catch (e: any) {
            set({ error: e.message || "Failed to retrieve courses", loading: false });
        }
    },

    fetchCourseDetails: async (courseId: number, studentId: number) => {
        set({ loadingDetails: true, detailsError: null });
        try {
            // Assuming your service matches the endpoint: /api/v1/courses/{courseId}/details
            const data = await courseApi.getCourseDetails(courseId, studentId);
            set({ currentCourse: data, loadingDetails: false });
        } catch (e: any) {
            set({ detailsError: e.message || "Failed to load course details", loadingDetails: false });
        }
    },
}));
