import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "./Footer";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
