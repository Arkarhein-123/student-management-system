import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "@/store/useCourseStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Calendar, Clock, MapPin, GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";

export default function StudentCourseDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 1. Get student identity from auth state
    const { user } = useAuthStore();
    const studentId = (user as any)?.id || 16;

    const { currentCourse, loadingDetails, detailsError, fetchCourseDetails } = useCourseStore();

    // 2. Track the actively selected batch for registration
    const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            fetchCourseDetails(Number(id), studentId);
        }
    }, [id, studentId, fetchCourseDetails]);

    // Auto-select first batch when details finish loading
    useEffect(() => {
        if (currentCourse?.batches && currentCourse.batches.length > 0) {
            setSelectedBatchId(currentCourse.batches[0].id);
        }
    }, [currentCourse]);

    // Unified Action Handler for the primary button
    const handleCourseAction = () => {
        if (!selectedBatchId || !id || !currentCourse) return;

        const activeBatch = currentCourse.batches.find((b) => b.id === selectedBatchId) || currentCourse.batches[0];
        if (!activeBatch) return;

        // Route conditionally based on enrollment status
        if (activeBatch.studentEnrollmentStatus === "Not Enrolled") {
            // Redirect to the payment submission page, passing state along
            navigate(`/student/payment`, {
                state: {
                    courseId: Number(id),
                    batchId: selectedBatchId,
                    courseName: currentCourse.courseName,
                    fees: currentCourse.fees,
                    batchCode: activeBatch.batchCode,
                },
            });
        } else if (activeBatch.studentEnrollmentStatus === "APPROVED") {
            // Redirect to active classroom workspace
            navigate(`/student/enrolled/${selectedBatchId}`);
        }
    };

    // SAFETY GUARD 1: Render loading spinner while fetching
    if (loadingDetails) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // SAFETY GUARD 2: Handle errors or missing course state
    if (detailsError || !currentCourse) {
        return (
            <div className="max-w-md mx-auto my-12 text-center space-y-4">
                <p className="text-sm text-rose-600 font-semibold">{detailsError || "Course not found."}</p>
                <button
                    onClick={() => navigate("/student")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 underline cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>
        );
    }

    // SAFE ZONE: Both currentCourse and currentCourse.batches are guaranteed to exist here
    const activeBatch = currentCourse.batches.find((b) => b.id === selectedBatchId) || currentCourse.batches[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <button onClick={() => navigate("/student")} className="hover:text-slate-900 cursor-pointer">
                    Dashboard
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 truncate max-w-[200px]">{currentCourse.courseName}</span>
            </nav>

            {/* Top Meta Categorization Badges */}
            {activeBatch && (
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                        {activeBatch.cohortLevel}
                    </span>
                    <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                        {activeBatch.format}
                    </span>
                    <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                        {activeBatch.batchCode}
                    </span>
                </div>
            )}

            {/* Main Column Grid Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Title, Image Hero Banner, Details Description */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            {currentCourse.courseName}
                        </h1>
                    </div>

                    {/* Core Hero Banner Graphic Frame */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                        <img
                            src={currentCourse.imageUrl}
                            alt={currentCourse.courseName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Dynamic Course Details formatted by period splits into bold bullet points */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-900">About this course</h2>
                        {currentCourse.description ? (
                            <ul className="space-y-3 list-disc pl-5 text-slate-700 text-sm leading-relaxed">
                                {currentCourse.description
                                    .split(".")
                                    .map((sentence) => sentence.trim())
                                    .filter((sentence) => sentence.length > 0)
                                    .map((sentence, index) => (
                                        <li key={index} className="font-semibold text-slate-800 tracking-wide">
                                            {sentence}.
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 text-sm">No course details are available at this time.</p>
                        )}
                    </section>

                    {/* Batch Selector Block if course has multiple sections available */}
                    {currentCourse.batches && currentCourse.batches.length > 1 && (
                        <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                Switch Available Cohort Term Sessions:
                            </label>
                            <select
                                value={selectedBatchId || ""}
                                onChange={(e) => setSelectedBatchId(Number(e.target.value))}
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 shadow-2xs focus:outline-hidden cursor-pointer"
                            >
                                {currentCourse.batches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.batchCode} — Starts {b.startDate} ({b.format})
                                    </option>
                                ))}
                            </select>
                        </section>
                    )}
                </div>

                {/* Right Column: Sticky Commercial Purchasing Pricing Grid Panel & Parameters */}
                <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 lg:sticky lg:top-6">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Fee</span>
                        <div className="text-3xl font-black text-slate-900">
                            {currentCourse.fees.toLocaleString()} <span className="text-lg font-bold">MMK</span>
                        </div>
                    </div>

                    {/* Dynamic Content Details Parameters based on active target section state */}
                    {activeBatch ? (
                        <div className="space-y-4 border-t border-slate-100 pt-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="text-xs font-semibold text-slate-700">
                                    <p className="text-slate-400 font-medium">Start Date</p>
                                    <p className="mt-0.5">{activeBatch.startDate}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="text-xs font-semibold text-slate-700">
                                    <p className="text-slate-400 font-medium">Duration & Schedule</p>
                                    <p className="mt-0.5">
                                        {currentCourse.duration} • {activeBatch.scheduleInfo}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="text-xs font-semibold text-slate-700">
                                    <p className="text-slate-400 font-medium">Format & Mentor</p>
                                    <p className="mt-0.5">
                                        {activeBatch.format} led by {activeBatch.teacherName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="text-xs font-semibold text-slate-700">
                                    <p className="text-slate-400 font-medium">Class Availability</p>
                                    <p className="mt-0.5">
                                        {activeBatch.maxSeats - activeBatch.enrolledSeats} open slots left out of{" "}
                                        {activeBatch.maxSeats}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-amber-600 font-medium">
                            No active cohorts available for scheduling currently.
                        </p>
                    )}

                    {/* Action Call Controls contextually responsive to studentEnrollmentStatus */}
                    <div className="space-y-3 pt-2">
                        {activeBatch ? (
                            <button
                                onClick={handleCourseAction}
                                disabled={
                                    activeBatch.studentEnrollmentStatus !== "Not Enrolled" &&
                                    activeBatch.studentEnrollmentStatus !== "APPROVED"
                                }
                                className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition shadow-2xs tracking-wide cursor-pointer text-center block
                                ${
                                    activeBatch.studentEnrollmentStatus === "Not Enrolled"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white animate-pulse"
                                        : activeBatch.studentEnrollmentStatus === "PENDING"
                                          ? "bg-amber-100 text-amber-800 border border-amber-200 cursor-not-allowed"
                                          : activeBatch.studentEnrollmentStatus === "APPROVED"
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                            : "bg-rose-100 text-rose-800 cursor-not-allowed"
                                }`}
                            >
                                {activeBatch.studentEnrollmentStatus === "Not Enrolled" && "Enroll Now"}
                                {activeBatch.studentEnrollmentStatus === "PENDING" && "Application Pending Approval"}
                                {activeBatch.studentEnrollmentStatus === "APPROVED" && "Enrolled (Access Workspace)"}
                                {activeBatch.studentEnrollmentStatus === "DROPPED" && "Dropped Class Track"}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full py-3 px-4 text-xs font-bold rounded-xl bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed text-center"
                            >
                                Registration Closed
                            </button>
                        )}
                    </div>

                    {activeBatch && (
                        <p className="text-[10px] text-center text-slate-400 font-medium italic">
                            Limited slots available for registration in {activeBatch.batchCode}
                        </p>
                    )}
                </aside>
            </div>
        </div>
    );
}
