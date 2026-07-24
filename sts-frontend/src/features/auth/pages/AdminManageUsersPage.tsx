import React, { useState, useEffect } from "react";
import {
    UserPlus,
    RefreshCw,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Pencil,
    ShieldCheck,
    X,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { adminApi } from "@/features/auth/service/adminApi";
import { CreateUserModal } from "@/features/auth/components/CreateUserModal";
import { type CreateUserFormValues } from "@/features/auth/schemas/userSchema";
import type { UserResponse } from "@/types/user";

export const AdminManageUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterRole, setFilterRole] = useState<string>("ALL");
    const [globalError, setGlobalError] = useState<string | null>(null);

    // Modals & Menu State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

    // In-Flight Action Loading States (Per Item)
    const [updatingRoleId, setUpdatingRoleId] = useState<number | null>(null);
    const [togglingStatusId, setTogglingStatusId] = useState<number | null>(null);

    // Edit Form State
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setGlobalError(null);
        try {
            const data = filterRole === "ALL" ? await adminApi.getUsers() : await adminApi.getUsersByRole(filterRole);
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setGlobalError("Failed to fetch user list. Please try refreshing.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filterRole]);

    // Handle Create New User Submit
    const handleCreateUser = async (formData: CreateUserFormValues) => {
        try {
            await adminApi.createUser(formData);
            await fetchUsers();
        } catch (err: any) {
            console.error("Failed to create user:", err);
            throw err;
        }
    };

    // Handle Role Change Dropdown in Table
    const handleRoleChange = async (userId: number, newRole: string) => {
        // Find target user to get current role and name for confirmation message
        const targetUser = users.find((u) => u.id === userId);
        const currentRole = targetUser?.role || "current role";

        // If role hasn't changed, do nothing
        if (currentRole === newRole) return;

        // Show confirmation dialog
        const confirmed = window.confirm(
            `Are you sure you want to change ${targetUser?.name || "this user"}'s role from ${currentRole} to ${newRole}?`,
        );

        if (!confirmed) return;

        setUpdatingRoleId(userId);
        setGlobalError(null);
        try {
            const updatedUser = await adminApi.updateUserRole(userId, newRole);
            const updatedRole = typeof updatedUser === "string" ? updatedUser : updatedUser?.role || newRole;

            setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: updatedRole } : u)));
        } catch (err: any) {
            console.error("Failed to update user role:", err);
            setGlobalError(err.response?.data?.message || "Failed to update user role.");
        } finally {
            setUpdatingRoleId(null);
        }
    };

    // Handle Active/Inactive Status Toggle
    const handleToggleStatus = async (user: UserResponse) => {
        setActiveMenuId(null);
        setTogglingStatusId(user.id);
        setGlobalError(null);
        try {
            const updatedUser = await adminApi.toggleUserStatus(user.id, !user.isActive);
            setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isActive: updatedUser.isActive } : u)));
        } catch (err: any) {
            console.error("Failed to toggle status:", err);
            setGlobalError(err.response?.data?.message || "Failed to change user status.");
        } finally {
            setTogglingStatusId(null);
        }
    };

    // Open Edit User Modal
    const handleOpenEditModal = (user: UserResponse) => {
        setActiveMenuId(null);
        setEditingUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditPassword("");
        setEditError(null);
    };

    // Submit Edit User Details Form
    const handleUpdateUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        setIsUpdating(true);
        setEditError(null);
        try {
            const payload: { name: string; email: string; password?: string } = {
                name: editName,
                email: editEmail,
            };
            if (editPassword.trim()) {
                payload.password = editPassword.trim();
            }

            const updatedUser = await adminApi.updateUser(editingUser.id, payload);

            setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...updatedUser } : u)));
            setEditingUser(null);
        } catch (err: any) {
            console.error("Failed to update user profile:", err);
            setEditError(err.response?.data?.message || "Failed to update user information.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            {/* Backdrop for active 3-dot dropdown menu */}
            {activeMenuId !== null && (
                <div className="fixed inset-0 z-10 bg-transparent" onClick={() => setActiveMenuId(null)} />
            )}

            {/* Global Error Banner */}
            {globalError && (
                <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl animate-in fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
                    <span className="flex-1 font-medium">{globalError}</span>
                    <button
                        onClick={() => setGlobalError(null)}
                        className="text-rose-400 hover:text-rose-600 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage user accounts, roles, and provisioning.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition shadow-sm cursor-pointer"
                >
                    <UserPlus className="w-4 h-4" />
                    Create New User
                </button>
            </div>

            {/* Filter and Refresh Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filter Role:</span>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ROLE_STUDENT">Students</option>
                        <option value="ROLE_TEACHER">Teachers</option>
                        <option value="ROLE_ADMIN">Admins</option>
                    </select>
                </div>

                <button
                    onClick={fetchUsers}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                    title="Refresh Table"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {/* Main Users Table */}
            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">ID</th>
                                <th className="py-3.5 px-6">Name</th>
                                <th className="py-3.5 px-6">Email</th>
                                <th className="py-3.5 px-6">Role</th>
                                <th className="py-3.5 px-6 text-right">Status & Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-400">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Loading users matrix...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-400">
                                        No users found for this filter.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">#{user.id}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-800">{user.name}</td>
                                        <td className="py-4 px-6 text-slate-600">{user.email}</td>

                                        {/* Role Dropdown */}
                                        <td className="py-4 px-6">
                                            <div className="inline-flex items-center gap-2">
                                                <select
                                                    value={user.role}
                                                    disabled={updatingRoleId === user.id}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-semibold border focus:outline-none focus:ring-1 ${
                                                        user.role === "ROLE_ADMIN"
                                                            ? "bg-purple-50 text-purple-700 border-purple-200"
                                                            : user.role === "ROLE_TEACHER"
                                                              ? "bg-blue-50 text-blue-700 border-blue-200"
                                                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    }`}
                                                >
                                                    <option value="ROLE_STUDENT">ROLE_STUDENT</option>
                                                    <option value="ROLE_TEACHER">ROLE_TEACHER</option>
                                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                                </select>
                                                {updatingRoleId === user.id && (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                                                )}
                                            </div>
                                        </td>

                                        {/* Status & Actions Menu */}
                                        <td className="py-4 px-6 text-right relative">
                                            <div className="inline-flex items-center gap-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                                                        user.isActive
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-rose-50 text-rose-600"
                                                    }`}
                                                >
                                                    {togglingStatusId === user.id ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : user.isActive ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <XCircle className="w-3.5 h-3.5" />
                                                    )}
                                                    {user.isActive ? "Active" : "Inactive"}
                                                </span>

                                                {/* 3-Dots Action Button */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() =>
                                                            setActiveMenuId(activeMenuId === user.id ? null : user.id)
                                                        }
                                                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {/* Actions Popover Dropdown */}
                                                    {activeMenuId === user.id && (
                                                        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20 text-left">
                                                            <button
                                                                onClick={() => handleOpenEditModal(user)}
                                                                className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                                                Edit Details
                                                            </button>
                                                            <button
                                                                onClick={() => handleToggleStatus(user)}
                                                                className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                                                                {user.isActive ? "Deactivate User" : "Activate User"}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateUser}
            />

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Edit User Details</h2>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {editError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{editError}</span>
                            </div>
                        )}

                        <form onSubmit={handleUpdateUserSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                    className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                                    New Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep unchanged"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    className="w-full px-3 h-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 h-10 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-4 h-10 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition shadow-sm cursor-pointer inline-flex items-center gap-2"
                                >
                                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
