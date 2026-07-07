import { create } from "zustand";
import type { CourseResponse } from "../features/courses/services/CourseResponse";
import { courseApi } from "../features/courses/services/courseApi";

interface CourseState {
    courses: CourseResponse[];
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
            const data = await courseApi.getAll();
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
