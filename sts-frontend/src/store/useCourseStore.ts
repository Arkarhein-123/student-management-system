import { create } from "zustand";
import { courseApi } from "../features/courses/services/courseApi";
import type { Course } from "@/types";

interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    loading: true,
    error: null,

    fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
            const data = await courseApi.getAllCourses();
            set({ courses: data, loading: false, error: null });
        } catch (e: unknown) {
            if (e instanceof Error) {
                set({
                    error: e.message,
                    loading: false,
                });
            } else {
                set({
                    error: "Failed to retrieve courses",
                    loading: false,
                });
            }
        }
    },
}));
