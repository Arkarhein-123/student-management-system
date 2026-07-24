import React, { useState } from "react";
import {
    Search,
    Bell,
    ChevronDown,
    Briefcase,
    PieChart,
    Calendar,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    ArrowRight,
    TrendingUp,
    Server,
    Activity,
    Clock,
} from "lucide-react";

// --- Types & Interfaces ---
interface RecentActivity {
    id: string;
    user: string;
    role: string;
    action: string;
    timestamp: string;
    status: "success" | "warning" | "error";
}

interface SystemMetric {
    name: string;
    value: number;
    statusText: string;
    color: string;
}

// --- Mock Data ---
const DUMMY_ROLE_DISTRIBUTION = [
    { role: "Students", count: 1180, percentage: 94.5, color: "bg-emerald-500" },
    { role: "Teachers", count: 42, percentage: 3.4, color: "bg-blue-500" },
    { role: "Admins", count: 26, percentage: 2.1, color: "bg-purple-500" },
];

const DUMMY_ACTIVITIES: RecentActivity[] = [
    {
        id: "1",
        user: "Sarah Jenkins",
        role: "ROLE_TEACHER",
        action: "Created new course module 'Advanced Mathematics'",
        timestamp: "5 mins ago",
        status: "success",
    },
    {
        id: "2",
        user: "Michael Scott",
        role: "ROLE_STUDENT",
        action: "Failed login attempt (Incorrect password x3)",
        timestamp: "12 mins ago",
        status: "warning",
    },
    {
        id: "3",
        user: "Admin System",
        role: "ROLE_ADMIN",
        action: "Updated role permissions for 'ROLE_TEACHER'",
        timestamp: "1 hour ago",
        status: "success",
    },
    {
        id: "4",
        user: "David Miller",
        role: "ROLE_STUDENT",
        action: "Account suspended due to policy violation",
        timestamp: "2 hours ago",
        status: "error",
    },
    {
        id: "5",
        user: "Elena Rostova",
        role: "ROLE_TEACHER",
        action: "Uploaded new assignment resources",
        timestamp: "3 hours ago",
        status: "success",
    },
];

const DUMMY_METRICS: SystemMetric[] = [
    { name: "CPU Utilization", value: 38, statusText: "Normal Load", color: "bg-indigo-500" },
    { name: "Database Connections", value: 64, statusText: "128 / 200 Pool", color: "bg-blue-500" },
    { name: "Memory Usage", value: 82, statusText: "High Memory", color: "bg-amber-500" },
];

export const AdminDashboardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-4">
            {/* Pastel Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Course Progress Card (Pastel Yellow) */}
                <div className="bg-[#FFF886] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Course Progress</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">75%</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            <ArrowUpRight className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            12%
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">22 out of 64 classes</span>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer">
                            See Details
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* 2. Attendance Rate Card (Pastel Pink) */}
                <div className="bg-[#FFE0E2] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Attendance Rate</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">92%</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            <ArrowDownRight className="w-3 h-3 text-rose-500 fill-rose-500" />
                            02%
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">Based on total student</span>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer">
                            See Details
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* 3. Assignments Card (Pastel Lavender) */}
                <div className="bg-[#EFE8FF] p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-900" />
                            <span className="text-sm font-bold text-slate-900">Assignments</span>
                        </div>
                        <button className="p-1.5 bg-white/50 hover:bg-white/80 rounded-full transition cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">64%</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-xs">
                            <ArrowUpRight className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            18%
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-slate-700">Based on recent task</span>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold text-slate-800 rounded-full shadow-xs hover:bg-slate-50 transition cursor-pointer">
                            See Details
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle Grid: Role Breakdown & System Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Role Distribution */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-indigo-600" />
                            Role Distribution
                        </h2>
                        <span className="text-xs font-medium text-slate-400">Total: 1,248</span>
                    </div>

                    <p className="text-xs text-slate-500">Overview of registered accounts by assigned role.</p>

                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        {DUMMY_ROLE_DISTRIBUTION.map((item, idx) => (
                            <div
                                key={idx}
                                style={{ width: `${item.percentage}%` }}
                                className={`${item.color} h-full`}
                                title={`${item.role}: ${item.count}`}
                            />
                        ))}
                    </div>

                    <div className="space-y-2.5 pt-2">
                        {DUMMY_ROLE_DISTRIBUTION.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                                    <span className="font-medium text-slate-700">{item.role}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-slate-500">{item.count}</span>
                                    <span className="font-semibold text-slate-800 w-12 text-right">
                                        {item.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Metrics */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <Server className="w-4 h-4 text-indigo-600" />
                            System Health & Metrics
                        </h2>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            All Services Operational
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {DUMMY_METRICS.map((metric, idx) => (
                            <div key={idx} className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-600">{metric.name}</span>
                                    <span className="text-xs font-mono font-bold text-slate-800">{metric.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${metric.color} transition-all duration-500`}
                                        style={{ width: `${metric.value}%` }}
                                    />
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium block">
                                    {metric.statusText}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Security Audit Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-indigo-600" />
                            Recent Activity Logs
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">Real-time view of platform actions.</p>
                    </div>
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        View Audit Logs &rarr;
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">User</th>
                                <th className="py-3.5 px-6">Role</th>
                                <th className="py-3.5 px-6">Action / Event</th>
                                <th className="py-3.5 px-6 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {DUMMY_ACTIVITIES.map((activity) => (
                                <tr key={activity.id} className="hover:bg-slate-50/60 transition">
                                    <td className="py-4 px-6 font-semibold text-slate-800">{activity.user}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                                                activity.role === "ROLE_ADMIN"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : activity.role === "ROLE_TEACHER"
                                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}
                                        >
                                            {activity.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    activity.status === "success"
                                                        ? "bg-emerald-500"
                                                        : activity.status === "warning"
                                                          ? "bg-amber-500"
                                                          : "bg-rose-500"
                                                }`}
                                            />
                                            {activity.action}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right text-slate-400 text-xs font-mono">
                                        <div className="inline-flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-slate-300" />
                                            {activity.timestamp}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
