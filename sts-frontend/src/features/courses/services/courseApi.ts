import axiosClient from "@/config/axiosClient";
import type { Course, CourseCreateRequest, CourseDetails } from "@/types";

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

    createCourse: async (data: CourseCreateRequest): Promise<Course> => {
        const response = await axiosClient.post<Course>("/courses", data);
        return response.data;
    },

    updateCourse: async (id: number, data: CourseCreateRequest): Promise<Course> => {
        const response = await axiosClient.put<Course>(`/courses/${id}`, data);
        return response.data;
    },

    deleteCourse: async (id: number): Promise<void> => {
        await axiosClient.delete(`/courses/${id}`);
    },
};
