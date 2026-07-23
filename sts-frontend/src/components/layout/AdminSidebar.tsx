import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, GraduationCap, UserCheck, ShieldAlert, Sparkles } from "lucide-react";

const ADMIN_NAVIGATION = [
    { path: "/admin", name: "Admin Dashboard", icon: LayoutDashboard },
    { path: "/admin/courses", name: "Course Templates", icon: BookOpen },
    { path: "/admin/batches", name: "Live Batches", icon: GraduationCap },
    { path: "/admin/enrollments", name: "Enrollment Desk", icon: UserCheck },
    { path: "/admin/users", name: "User Access Matrix", icon: ShieldAlert },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <aside className="sticky top-16 w-64 bg-white border-r border-slate-200/80 h-[calc(100vh-4rem)] flex flex-col shrink-0 select-none overflow-y-auto">
            {/* Sidebar Section Header */}
            <div className="px-5 pt-6 pb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400/90 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Management Terminal
                </p>
            </div>

            {/* Navigation Menu */}
            <nav className="p-3 space-y-1.5 flex-1">
                {ADMIN_NAVIGATION.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive
                                    ? "bg-blue-50/80 text-blue-700 font-bold border-l-4 border-blue-600 rounded-l-xs shadow-2xs"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            <Icon
                                className={`w-4.5 h-4.5 transition-colors duration-200 ${
                                    isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span className="tracking-tight">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Modern Footnote / System Status Card */}
            <div className="p-3 m-3 mt-auto">
                <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">System Context</span>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">Cryptographically signed active session</p>
                </div>
            </div>
        </aside>
    );
}
