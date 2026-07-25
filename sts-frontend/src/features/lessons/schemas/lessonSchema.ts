import { z } from "zod";

// Response Schema & Type
export const lessonResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    moduleName: z.string(),
    recordingUrl: z.string().nullable().optional(),
    materialUrl: z.string().nullable().optional(),
    publishDate: z.string(), // YYYY-MM-DD
});

export type LessonResponse = z.infer<typeof lessonResponseSchema>;

// Create Request Schema
export const lessonCreateSchema = z.object({
    batchId: z.number({ message: "Batch selection is required" }),
    title: z.string().min(1, "Title is required").max(100, "Title must not exceed 100 characters"),
    moduleName: z.string().min(1, "Module name is required").max(100, "Module name must not exceed 100 characters"),
    recordingUrl: z.string().url("Invalid URL format").or(z.literal("")).optional(),
    materialUrl: z.string().url("Invalid URL format").or(z.literal("")).optional(),
    publishDate: z.string().min(1, "Publish date is required"),
});

export type LessonCreateRequest = z.infer<typeof lessonCreateSchema>;

// Update Request Schema (DRY: Omits batchId from createSchema)
export const lessonUpdateSchema = lessonCreateSchema.omit({ batchId: true });

export type LessonUpdateRequest = z.infer<typeof lessonUpdateSchema>;
