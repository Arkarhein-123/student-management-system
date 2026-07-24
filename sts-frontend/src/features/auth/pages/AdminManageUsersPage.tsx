import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserFormValues } from "../schemas/userSchema";
import { UserPlus, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import type { UserResponse } from "@/types/user";
import { adminApi } from "../service/adminApi";
import type { UserRole } from "@/store/useAuthStore";
import FormInput from "@/components/layout/FormInput";

export const AdminManageUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("ALL");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "ROLE_STUDENT",
        },
    });

    const fetchUsers = useCallback(async (roleFilter?: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const data = await adminApi.getUsers(roleFilter);
            setUsers(data);
        } catch (err: unknown) {
            console.error("Failed to load users:", err);
            setApiError("Failed to fetch users. Please check your backend connections.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(selectedRoleFilter);
    }, [selectedRoleFilter, fetchUsers]);

    const handleRoleChange = async (userId: number, newRole: UserRole) => {
        try {
            const updatedUser = await adminApi.updateUserRole(userId, newRole);
            setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: updatedUser.role } : u)));
        } catch (err) {
            console.error("Failed to update user role:", err);
        }
    };

    const onSubmitCreateUser = async (data: CreateUserFormValues) => {
        try {
            setApiError(null);
            await adminApi.createUser(data);
            reset();
            setIsModalOpen(false);
            fetchUsers(selectedRoleFilter);
        } catch (err: unknown) {
            console.error("Failed to create user:", err);
            setApiError("Error provisioning user. Name or Email might already be taken.");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans text-slate-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
                    <p className="text-sm text-slate-500">Manage user accounts, roles, and provisioning.</p>
                </div>
                <button
                    onClick={() => {
                        setApiError(null);
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                    <UserPlus size={18} />
                    Create New User
                </button>
            </div>

            {apiError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {apiError}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Filter Role:</span>
                    <select
                        value={selectedRoleFilter}
                        onChange={(e) => setSelectedRoleFilter(e.target.value)}
                        className="border border-slate-200 rounded-md px-3 py-1.5 text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_TEACHER">Teacher</option>
                        <option value="ROLE_STUDENT">Student</option>
                    </select>
                </div>

                <button
                    onClick={() => fetchUsers(selectedRoleFilter)}
                    className="p-2 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
                    title="Refresh Data"
                >
                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* User Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-8 text-slate-400">
                                    {isLoading ? "Loading users..." : "No users found."}
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 font-mono text-xs text-slate-500">#{user.id}</td>
                                    <td className="p-4 font-medium text-slate-900">{user.name}</td>
                                    <td className="p-4 text-slate-600">{user.email}</td>
                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                            className={`text-xs font-semibold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                                                user.role === "ROLE_ADMIN"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : user.role === "ROLE_TEACHER"
                                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}
                                        >
                                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                            <option value="ROLE_TEACHER">ROLE_TEACHER</option>
                                            <option value="ROLE_STUDENT">ROLE_STUDENT</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1 text-xs">
                                            {user.isActive ? (
                                                <>
                                                    <CheckCircle size={14} className="text-emerald-500" />
                                                    <span className="text-emerald-700 font-medium">Active</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={14} className="text-slate-400" />
                                                    <span className="text-slate-500">Inactive</span>
                                                </>
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Provisioning Modal using FormInput */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Provision New User</h2>

                        <form onSubmit={handleSubmit(onSubmitCreateUser)} className="space-y-4">
                            <FormInput
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                error={errors.name}
                                {...register("name")}
                            />

                            <FormInput
                                label="Email Address"
                                type="email"
                                placeholder="e.g. john@jdc.org"
                                error={errors.email}
                                {...register("email")}
                            />

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                    Role
                                </label>
                                <select
                                    {...register("role")}
                                    className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-150"
                                >
                                    <option value="ROLE_STUDENT">Student</option>
                                    <option value="ROLE_TEACHER">Teacher</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                                {errors.role && (
                                    <p className="text-xs font-medium text-red-600 mt-0.5">{errors.role.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
