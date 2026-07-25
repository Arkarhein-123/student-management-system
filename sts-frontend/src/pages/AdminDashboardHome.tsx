import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    MoreHorizontal,
    ArrowUpRight,
    ArrowRight,
    TrendingUp,
    Users,
    BookOpen,
    Layers,
    Loader2,
    RefreshCw,
    UserCheck,
    Mail,
    Shield,
} from "lucide-react";
import type { Course } from "@/types";
import type { AdminBatchResponse } from "@/features/batches/schemas/BatchSchema";
import { batchApi, type TeacherOption } from "@/features/batches/services/BatchApi";


// --- Types & Interfaces ---
interface ActiveUserItem {
    id: number | string;
    name: string;
    email: string;
    role: "ROLE_ADMIN" | "ROLE_TEACHER" | "ROLE_STUDENT";
    status: "Active" | "Idle" | "Offline";
    lastActive: string;
}

export const AdminDashboardHome: React.FC = () => {
    const navigate = useNavigate();

    // Data States
    const [batches, setBatches] = useState<AdminBatchResponse[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<TeacherOption[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch dashboard real metrics from API
    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            const [batchesData, coursesData, teachersData] = await Promise.all([
                batchApi.getAllBatches(),
                batchApi.getCourses(),
                batchApi.getTeachers(),
            ]);

            setBatches(batchesData);
            setCourses(coursesData);
            setTeachers(teachersData);
        } catch (error) {
            console.error("Failed to load dashboard metrics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Derived Statistics
    const totalBatches = batches.length;
    const totalCourses = courses.length;
    const totalTeachers = teachers.length;

    // Sum total enrolled students across all active batches
    const totalEnrolledStudents = batches.reduce((acc, batch) => acc + (batch.enrolledSeats || 0), 0);
    const totalMaxCapacity = batches.reduce((acc, batch) => acc + (batch.maxSeats || 0), 0);
    const overallCapacityPercentage =
        totalMaxCapacity > 0 ? Math.round((totalEnrolledStudents / totalMaxCapacity) * 100) : 0;

    // Calculated Role Distribution
    const totalUsers = totalEnrolledStudents + totalTeachers + 1; // +1 for current Admin
    const roleDistribution = [
        {
            role: "Students",
            count: totalEnrolledStudents,
            percentage: totalUsers > 0 ? ((totalEnrolledStudents / totalUsers) * 100).toFixed(1) : "0",
            color: "bg-emerald-500",
        },
        {
            role: "Teachers",
            count: totalTeachers,
            percentage: totalUsers > 0 ? ((totalTeachers / totalUsers) * 100).toFixed(1) : "0",
            color: "bg-blue-500",
        },
        {
            role: "Admins",
            count: 1,
            percentage: totalUsers > 0 ? ((1 / totalUsers) * 100).toFixed(1) : "0",
            color: "bg-purple-500",
        },
    ];

    // Combine fetched teacher API data + platform admin safely
    const activeUsersList: ActiveUserItem[] = [
        {
            id: "admin-1",
            name: "System Administrator",
            email: "admin@platform.com",
            role: "ROLE_ADMIN",
            status: "Active",
            lastActive: "Now",
        },
        ...teachers.map((t) => {
            const teacherName = t.name ?? "Unknown Teacher";
            const sanitizedEmailName = teacherName.toLowerCase().replace(/\s+/g, ".");

            return {
                id: t.id,
                name: teacherName,
                email: `${sanitizedEmailName}@faculty.edu`,
                role: "ROLE_TEACHER" as const,
                status: "Active" as const,
                lastActive: "Online",
            };
        }),
    ];

    // Filter Active Users List
    const filteredUsers = activeUsersList.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.status.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
                <p className="text-xs text-slate-500 mt-1">
                    Real-time system overview, batch allocations, and active user management.
                </p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Active Cohorts / Batches Card */}
                <div className="bg-[#FFF886] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Active Cohorts</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">{totalBatches}</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            <ArrowUpRight className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            Live
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">{totalCourses} Active Courses</span>
                        <button
                            onClick={() => navigate("/admin/batches")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer"
                        >
                            Manage Batches
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Enrolled Students Card */}
                <div className="bg-[#FFE0E2] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Enrolled Students</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">
                            {totalEnrolledStudents}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            <ArrowUpRight className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            {overallCapacityPercentage}% Cap
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">Out of {totalMaxCapacity} Seats</span>
                        <button
                            onClick={() => navigate("/admin/enrollments")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer"
                        >
                            View Enrollments
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Academic Faculty Card */}
                <div className="bg-[#EFE8FF] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Academic Faculty</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">{totalTeachers}</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            Active
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">Assigned across batches</span>
                        <button
                            onClick={() => navigate("/admin/teachers")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer"
                        >
                            Teacher Directory
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Role Distribution Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        Platform User Distribution
                    </h2>
                    <span className="text-xs font-mono font-medium text-slate-400">
                        Total System Users: {totalUsers}
                    </span>
                </div>

                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    {roleDistribution.map((item, idx) => (
                        <div
                            key={idx}
                            style={{ width: `${item.percentage}%` }}
                            className={`${item.color} h-full transition-all duration-300`}
                            title={`${item.role}: ${item.count}`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {roleDistribution.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-slate-50/70 border border-slate-100 rounded-2xl text-xs"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                                <span className="font-medium text-slate-700">{item.role}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-slate-500">{item.count}</span>
                                <span className="font-bold text-slate-800 w-12 text-right">{item.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Users Table */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
                {/* Active Platform Directory Header with Search & Refresh */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-indigo-600" />
                            Active Platform Directory
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Live list of registered faculty and administrative accounts.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={loadDashboardData}
                            className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 transition cursor-pointer shadow-xs"
                            title="Refresh Data"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <div className="relative w-full sm:w-64">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search active users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">User / Name</th>
                                <th className="py-3.5 px-6">Email Contact</th>
                                <th className="py-3.5 px-6">Role</th>
                                <th className="py-3.5 px-6 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-xs text-slate-400 font-medium">
                                        No active users found matching "{searchQuery}"
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 px-6 font-semibold text-slate-800 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-indigo-600">
                                                {user.name.charAt(0)}
                                            </div>
                                            {user.name}
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 text-xs font-medium">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                    user.role === "ROLE_ADMIN"
                                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                                        : user.role === "ROLE_TEACHER"
                                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                }`}
                                            >
                                                <Shield className="w-3 h-3" />
                                                {user.role.replace("ROLE_", "")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
