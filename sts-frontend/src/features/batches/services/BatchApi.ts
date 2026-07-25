import axiosClient from "@/config/axiosClient";
import type { BatchFormData, AdminBatchResponse } from "@/features/batches/schemas/BatchSchema";
import type { Course } from "@/types"; // Adjust import path if needed

export interface TeacherOption {
    id: number;
    fullName?: string;
    name?: string;
    email?: string;
}

export const batchApi = {
    // GET /api/v1/batches
    getAllBatches: async (): Promise<AdminBatchResponse[]> => {
        const response = await axiosClient.get<AdminBatchResponse[]>("/batches");
        return response.data;
    },

    // GET /api/v1/batches/course/{courseId}
    getBatchesByCourse: async (courseId: number): Promise<AdminBatchResponse[]> => {
        const response = await axiosClient.get<AdminBatchResponse[]>(`/batches/course/${courseId}`);
        return response.data;
    },

    // GET /api/v1/courses/get-courses
    getCourses: async (): Promise<Course[]> => {
        const response = await axiosClient.get<Course[]>("/courses/get-courses");
        return response.data;
    },

    // GET /api/v1/admin/users/TEACHER
    getTeachers: async (): Promise<TeacherOption[]> => {    
        const response = await axiosClient.get<TeacherOption[]>("/admin/users/ROLE_TEACHER");
        return response.data;
    },

    // POST /api/v1/batches
    createBatch: async (data: BatchFormData): Promise<AdminBatchResponse> => {
        const response = await axiosClient.post<AdminBatchResponse>("/batches", data);
        return response.data;
    },

    // PUT /api/v1/batches/{batchId}
    updateBatch: async (batchId: number, data: BatchFormData): Promise<AdminBatchResponse> => {
        const response = await axiosClient.put<AdminBatchResponse>(`/batches/${batchId}`, data);
        return response.data;
    },

    // DELETE /api/v1/batches/{batchId}
    deleteBatch: async (batchId: number): Promise<void> => {
        await axiosClient.delete(`/batches/${batchId}`);
    },
};
