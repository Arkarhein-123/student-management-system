import axiosClient from "@/config/axiosClient";
import type { LessonCreateRequest, LessonResponse, LessonUpdateRequest } from "../schemas/lessonSchema";

export const lessonApi = {
    // Fetch lessons for a specific batch
    getLessonsByBatch: async (batchId: number): Promise<LessonResponse[]> => {
        const response = await axiosClient.get<LessonResponse[]>(`/lessons/batch/${batchId}`);
        return response.data;
    },

    // Create a new lesson
    createLesson: async (data: LessonCreateRequest): Promise<LessonResponse> => {
        const response = await axiosClient.post<LessonResponse>("/lessons", data);
        return response.data;
    },

    // Update an existing lesson or attach video/material URLs
    updateLesson: async (id: number, data: LessonUpdateRequest): Promise<LessonResponse> => {
        const response = await axiosClient.put<LessonResponse>(`/lessons/${id}`, data);
        return response.data;
    },

    // Delete a lesson
    deleteLesson: async (id: number): Promise<void> => {
        await axiosClient.delete(`/lessons/${id}`);
    },
};
