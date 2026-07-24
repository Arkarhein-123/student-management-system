import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2, Copy, Check, Eye, EyeOff } from "lucide-react";
import { createUserSchema, type CreateUserFormValues } from "../schemas/userSchema";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateUserFormValues) => Promise<void>;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "ROLE_STUDENT",
        },
    });

    const currentPassword = watch("password");

    // Helper to generate a strong random password
    const handleGeneratePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let generated = "";
        for (let i = 0; i < 12; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setValue("password", generated, { shouldValidate: true });
        setShowPassword(true); // Automatically reveal so admin can review
    };

    const handleCopyPassword = () => {
        if (!currentPassword) return;
        navigator.clipboard.writeText(currentPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFormSubmit = async (data: CreateUserFormValues) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Create New User</h2>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Alex Johnson"
                            {...register("name")}
                            className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="e.g. alex@jdc.org"
                            {...register("email")}
                            className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field with Auto-Generate & Copy Controls */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                Initial Password
                            </label>
                            <button
                                type="button"
                                onClick={handleGeneratePassword}
                                className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                <Wand2 className="w-3.5 h-3.5" />
                                Auto-Generate
                            </button>
                        </div>

                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password or auto-generate"
                                {...register("password")}
                                className="w-full pl-3 pr-20 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                            />

                            <div className="absolute right-2 flex items-center gap-1">
                                {/* Copy Password Button */}
                                <button
                                    type="button"
                                    onClick={handleCopyPassword}
                                    disabled={!currentPassword}
                                    title="Copy password"
                                    className="p-1.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 rounded-md transition"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Show/Hide Password Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md transition"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                            Role Assignment
                        </label>
                        <select
                            {...register("role")}
                            className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="ROLE_STUDENT">ROLE_STUDENT</option>
                            <option value="ROLE_TEACHER">ROLE_TEACHER</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="px-4 h-10 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 h-10 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition shadow-sm"
                        >
                            {isSubmitting ? "Creating..." : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
