import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, GraduationCap, User, LogOut } from "lucide-react";

export default function StudentDashboardLayout() {
    const location = useLocation();

    // 📋 Clean, streamlined workspace tracking links (Profile is removed from here)
    const navigationLinks = [
        { path: "/student", name: "Overview Panel", icon: LayoutDashboard },
        { path: "/student/courses", name: "Explore Catalog", icon: BookOpen },
        { path: "/student/enrolled", name: "Enrolled Tracks", icon: GraduationCap },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased">
            {/*  Left-Hand Workspace Sidebar */}
            <aside className="w-64 bg-slate-950 text-slate-200 flex flex-col justify-between border-r border-slate-800">
                <div className="p-6">
                    <span className="text-xl font-black tracking-tight text-white block pb-6 border-b border-slate-800">
                        JDC Workspace
                    </span>
                    <nav className="mt-6 space-y-1">
                        {navigationLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium transition duration-150 ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Left Sidebar Footer: Strict App Exit Control only */}
                <div className="p-4 border-t border-slate-900 bg-slate-950/50">
                    <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 h-11 text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive rounded-lg transition duration-150"
                    >
                        <LogOut className="w-4 h-4" /> Exit Terminal
                    </Link>
                </div>
            </aside>

            {/* 🖥️ Main System Viewport Container */}
            <div className="flex-1 flex flex-col">
                {/* Top Action Navigation Bar */}
                <header className="h-16 bg-white border-b border-slate-200/80 shadow-sm flex items-center justify-between px-8">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border">
                        🎓 Candidate Sandbox Terminal
                    </span>

                    {/* 👤 Top-Right User Profile Action Corner */}
                    <Link
                        to="/profile"
                        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition duration-150 group cursor-pointer ${
                            location.pathname === "/profile"
                                ? "bg-blue-50 border-blue-200 text-blue-600"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                        {/* Avatar Badge circle */}
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            ST
                        </div>
                        <span className="hidden sm:inline">My Profile</span>
                        <User className="w-4 h-4 opacity-60" />
                    </Link>
                </header>

                {/* Layout Viewport Panel */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
