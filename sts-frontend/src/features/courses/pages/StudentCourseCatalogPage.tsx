import { useEffect } from "react";
import { useCourseStore } from "../../../store/useCourseStore";
import CourseCatalogShowcase from "../components/CourseCatalogShowcase";

export default function StudentCourseCatalogPage() {
    // 🧠 Connect directly to your global application store orchestrator
    const { courses, loading, error, fetchCourses } = useCourseStore();

    useEffect(() => {
        const loadCatalogWithDelay = async () => {
            // Preserving your custom network simulation latency delay
            await new Promise((resolve) => setTimeout(resolve, 1500));
            fetchCourses();
        };
        loadCatalogWithDelay();
    }, [fetchCourses]);

    // Error UI firewall catch block
    if (error) {
        return (
            <div className="p-8 text-center text-sm font-semibold text-destructive bg-destructive/10 rounded-xl border border-destructive/20 max-w-xl mx-auto mt-12">
                System Telemetry Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full p-6">
            {/* Page Header Layout Section */}
            <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Available Programs</h1>
                <p className="text-sm text-muted-foreground">
                    Browse available courses, durations, and tuition frameworks.
                </p>
            </div>

            {/* Render Showcase and drop store parameters cleanly down the tree */}
            <CourseCatalogShowcase courses={courses} loading={loading} />
        </div>
    );
}
