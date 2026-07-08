import { useNavigate } from "react-router-dom";
import z from "zod"

const registerSchema = z.object({
    name: z.string().min(8, "Full Name must be at least 8 character").max(150, "Name can't exceed 150 characters."),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Provide a valid email format")
        .max(150, "Email cannot exceed 150 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password cannot exceed 255 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {

    const navigate = useNavigate();

  return (
    <div>
      
    </div>
  )
}
