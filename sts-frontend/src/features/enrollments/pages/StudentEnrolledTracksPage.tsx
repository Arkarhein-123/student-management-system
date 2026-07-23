import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, AlertCircle, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEnrolledCoursesStore } from "@/store/useEnrolledCoursesStore";

type FilterStatus = "ALL" | "APPROVED" | "PENDING" | "REJECTED";

export default function StudentRegisteredClassroomsPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<FilterStatus>("ALL");

    // Extract user state
    const { user } = useAuthStore();
    const studentId = user?.id;

    const { classrooms, isLoading, error, fetchEnrolledCourses } = useEnrolledCoursesStore();

    useEffect(() => {
        if (studentId) {
            fetchEnrolledCourses(studentId);
        }
    }, [studentId, fetchEnrolledCourses]);

    const handleCourseAction = (batchId: number, status: string) => {
        if (status !== "APPROVED") return;
        navigate(`/student/classroom/${batchId}`);
    };

    // Filter logic
    const filteredClassrooms = classrooms.filter((item) => {
        if (activeTab === "ALL") return true;
        return item.status === activeTab;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto my-12 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm">Error Loading Classrooms</h4>
                    <p className="text-xs mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                        <GraduationCap className="w-7 h-7" />
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Your Enrolled Classrooms
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                        Access your active learning workspaces and track approval requests.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200">
                    {(["ALL", "APPROVED", "PENDING", "REJECTED"] as FilterStatus[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                activeTab === tab
                                    ? "bg-white text-slate-900 shadow-xs"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            {tab === "ALL" ? "All Tracks" : tab.charAt(0) + tab.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Enrolled Courses Grid */}
            {filteredClassrooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClassrooms.map((classroom) => {
                        const isApproved = classroom.status === "APPROVED";
                        const isPending = classroom.status === "PENDING";
                        const isRejected = classroom.status === "DROPPED";

                        return (
                            <div
                                key={classroom.enrollmentId}
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
                            >
                                {/* Banner Frame & Status Badge */}
                                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                                    <img
                                        src={
                                            classroom.imageUrl ||
                                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                                        }
                                        alt={classroom.courseName}
                                        className="w-full h-full object-cover"
                                    />
                                    <span
                                        className={`absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md shadow-xs
                                        ${
                                            isApproved
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : isPending
                                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                                        }`}
                                    >
                                        {isApproved && <CheckCircle2 className="w-3 h-3" />}
                                        {isPending && <Clock className="w-3 h-3" />}
                                        {isRejected && <XCircle className="w-3 h-3" />}
                                        {classroom.status}
                                    </span>
                                </div>

                                {/* Details Panel */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                                            BATCH: {classroom.batchCode}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                                            {classroom.courseName}
                                        </h3>
                                    </div>

                                    {/* Active Progress Bar */}
                                    {isApproved && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-xs font-bold">
                                                <span className="text-slate-400">Course Progress</span>
                                                <span className="text-blue-600">
                                                    {classroom.progressPercent || 0}% Complete
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                                    style={{ width: `${classroom.progressPercent || 0}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleCourseAction(classroom.batchId, classroom.status)}
                                        disabled={!isApproved}
                                        className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition duration-150 shadow-2xs tracking-wide flex items-center justify-center gap-2
                                            ${
                                                isApproved
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            }`}
                                    >
                                        {isApproved && (
                                            <>
                                                <span>Go to Classroom Workspace</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                        {isPending && "Payment Verification Pending"}
                                        {isRejected && "Enrollment Rejected"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-2">
                    <p className="text-slate-800 font-bold">No tracks found matching this filter.</p>
                    <p className="text-xs text-slate-500">Browse the course catalog to enroll in new programs.</p>
                </div>
            )}
        </div>
    );
}
