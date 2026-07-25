import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2, Video, FileText, Calendar, BookOpen, Layers } from "lucide-react";
import {
    lessonCreateSchema,
    lessonUpdateSchema,
    type LessonCreateRequest,
    type LessonResponse,
    type LessonUpdateRequest,
} from "../schemas/lessonSchema";

interface LessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LessonCreateRequest | LessonUpdateRequest) => Promise<void>;
    selectedBatchId: number;
    editingLesson?: LessonResponse | null;
    isLoading?: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    selectedBatchId,
    editingLesson,
    isLoading = false,
}) => {
    const activeSchema = editingLesson ? lessonUpdateSchema : lessonCreateSchema;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(activeSchema),
        defaultValues: {
            batchId: selectedBatchId,
            title: "",
            moduleName: "",
            recordingUrl: "",
            materialUrl: "",
            publishDate: new Date().toISOString().split("T")[0],
        },
    });

    useEffect(() => {
        if (editingLesson) {
            reset({
                title: editingLesson.title,
                moduleName: editingLesson.moduleName,
                recordingUrl: editingLesson.recordingUrl || "",
                materialUrl: editingLesson.materialUrl || "",
                publishDate: editingLesson.publishDate,
            });
        } else {
            reset({
                batchId: selectedBatchId,
                title: "",
                moduleName: "",
                recordingUrl: "",
                materialUrl: "",
                publishDate: new Date().toISOString().split("T")[0],
            });
        }
    }, [editingLesson, selectedBatchId, reset]);

    if (!isOpen) return null;

    return (
        /* Added py-10 for top/bottom padding and overflow-y-auto for backdrop scrolling */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 py-10 overflow-y-auto">
            {/* Added max-h-[90vh] flex flex-col to keep modal balanced */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header (Sticky top) */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {editingLesson ? "Edit Lesson / Attach Recording" : "Add New Lesson"}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {editingLesson
                                ? "Update curriculum details or material resources."
                                : "Add session details and resources to this batch."}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body (Scrollable area) */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto flex-1">
                    {!editingLesson && <input type="hidden" {...register("batchId", { valueAsNumber: true })} />}

                    {/* Module Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-indigo-600" />
                            Module Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Module 1: Spring Security Basics"
                            {...register("moduleName")}
                            className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.moduleName && (
                            <p className="text-[11px] text-red-500">{errors.moduleName.message as string}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                            Lesson Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. JWT Token Authentication Flow"
                            {...register("title")}
                            className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.title && <p className="text-[11px] text-red-500">{errors.title.message as string}</p>}
                    </div>

                    {/* Publish Date */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                            Publish Date
                        </label>
                        <input
                            type="date"
                            {...register("publishDate")}
                            className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.publishDate && (
                            <p className="text-[11px] text-red-500">{errors.publishDate.message as string}</p>
                        )}
                    </div>

                    {/* Recording URL */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5 text-blue-600" />
                            Video Recording URL (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="https://vimeo.com/... or Google Drive URL"
                            {...register("recordingUrl")}
                            className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.recordingUrl && (
                            <p className="text-[11px] text-red-500">{errors.recordingUrl.message as string}</p>
                        )}
                    </div>

                    {/* Material URL */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-purple-600" />
                            Course Material URL (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="https://github.com/... or PDF Link"
                            {...register("materialUrl")}
                            className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.materialUrl && (
                            <p className="text-[11px] text-red-500">{errors.materialUrl.message as string}</p>
                        )}
                    </div>

                    {/* Footer Actions (Sticky bottom) */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            {editingLesson ? "Save Changes" : "Create Lesson"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
