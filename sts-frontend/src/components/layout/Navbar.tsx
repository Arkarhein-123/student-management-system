import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    ShieldAlert,
    UserCheck,
    User,
    LogOut,
    Award,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import logo from "@/assets/img/jdc-logo.jpg";

// 📋 Dynamic Navigation Lookup Configuration mapped to user roles
const ROLE_NAVIGATION = {
    ROLE_STUDENT: [
        { path: "/student", name: "Home Terminal", icon: LayoutDashboard },
        { path: "/student/courses", name: "Explore Catalog", icon: BookOpen },
        { path: "/student/enrolled", name: "Enrolled Courses", icon: GraduationCap },
    ],
    ROLE_TEACHER: [
        { path: "/teacher/dashboard", name: "Teacher Terminal", icon: LayoutDashboard },
        { path: "/teacher/courses", name: "Manage Courses", icon: BookOpen },
    ],
    ROLE_ADMIN: [
        { path: "/admin/dashboard", name: "Admin Console", icon: LayoutDashboard },
        { path: "/admin/users", name: "Manage Roles", icon: UserCheck },
        { path: "/admin/security", name: "System Guards", icon: ShieldAlert },
    ],
};

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);
    const userRole = useAuthStore((state) => state.userRole);
    const logout = useAuthStore((state) => state.logout);

    const activeLinks = (userRole && ROLE_NAVIGATION[userRole]) || [];
    const userInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : "US";

    return (
        <header className="sticky top-0 z-50 h-16 bg-white border-b border-slate-200/80 shadow-sm flex items-center justify-between px-6 lg:px-12 w-full">
            {/* ─── LEFT SIDE: BRAND LOGO & DYNAMIC LINKS ─── */}
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                        <img src={logo} alt="jdc logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900 uppercase">JDC Academy</span>
                </Link>

                {/* Desktop Dynamic Navigation Links (Only displays if authenticated) */}
                {isLoggedIn && activeLinks.length > 0 && (
                    <nav className="hidden md:flex items-center gap-1">
                        {activeLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium transition duration-150 ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600 font-semibold"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                )}
            </div>

            {/* ─── RIGHT SIDE: DYNAMIC ACTION ACTION PANEL ─── */}
            <div className="flex items-center gap-3">
                {!isLoggedIn ? (
                    // Anonymous Guest Interaction Controls
                    <>
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 h-9 flex items-center justify-center rounded-lg shadow-xs transition active:scale-98"
                        >
                            Join For Free
                        </Link>
                    </>
                ) : (
                    // Secure Authenticated Account Dropdown Control Trigger
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition duration-150 cursor-pointer group select-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                {userInitials}
                            </div>
                            <span className="hidden sm:inline text-sm font-medium text-slate-700">
                                {user?.name || "User Terminal"}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Profile Utility Dropdown Menu Overlays */}
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-20 origin-top-right transition animate-in fade-in slide-in-from-top-1 duration-150">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                            Logged In As:
                                        </p>
                                        <p className="text-sm font-semibold text-slate-800 truncate">
                                            {user?.name || "Active Session"}
                                        </p>
                                    </div>

                                    <div className="p-1.5 space-y-0.5">
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 h-10 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition duration-150"
                                        >
                                            <User className="w-4 h-4 text-slate-400" /> Account Details
                                        </Link>
                                        <Link
                                            to="/certificates"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 h-10 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition duration-150"
                                        >
                                            <Award className="w-4 h-4 text-slate-400" /> My Certificates
                                        </Link>
                                    </div>

                                    <div className="border-t border-slate-100 p-1.5 mt-1">
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                logout();
                                                navigate("/", { replace: true });
                                            }}
                                            className="w-full flex items-center gap-3 px-3 h-10 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition duration-150 text-left cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
