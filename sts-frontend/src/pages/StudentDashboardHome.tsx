import CourseCatalog from "@/features/courses/components/CourseCatalog";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseStore } from "@/store/useCourseStore";
import type { Course } from "@/types";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudentDashboardHome() {
    const { user } = useAuthStore();
    const username = user?.name || "Anonymous User";

    const { courses, loading, error, fetchCourses } = useCourseStore();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] px-4">
                <div className="max-w-md w-full bg-white border border-rose-100 rounded-2xl p-6 shadow-xs text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">Failed to load catalog</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{error}</p>
                    </div>
                    <button
                        onClick={fetchCourses}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    Welcome, {username} <span className="animate-bounce">👋</span>
                </h1>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide font-bold">
                        Active
                    </span>
                    <span>| {courses.length} Active Tracks Available</span>
                </div>
            </div>

            <CourseCatalog courses={courses} />
        </div>
    );
}
