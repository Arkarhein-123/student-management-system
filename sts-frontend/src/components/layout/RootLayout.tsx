// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "./Footer";
import AdminSidebar from "./AdminSidebar";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
    const userRole = useAuthStore((state) => state.userRole);
    const isAdmin = userRole === "ROLE_ADMIN";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
            {/* Shared Top Navbar */}
            <Navbar />

            {isAdmin ? (
                /* Admin Layout: Left Sidebar + Main Content */
                <div className="flex flex-1">
                    <AdminSidebar />
                    <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            ) : (
                /* Student / Guest Layout: Full-Width Body + Footer */
                <>
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
}
