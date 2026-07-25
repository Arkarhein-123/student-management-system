import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, GraduationCap, User, LogOut, Award, ChevronDown, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import logo from "@/assets/img/jdc-logo.jpg";
import Register from "@/features/auth/components/Register";
import Login from "@/features/auth/components/Login";

const ROLE_NAVIGATION: Record<string, Array<{ path: string; name: string; icon: any }>> = {
    ROLE_STUDENT: [
        { path: "/student", name: "Home Terminal", icon: LayoutDashboard },
        { path: "/student/enrolled", name: "Registered Classrooms", icon: GraduationCap },
    ],
    ROLE_TEACHER: [{ path: "/teacher", name: "Teacher Terminal", icon: LayoutDashboard }],
};

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Modal state: null | "login" | "register"
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);
    const userRole = useAuthStore((state) => state.userRole);
    const logout = useAuthStore((state) => state.logout);

    const activeLinks = (userRole && ROLE_NAVIGATION[userRole]) || [];
    const userInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : "US";

    const getHomeRoute = () => {
        if (!isLoggedIn || !userRole) return "/";
        if (userRole === "ROLE_STUDENT") return "/student";
        if (userRole === "ROLE_TEACHER") return "/teacher";
        if (userRole === "ROLE_ADMIN") return "/admin";
        return "/";
    };

    return (
        <>
            <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200/80 shadow-2xs flex items-center justify-between px-6 lg:px-12 w-full">
                {/* ─── LEFT SIDE: BRAND LOGO & DYNAMIC LINKS ─── */}
                <div className="flex items-center gap-8">
                    <Link to={getHomeRoute()} className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                            <img src={logo} alt="JDC Academy Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-lg font-black tracking-tight text-slate-900 uppercase">JDC Academy</span>
                    </Link>

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

                {/* ─── RIGHT SIDE: DYNAMIC ACTION PANEL ─── */}
                <div className="flex items-center gap-3">
                    {!isLoggedIn ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setAuthModal("login")}
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg transition cursor-pointer"
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setAuthModal("register")}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 h-9 flex items-center justify-center rounded-lg shadow-2xs transition active:scale-98 cursor-pointer"
                            >
                                Join For Free
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition duration-150 cursor-pointer group select-none"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                                    {userInitials}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-slate-700">
                                    {user?.name || "User Terminal"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-20 origin-top-right transition animate-in fade-in slide-in-from-top-1 duration-150">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                Logged In As
                                            </p>
                                            <p className="text-sm font-semibold text-slate-800 truncate">
                                                {user?.name || "Active Session"}
                                            </p>
                                            {userRole && (
                                                <span className="inline-block mt-1 text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">
                                                    {userRole.replace("ROLE_", "")}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-1.5 space-y-0.5">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 h-10 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition duration-150"
                                            >
                                                <User className="w-4 h-4 text-slate-400" /> Account Details
                                            </Link>

                                            {userRole === "ROLE_STUDENT" && (
                                                <Link
                                                    to="/certificates"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-3 h-10 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition duration-150"
                                                >
                                                    <Award className="w-4 h-4 text-slate-400" /> My Certificates
                                                </Link>
                                            )}
                                        </div>

                                        <div className="border-t border-slate-100 p-1.5 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    logout();
                                                    navigate("/", { replace: true });
                                                }}
                                                className="w-full flex items-center gap-3 px-3 h-10 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition duration-150 text-left cursor-pointer"
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

            {authModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setAuthModal(null)}
                                className="absolute right-4 top-4 z-10 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {authModal === "login" ? (
                                <Login
                                    onClose={() => setAuthModal(null)}
                                    onSwitchToRegister={() => setAuthModal("register")}
                                />
                            ) : (
                                <Register
                                    onClose={() => setAuthModal(null)}
                                    onSwitchToLogin={() => setAuthModal("login")}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
