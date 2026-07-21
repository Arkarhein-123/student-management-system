import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ClassroomDetailResponse } from "@/types";
import { groupLessonsByModule } from "../utils/groupLessons";
import ClassroomHeader from "../components/ClassroomHeader";
import LessonCard from "../components/LessonCard";
import { BookOpen, Loader2, ArrowLeft } from "lucide-react";
import { classroomApi } from "../service/ClassroomService";

export default function ClassroomHubPage() {
    const { batchId } = useParams<{ batchId: string }>();
    const navigate = useNavigate();

    const [data, setData] = useState<ClassroomDetailResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!batchId) return;

        const fetchClassroom = async () => {
            try {
                setLoading(true);
                setError(null);
                const classroomData = await classroomApi.getClassroomByBatchId(Number(batchId));
                setData(classroomData);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load classroom materials.");
            } finally {
                setLoading(false);
            }
        };

        fetchClassroom();
    }, [batchId]);

    const groupedLessons = useMemo(() => {
        return data ? groupLessonsByModule(data.lessons) : {};
    }, [data]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-xs font-bold text-slate-500">Loading Classroom Workspace...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-md mx-auto my-12 p-6 text-center bg-red-50 border border-red-200 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-red-700">{error || "Classroom batch not found."}</p>
                <button
                    onClick={() => navigate("/student/enrolled")}
                    className="px-4 py-2 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-xl shadow-xs hover:bg-red-100 transition cursor-pointer"
                >
                    Back to Registered Classrooms
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Back Button Navigation */}
            <button
                onClick={() => navigate("/student/enrolled")} // Or your registered classrooms path
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Registered Classrooms
            </button>

            {/* Header / Meta Banner */}
            <ClassroomHeader data={data} />

            {/* Syllabus Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Modules & Syllabus
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                        {data.lessons.length} {data.lessons.length === 1 ? "Lesson" : "Lessons"}
                    </span>
                </div>

                {Object.keys(groupedLessons).length === 0 ? (
                    <div className="p-12 text-center text-slate-400 italic text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        No lessons have been published for this batch yet.
                    </div>
                ) : (
                    Object.entries(groupedLessons).map(([moduleName, lessons]) => (
                        <div
                            key={moduleName}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
                        >
                            <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                                <h4 className="font-bold text-slate-800 text-sm">{moduleName}</h4>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    {lessons.length} {lessons.length === 1 ? "topic" : "topics"}
                                </span>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {lessons.map((lesson) => (
                                    <LessonCard key={lesson.id} lesson={lesson} />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
