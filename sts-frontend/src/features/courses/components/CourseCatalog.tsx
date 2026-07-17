import type { Course } from "@/types";
import { useState } from "react";
import { Search, Lock, ArrowRight } from "lucide-react";

interface CourseCatalogProps {
    courses: Course[];
    onViewDetails: (courseId: number) => void;
}

export default function CourseCatalog({ courses, onViewDetails }: CourseCatalogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Frontend", "Backend", "Fullstack", "UI/UX", "Data Science"];

    const filteredCourses = courses.filter((course) => {
        const matchesCategory =
            activeCategory === "All" ||
            course.category.toLocaleLowerCase().includes(activeCategory.toLocaleLowerCase());
        const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLocaleLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Filter and search bar section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Available Classes</h3>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative min-w-[240px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search Catalog"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Catalog Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between relative ${
                            !course.isAvailable ? "opacity-90 shadow-none border-dashed" : ""
                        }`}
                    >
                        <div>
                            {/* Image Section */}
                            <div className="aspect-video w-full bg-slate-50 overflow-hidden relative border-b border-slate-100">
                                <img
                                    src={course.imageUrl}
                                    alt={course.courseName}
                                    className={`w-full h-full object-cover transition duration-300 ${
                                        !course.isAvailable ? "grayscale filter contrast-75 brightness-95" : ""
                                    }`}
                                />

                                {/* Absolute Badges Container */}
                                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                                    <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                                        {course.category}
                                    </span>

                                    {!course.isAvailable && (
                                        <span className="bg-amber-500 text-slate-950 text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md shadow-xs border border-amber-400 animate-pulse">
                                            Coming Soon ⏳
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Course Meta Content */}
                            <div className="p-5 space-y-2">
                                <h4 className="text-base font-bold text-slate-900 line-clamp-1">{course.courseName}</h4>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {course.description || "No description provided for this track."}
                                </p>
                                <div className="text-xs font-medium text-slate-400 pt-1">
                                    Duration: {course.duration}
                                </div>
                            </div>
                        </div>

                        {/* Price & Navigation Call to Action */}
                        <div className="p-5 pt-0 space-y-3">
                            <div className="text-lg font-extrabold text-blue-600">
                                {course.fees.toLocaleString()} MMK
                            </div>

                            {course.isAvailable ? (
                                <button
                                    onClick={() => onViewDetails(course.id)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 flex items-center justify-center gap-1.5 rounded-xl transition cursor-pointer shadow-xs group"
                                >
                                    Course Details
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs h-10 flex items-center justify-center gap-1.5 rounded-xl cursor-not-allowed"
                                >
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    No Active Batches
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
