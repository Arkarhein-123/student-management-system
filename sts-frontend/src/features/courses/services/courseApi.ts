import axiosClient from "@/config/axiosClient";
import type { Course } from "@/types";

export const courseApi = {
    getAllCourses: async (): Promise<Course[]> => {
        const response = await axiosClient.get("/courses/get-courses");
        return response.data;
    },
};
