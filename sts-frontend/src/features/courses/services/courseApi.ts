import axiosClient from "@/config/axiosClient";
import type { Course, CourseDetails } from "@/types";

export const courseApi = {
    getAllCourses: async (): Promise<Course[]> => {
        const response = await axiosClient.get("/courses/get-courses");
        return response.data;
    },

    getCourseDetails: async (courseId: number, studentId: number): Promise<CourseDetails> => {
        const response = await axiosClient.get(`/courses/${courseId}/details`, {
            params: { studentId },
        });
        return response.data;
    },
};
