import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    role: z.enum(["ROLE_STUDENT", "ROLE_TEACHER", "ROLE_ADMIN"], {
        message: "Role is required",
    }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
