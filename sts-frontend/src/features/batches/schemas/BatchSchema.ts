import { z } from "zod";

export const batchSchema = z.object({
    courseId: z.number({ message: "Please select a course" }).min(1, "Please select a course"),
    teacherId: z.number({ message: "Please select a teacher" }).min(1, "Please select a teacher"),
    batchCode: z.string().min(3, "Batch code must be at least 3 characters long"),
    startDate: z.string().min(1, "Start date is required"),
    scheduleInfo: z.string().min(1, "Schedule info is required"),
    format: z.string().min(1, "Format is required"),
    cohortLevel: z.string().min(1, "Cohort level is required"),
    maxSeats: z.number({ message: "Max seats is required" }).min(1, "Max seats must be at least 1"),
});

export type BatchFormData = z.infer<typeof batchSchema>;

export interface AdminBatchResponse {
    id: number;
    batchCode: string;
    startDate: string;
    scheduleInfo: string;
    format: string;
    cohortLevel: string;
    maxSeats: number;
    enrolledSeats: number;
    courseId: number;
    courseName: string;
    teacherId: number;
    teacherName: string;
}
