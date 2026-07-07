import { Outlet, Link } from "react-router-dom";
import logo from "@/assets/img/jdc-logo.jpg";

export default function GuestLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
            {/* 🌐 Public Header Navigation Bar */}
            <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-50 px-6 lg:px-12 flex items-center justify-between shadow-xs">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                        <img src={logo} alt="jdc logo" />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900 uppercase">JDC Academy</span>
                </Link>

                <div className="flex items-center gap-3">
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
                </div>
            </header>

            {/* Content Display Area */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
