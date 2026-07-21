import axiosClient from "@/config/axiosClient";
import type { ClassroomDetailResponse } from "@/types";

export const classroomApi = {
    getClassroomByBatchId: async (batchId: number): Promise<ClassroomDetailResponse> => {
        const response = await axiosClient.get<ClassroomDetailResponse>(`/classrooms/batch/${batchId}`);
        return response.data;
    },
};
