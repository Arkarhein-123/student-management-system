import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Search,
    Plus,
    Clock,
    Tag,
    Pencil,
    X,
    Sparkles,
    FolderKanban,
    Trash2,
    Loader2,
    AlertCircle,
    Upload,
} from "lucide-react";

import type { Course, CourseCreateRequest } from "@/types";
import { courseSchema, type CourseFormData } from "../schemas/courseSchema";
import { courseApi } from "../services/courseApi";
import { uploadCourseBanner } from "@/utils/supabaseStorage";

// Fixed categories matching the Student Course page filter
const CATEGORIES = ["ALL", "Frontend","Backend","Fullstack","UI/UX", "Data Science"] as const;

// Categories for form creation/edit (excludes "ALL")
const FORM_CATEGORIES = CATEGORIES.filter((cat) => cat !== "ALL");

export const AdminManageCoursePage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Image Upload State
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
    });

    // 1. Fetch Courses
    const fetchCourses = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const data = await courseApi.getAllCourses();
            setCourses(data);
        } catch (error: any) {
            setErrorMessage("Failed to load courses. Please check connection.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // 2. Open Modal (Create / Edit)
    const handleOpenModal = (course?: Course) => {
        setImageFile(null);
        if (course) {
            setEditingCourse(course);
            setImagePreview(course.imageUrl || null);
            reset({
                courseName: course.courseName,
                category: course.category,
                duration: course.duration,
                fees: course.fees,
                imageUrl: course.imageUrl,
                description: course.description,
            });
        } else {
            setEditingCourse(null);
            setImagePreview(null);
            reset({
                courseName: "",
                category: FORM_CATEGORIES[0],
                duration: "",
                fees: 0,
                imageUrl: "",
                description: "",
            });
        }
        setIsModalOpen(true);
    };

    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 3. Form Submission
    const onSubmit = async (data: CourseFormData) => {
        try {
            let finalImageUrl = data.imageUrl || "";

            // Upload banner image to Supabase 'course_banner' bucket if selected
            if (imageFile) {
                setIsUploading(true);
                try {
                    finalImageUrl = await uploadCourseBanner(imageFile);
                } catch (uploadError: any) {
                    alert(`Supabase Upload Error: ${uploadError.message}`);
                    return;
                } finally {
                    setIsUploading(false);
                }
            }

            if (!finalImageUrl) {
                alert("Please upload a course image banner.");
                return;
            }

            const payload: CourseCreateRequest = {
                ...data,
                imageUrl: finalImageUrl,
            };

            if (editingCourse) {
                const updated = await courseApi.updateCourse(editingCourse.id, payload);
                setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? updated : c)));
            } else {
                const created = await courseApi.createCourse(payload);
                setCourses((prev) => [created, ...prev]);
            }
            setIsModalOpen(false);
        } catch (error: any) {
            alert(error.response?.data?.message || "Operation failed.");
        }
    };

    // 4. Delete Course
    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            await courseApi.deleteCourse(id);
            setCourses((prev) => prev.filter((c) => c.id !== id));
        } catch (error: any) {
            alert(error.response?.data?.message || "Cannot delete course while active batches are linked to it.");
        }
    };

    // Filter Logic
    const filteredCourses = courses.filter((course) => {
        const matchesCategory = selectedCategory === "ALL" || course.category === selectedCategory;
        const matchesSearch =
            course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                        <FolderKanban className="w-4 h-4" />
                        <span>Course Management</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Master Course Blueprints</h1>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition shadow-xs cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create New Course
                </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                selectedCategory === cat
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading Grid */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <span className="text-sm font-medium">Loading course templates...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
                        >
                            <div>
                                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={course.imageUrl}
                                        alt={course.courseName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                                        <Tag className="w-3 h-3 text-indigo-600" />
                                        {course.category}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold font-mono shadow-xs">
                                        ${Number(course.fees).toFixed(2)}
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition">
                                            {course.courseName}
                                        </h3>
                                        {course.isAvailable && (
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 rounded-full shrink-0">
                                                Active Batches
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                    <span>{course.duration}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOpenModal(course)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl transition shadow-2xs cursor-pointer"
                                    >
                                        <Pencil className="w-3 h-3 text-slate-400" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id, course.courseName)}
                                        className="p-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl transition shadow-2xs cursor-pointer"
                                        title="Delete Template"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                {editingCourse ? "Edit Course Blueprint" : "Create Course Blueprint"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                    Course Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    {...register("courseName")}
                                    type="text"
                                    placeholder="e.g. Full-Stack Web Development"
                                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                                {errors.courseName && (
                                    <p className="text-xs text-rose-500 mt-1">{errors.courseName.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Category Dropdown */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                        Category <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        {...register("category")}
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                                    >
                                        {FORM_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.category.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                        Duration <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        {...register("duration")}
                                        type="text"
                                        placeholder="e.g. 12 Weeks"
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    />
                                    {errors.duration && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.duration.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                        Fees ($) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        {...register("fees", {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        step="0.01"
                                        placeholder="299.99"
                                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                                    />
                                    {errors.fees && <p className="text-xs text-rose-500 mt-1">{errors.fees.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                        Course Banner <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="course-image-upload"
                                        />
                                        <label
                                            htmlFor="course-image-upload"
                                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition"
                                        >
                                            <span className="truncate">
                                                {imageFile
                                                    ? imageFile.name
                                                    : editingCourse?.imageUrl
                                                      ? "Change banner..."
                                                      : "Choose banner file..."}
                                            </span>
                                            <Upload className="w-4 h-4 text-slate-400 shrink-0" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {imagePreview && (
                                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                                    Description <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="Enter course overview details..."
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                />
                                {errors.description && (
                                    <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isUploading}
                                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
                                >
                                    {(isSubmitting || isUploading) && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    {editingCourse ? "Save Changes" : "Create Blueprint"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManageCoursePage;
