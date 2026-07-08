import axiosClient from "../../../config/axiosClient";

export interface CourseResponse {
    id: number;
    courseName: string;
    description: string;
    duration: string;
    fees: number;
}

export const courseApi = {
    getAll: async (): Promise<CourseResponse[]> => {
        const response = await axiosClient.get("/courses/get-courses");
        return response.data;
    },
};
