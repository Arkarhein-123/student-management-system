import { z } from "zod";

export const courseSchema = z.object({
    courseName: z
        .string()
        .min(3, "Course name must be at least 3 characters")
        .max(150, "Course name cannot exceed 150 characters"),
    category: z.string().min(1, "Category is required").max(50, "Category cannot exceed 50 characters"),
    duration: z.string().min(1, "Duration is required").max(50, "Duration cannot exceed 50 characters"),
    fees: z.number().gt(0, "Fees must be greater than 0"),
    imageUrl: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export type CourseFormData = z.infer<typeof courseSchema>;
