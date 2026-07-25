import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Users,
    Calendar,
    Video,
    FileText,
    Plus,
    Search,
    Loader2,
    ChevronDown,
    AlertCircle,
    Pencil,
    Trash2,
} from "lucide-react";

// Types & Schemas
import type { BatchDetails, BatchStudentResponse } from "@/types";
import type { LessonCreateRequest, LessonResponse, LessonUpdateRequest } from "@/features/lessons/schemas/lessonSchema";

// Services & Store
import { batchApi } from "@/features/batches/services/BatchApi";
import { lessonApi } from "@/features/lessons/services/lessonApi";
import { LessonModal } from "@/features/lessons/modals/LessonModal";
import { useAuthStore } from "@/store/useAuthStore";

// Helper function to safely format Java LocalDateTime (Array or ISO String)
const formatDate = (dateValue?: string | number[] | null): string => {
    if (!dateValue) return "N/A";

    try {
        if (Array.isArray(dateValue)) {
            const [year, month, day] = dateValue;
            const d = new Date(year, month - 1, day);
            return d.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }

        const parsedDate = new Date(dateValue);
        if (isNaN(parsedDate.getTime())) return String(dateValue);

        return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "Invalid Date";
    }
};

export const TeacherDashboardHome: React.FC = () => {
    const { user } = useAuthStore();

    // Teacher Batches State
    const [batches, setBatches] = useState<BatchDetails[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<BatchDetails | null>(null);
    const [isBatchesLoading, setIsBatchesLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<"lessons" | "members">("lessons");

    // Lessons State
    const [lessons, setLessons] = useState<LessonResponse[]>([]);
    const [isLessonsLoading, setIsLessonsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModuleFilter, setSelectedModuleFilter] = useState("ALL");

    // Students / Roster State
    const [students, setStudents] = useState<BatchStudentResponse[]>([]);
    const [isStudentsLoading, setIsStudentsLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<LessonResponse | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Fetch Batches specifically assigned to this logged-in Teacher
    useEffect(() => {
        const fetchTeacherBatches = async () => {
            if (!user?.id) return;

            try {
                setIsBatchesLoading(true);
                const data = await batchApi.getBatchesByUserId(user.id);
                setBatches(data);
                if (data.length > 0) {
                    setSelectedBatch(data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch teacher batches:", error);
            } finally {
                setIsBatchesLoading(false);
            }
        };

        fetchTeacherBatches();
    }, [user?.id]);

    // 2. Fetch Lessons whenever selectedBatch changes
    const loadLessons = async (batchId: number) => {
        setIsLessonsLoading(true);
        try {
            const data = await lessonApi.getLessonsByBatch(batchId);
            setLessons(data);
        } catch (error) {
            console.error("Failed to load lessons:", error);
        } finally {
            setIsLessonsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedBatch) {
            loadLessons(selectedBatch.id);
        }
    }, [selectedBatch]);

    // 3. Fetch Batch Students whenever selectedBatch or activeTab changes to members
    useEffect(() => {
        const fetchStudents = async () => {
            if (!selectedBatch || activeTab !== "members") return;

            setIsStudentsLoading(true);
            try {
                const data = await batchApi.getBatchStudents(selectedBatch.id);
                setStudents(data);
            } catch (error) {
                console.error("Failed to load batch students:", error);
            } finally {
                setIsStudentsLoading(false);
            }
        };

        fetchStudents();
    }, [selectedBatch, activeTab]);

    // Handle Create / Update Lesson
    const handleFormSubmit = async (formData: LessonCreateRequest | LessonUpdateRequest) => {
        if (!selectedBatch) return;

        setIsSubmitting(true);
        try {
            if (editingLesson) {
                await lessonApi.updateLesson(editingLesson.id, formData as LessonUpdateRequest);
            } else {
                await lessonApi.createLesson(formData as LessonCreateRequest);
            }
            setIsModalOpen(false);
            setEditingLesson(null);
            await loadLessons(selectedBatch.id);
        } catch (error) {
            console.error("Failed to save lesson:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Delete Lesson
    const handleDeleteLesson = async (id: number) => {
        if (!selectedBatch) return;

        if (confirm("Are you sure you want to delete this lesson?")) {
            try {
                await lessonApi.deleteLesson(id);
                await loadLessons(selectedBatch.id);
            } catch (error) {
                console.error("Failed to delete lesson:", error);
            }
        }
    };

    // Filter lessons based on search and module filters
    const filteredLessons = lessons.filter((lesson) => {
        const matchesSearch =
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.moduleName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesModule = selectedModuleFilter === "ALL" || lesson.moduleName === selectedModuleFilter;
        return matchesSearch && matchesModule;
    });

    const uniqueModules = Array.from(new Set(lessons.map((l) => l.moduleName)));

    const groupedLessons = filteredLessons.reduce(
        (acc, lesson) => {
            acc[lesson.moduleName] = acc[lesson.moduleName] || [];
            acc[lesson.moduleName].push(lesson);
            return acc;
        },
        {} as Record<string, LessonResponse[]>,
    );

    if (isBatchesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (batches.length === 0) {
        return (
            <div className="p-8 max-w-7xl mx-auto text-center py-20 bg-white rounded-3xl border border-slate-200/80 mt-10">
                <h2 className="text-xl font-bold text-slate-800">No Batches Assigned</h2>
                <p className="text-xs text-slate-500 mt-2">
                    You aren't currently assigned as an instructor to any active batches.
                </p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50">
            {/* Header & Dynamic Batch Selector */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teacher Workspace</h1>

                <div className="mt-3 relative inline-block">
                    <div className="flex items-center gap-3 bg-white border border-slate-200 shadow-xs px-4 py-2.5 rounded-2xl">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <select
                            value={selectedBatch?.id}
                            onChange={(e) => {
                                const found = batches.find((b) => b.id === Number(e.target.value));
                                if (found) setSelectedBatch(found);
                            }}
                            className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer pr-6 appearance-none"
                        >
                            {batches.map((b) => (
                                <option key={b.id} value={b.id}>
                                    🎓 Batch: {b.batchCode} {b.scheduleInfo ? `— ${b.scheduleInfo}` : ""}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Stats Cards mapped to BatchDetails fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#FFF886] p-6 rounded-3xl shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-slate-900">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Total Lessons</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">{lessons.length}</span>
                        <span className="text-xs font-semibold text-slate-700">Published</span>
                    </div>
                </div>

                <div className="bg-[#FFE0E2] p-6 rounded-3xl shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Batch Seats</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-900 font-mono">
                            {selectedBatch?.enrolledSeats ?? 0}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                            / {selectedBatch?.maxSeats ?? 0} Enrolled
                        </span>
                    </div>
                </div>

                <div className="bg-[#EFE8FF] p-6 rounded-3xl shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Format & Level</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-lg font-extrabold text-slate-900 font-mono uppercase">
                            {selectedBatch?.format ?? "N/A"}
                        </span>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded-full uppercase">
                            {selectedBatch?.cohortLevel ?? "Cohort"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs & Action Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("lessons")}
                        className={`text-sm font-bold pb-1 transition border-b-2 cursor-pointer ${
                            activeTab === "lessons"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        🎬 Lessons & Materials
                    </button>
                    <button
                        onClick={() => setActiveTab("members")}
                        className={`text-sm font-bold pb-1 transition border-b-2 cursor-pointer ${
                            activeTab === "members"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        👥 Batch Roster / Members
                    </button>
                </div>

                {activeTab === "lessons" && selectedBatch && (
                    <button
                        onClick={() => {
                            setEditingLesson(null);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Lesson
                    </button>
                )}
            </div>

            {/* TAB 1: LESSONS & MATERIALS */}
            {activeTab === "lessons" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative w-full sm:w-96">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search lessons..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
                            />
                        </div>

                        <select
                            value={selectedModuleFilter}
                            onChange={(e) => setSelectedModuleFilter(e.target.value)}
                            className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none shadow-xs cursor-pointer"
                        >
                            <option value="ALL">All Modules</option>
                            {uniqueModules.map((mod, idx) => (
                                <option key={idx} value={mod}>
                                    {mod}
                                </option>
                            ))}
                        </select>
                    </div>

                    {isLessonsLoading ? (
                        <div className="py-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        </div>
                    ) : Object.keys(groupedLessons).length === 0 ? (
                        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80">
                            <p className="text-xs text-slate-500 font-medium">
                                No lessons found for this batch. Click "+ Add New Lesson" to create one.
                            </p>
                        </div>
                    ) : (
                        Object.entries(groupedLessons).map(([moduleName, moduleLessons]) => (
                            <div key={moduleName} className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-2">
                                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                    {moduleName}
                                </h3>

                                <div className="space-y-3">
                                    {moduleLessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 font-mono shrink-0">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800">{lesson.title}</h4>
                                                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3 text-slate-400" />
                                                        Published {formatDate(lesson.publishDate)}
                                                    </p>

                                                    {!lesson.recordingUrl && (
                                                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded-md text-[10px] font-semibold">
                                                            <AlertCircle className="w-3 h-3" />
                                                            Missing Record Link
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                {lesson.recordingUrl && (
                                                    <a
                                                        href={lesson.recordingUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold transition"
                                                    >
                                                        <Video className="w-3.5 h-3.5" />
                                                        Watch Recording
                                                    </a>
                                                )}

                                                {lesson.materialUrl && (
                                                    <a
                                                        href={lesson.materialUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" />
                                                        Course Materials
                                                    </a>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        setEditingLesson(lesson);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                        !lesson.recordingUrl
                                                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                                    }`}
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    {!lesson.recordingUrl ? "+ Add Recording URL" : "Edit"}
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteLesson(lesson.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                                                    title="Delete Lesson"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB 2: BATCH ROSTER */}
            {activeTab === "members" && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-600" />
                            Enrolled Students ({students.length})
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Student roster for Batch Code: <strong>{selectedBatch?.batchCode}</strong>
                        </p>
                    </div>

                    {isStudentsLoading ? (
                        <div className="py-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-xs text-slate-500">No students enrolled in this batch yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="pb-3 pl-2">Student Name</th>
                                        <th className="pb-3">Email Address</th>
                                        <th className="pb-3">Enrolled Date</th>
                                        <th className="pb-3 text-right pr-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                                    {students.map((student) => (
                                        <tr key={student.studentId} className="hover:bg-slate-50/50 transition">
                                            <td className="py-3.5 pl-2 font-bold text-slate-900 flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                {student.name}
                                            </td>
                                            <td className="py-3.5 text-slate-600">{student.email}</td>
                                            <td className="py-3.5 text-slate-500 font-mono">
                                                {formatDate(student.enrollmentDate)}
                                            </td>
                                            <td className="py-3.5 text-right pr-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        student.enrollmentStatus === "APPROVED"
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                            : student.enrollmentStatus === "PENDING"
                                                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                              : "bg-red-50 text-red-700 border border-red-200"
                                                    }`}
                                                >
                                                    {student.enrollmentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {selectedBatch && (
                <LessonModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingLesson(null);
                    }}
                    onSubmit={handleFormSubmit}
                    selectedBatchId={selectedBatch.id}
                    editingLesson={editingLesson}
                    isLoading={isSubmitting}
                />
            )}
        </div>
    );
};

export default TeacherDashboardHome;
