import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus,
    Search,
    Layers,
    Calendar,
    Clock,
    Users,
    X,
    Sparkles,
    Pencil,
    Trash2,
    BookOpen,
    UserCheck,
    Loader2,
} from "lucide-react";

import { batchSchema, type BatchFormData, type AdminBatchResponse } from "../schemas/BatchSchema";
import { batchApi, type TeacherOption } from "../services/BatchApi";
import type { Course } from "@/types"; // Adjust import path if needed

export const AdminManageBatchesPage: React.FC = () => {
    const [batches, setBatches] = useState<AdminBatchResponse[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<TeacherOption[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBatchId, setEditingBatchId] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<BatchFormData>({
        resolver: zodResolver(batchSchema),
        defaultValues: {
            maxSeats: 30,
            format: "Online",
            cohortLevel: "Beginner",
        },
    });

    // Centralized fetch via batchApi
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [batchesData, coursesData, teachersData] = await Promise.all([
                batchApi.getAllBatches(),
                batchApi.getCourses(),
                batchApi.getTeachers(),
            ]);

            setBatches(batchesData);
            setCourses(coursesData);
            setTeachers(teachersData);
        } catch (error) {
            console.error("Error fetching batch management data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenModal = (batch?: AdminBatchResponse) => {
        if (batch) {
            setEditingBatchId(batch.id);
            reset({
                courseId: batch.courseId,
                teacherId: batch.teacherId,
                batchCode: batch.batchCode,
                startDate: batch.startDate,
                scheduleInfo: batch.scheduleInfo,
                format: batch.format || "Online",
                cohortLevel: batch.cohortLevel || "Beginner",
                maxSeats: batch.maxSeats,
            });
        } else {
            setEditingBatchId(null);
            reset({
                courseId: courses[0]?.id || 0,
                teacherId: teachers[0]?.id || 0,
                batchCode: "",
                startDate: new Date().toISOString().split("T")[0],
                scheduleInfo: "Mon, Wed, Fri (09:00 AM - 11:00 AM)",
                format: "Online",
                cohortLevel: "Beginner",
                maxSeats: 30,
            });
        }
        setIsModalOpen(true);
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setValue("courseId", selectedId);

        const selectedCourse = courses.find((c) => c.id === selectedId);
        if (selectedCourse && !watch("batchCode")) {
            const prefix = selectedCourse.courseName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase();
            setValue("batchCode", `${prefix}-${new Date().getFullYear()}-B1`);
        }
    };

    const onSubmit = async (data: BatchFormData) => {
        try {
            if (editingBatchId) {
                const updated = await batchApi.updateBatch(editingBatchId, data);
                setBatches((prev) => prev.map((b) => (b.id === editingBatchId ? updated : b)));
            } else {
                const created = await batchApi.createBatch(data);
                setBatches((prev) => [created, ...prev]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save batch:", error);
        }
    };

    const handleDelete = async (id: number, code: string) => {
        if (!window.confirm(`Are you sure you want to delete batch "${code}"?`)) return;

        try {
            await batchApi.deleteBatch(id);
            setBatches((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error("Failed to delete batch:", error);
        }
    };

    const filteredBatches = batches.filter(
        (b) =>
            b.batchCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                        <Layers className="w-4 h-4" />
                        <span>Cohort Management</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Batch Cohorts</h1>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create New Batch
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search batch code, course, or teacher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
            </div>

            {/* Batches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map((batch) => (
                    <div
                        key={batch.id}
                        className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200"
                    >
                        <div className="p-6 space-y-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                        <BookOpen className="w-3 h-3" />
                                        {batch.courseName}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 mt-2">{batch.batchCode}</h3>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border bg-indigo-50 text-indigo-700 border-indigo-200">
                                    {batch.cohortLevel}
                                </span>
                            </div>

                            <div className="space-y-2 text-xs text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span>
                                        Teacher: <strong className="text-slate-800">{batch.teacherName}</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span>Starts: {batch.startDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span>{batch.scheduleInfo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-semibold">Format:</span>
                                    <span>{batch.format}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                <Users className="w-4 h-4 text-slate-400" />
                                <span>
                                    {batch.enrolledSeats} / {batch.maxSeats} Enrolled
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleOpenModal(batch)}
                                    className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl transition cursor-pointer"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(batch.id, batch.batchCode)}
                                    className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl transition cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                {editingBatchId ? "Edit Batch Cohort" : "Create New Batch"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto flex-1">
                            {/* Course & Teacher Selects */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Course *</label>
                                    <select
                                        {...register("courseId", { valueAsNumber: true })}
                                        onChange={(e) => {
                                            register("courseId", { valueAsNumber: true }).onChange(e);
                                            handleCourseChange(e);
                                        }}
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value={0} disabled>
                                            Select course...
                                        </option>
                                        {courses.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.courseName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.courseId && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.courseId.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Teacher *</label>
                                    <select
                                        {...register("teacherId", { valueAsNumber: true })}
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value={0} disabled>
                                            Select teacher...
                                        </option>
                                        {teachers.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name || t.fullName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.teacherId && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.teacherId.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Batch Code & Max Seats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Batch Code *</label>
                                    <input
                                        {...register("batchCode")}
                                        type="text"
                                        placeholder="e.g. FS-2026-B1"
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                    {errors.batchCode && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.batchCode.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Seats *</label>
                                    <input
                                        {...register("maxSeats", { valueAsNumber: true })}
                                        type="number"
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                    {errors.maxSeats && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.maxSeats.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Start Date & Cohort Level Dropdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Start Date *</label>
                                    <input
                                        {...register("startDate")}
                                        type="date"
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                    {errors.startDate && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.startDate.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Cohort Level *
                                    </label>
                                    <select
                                        {...register("cohortLevel")}
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                    {errors.cohortLevel && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.cohortLevel.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Schedule Info Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Schedule Info *</label>
                                <input
                                    {...register("scheduleInfo")}
                                    type="text"
                                    placeholder="e.g. Mon, Wed, Fri (09:00 AM - 11:00 AM)"
                                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                                {errors.scheduleInfo && (
                                    <p className="text-xs text-rose-500 mt-1">{errors.scheduleInfo.message}</p>
                                )}
                            </div>

                            {/* Format Dropdown */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Format *</label>
                                <select
                                    {...register("format")}
                                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="Online">Online</option>
                                    <option value="In Person">In Person</option>
                                </select>
                                {errors.format && <p className="text-xs text-rose-500 mt-1">{errors.format.message}</p>}
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-xl hover:bg-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingBatchId ? "Update Batch" : "Create Batch"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManageBatchesPage;