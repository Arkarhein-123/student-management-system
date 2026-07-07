import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput"; // 🎯 Your reusable component path

const registerSchema = z
    .object({
        fullName: z.string().min(2, "Full name must be at least 2 characters"),
        email: z.string().min(1, "Email is required").email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        console.log("Registration Form Submitted Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md border border-slate-200/80 bg-white shadow-lg rounded-2xl">
                <CardHeader className="space-y-1.5 text-center pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Get Started</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Create an academic account to trace program modules.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* OAuth2 Panel */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs h-10 flex items-center justify-center gap-2"
                            onClick={() => console.log("Registering via Google OAuth2...")}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.67 14.94 1 12 1 7.35 1 3.39 3.66 1.41 7.55l3.78 2.93C6.1 7.54 8.81 5.04 12 5.04z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-1.99 3.74-4.92 3.74-8.55z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.19 14.62c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.41 7.1C.51 8.91 0 10.9 0 13s.51 4.09 1.41 5.9l3.78-2.93z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.69-2.87c-1.03.69-2.34 1.1-4.27 1.1-3.19 0-5.9-2.5-6.81-5.44L1.41 18.81C3.39 20.34 7.35 23 12 23z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs h-10 flex items-center justify-center gap-2"
                            onClick={() => console.log("Registering via GitHub OAuth2...")}
                        >
                            <svg className="h-4 w-4 fill-slate-800" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    <div className="relative flex items-center justify-center text-xs uppercase tracking-wider text-slate-400">
                        <div className="absolute w-full border-t border-slate-100"></div>
                        <span className="relative bg-white px-3 z-10 font-medium">Or complete a basic profile</span>
                    </div>

                    {/* Registration Fields using Custom Input */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.fullName}
                            {...register("fullName")}
                        />

                        <FormInput
                            label="Email Address"
                            type="email"
                            placeholder="name@domain.com"
                            error={errors.email}
                            {...register("email")}
                        />

                        <FormInput
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password}
                            {...register("password")}
                        />

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            {...register("confirmPassword")}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm h-10 shadow-sm shadow-blue-500/10 rounded-md transition duration-150 mt-2 cursor-pointer"
                        >
                            {isSubmitting ? "Creating Profile..." : "Register Account"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t border-slate-50 bg-slate-50/50 p-4 rounded-b-2xl">
                    <p className="text-xs text-slate-500">
                        Already have an Account?{" "}
                        <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
