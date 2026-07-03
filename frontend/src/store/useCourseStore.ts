import { create } from "zustand";
import type { CourseResponse } from "../features/courses/services/CourseResponse";
import { courseApi } from "../features/courses/services/courseApi";

interface CourseState{
    courses: CourseResponse[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => Promise<void>
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    loading: false,
    error: null,

    fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
            const data = await courseApi.getAll();
            set({ courses: data, loading: false, error: null });
        } catch (e: any) {
            set({
                error: e.response?.data?.message || "Failed to Retrieve Courses",
                loading: false,
            });
        }
    },
})); 