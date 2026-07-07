import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// 🏷️ Define strict TypeScript contract parameters for input data flows
interface Course {
    id: string | number;
    courseName: string;
    duration: string;
    description: string;
    fees: number;
}

interface CourseCatalogShowcaseProps {
    courses: Course[];
    loading: boolean;
}

export default function CourseCatalogShowcase({ courses, loading }: CourseCatalogShowcaseProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [maxFee, setMaxFee] = useState<number | "">("");

    // ⚡ High-performance memoized filter system remains preserved here
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFee = maxFee === "" || course.fees <= maxFee;
            return matchesSearch && matchesFee;
        });
    }, [courses, searchTerm, maxFee]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200/60">
                    <Skeleton className="h-10 w-full bg-slate-200 rounded-md" />
                    <Skeleton className="h-10 w-full bg-slate-200 rounded-md" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((index) => (
                        <Card
                            key={index}
                            className="flex flex-col justify-between border border-slate-200/60 bg-white h-[220px]"
                        >
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-6 w-3/4 bg-slate-200" />
                                <Skeleton className="h-5 w-16 bg-slate-200 rounded" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full bg-slate-200" />
                                <Skeleton className="h-4 w-5/6 bg-slate-200" />
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t bg-slate-50/50 p-4 mt-auto">
                                <Skeleton className="h-6 w-20 bg-slate-200" />
                                <Skeleton className="h-9 w-28 bg-slate-200 rounded-md" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 🔍 Control Filter Inputs Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Search Program
                    </label>
                    <input
                        type="text"
                        placeholder="Search by course title... (e.g., Java, React)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Budget Ceiling (Max Fees)
                    </label>
                    <input
                        type="number"
                        placeholder="Filter by maximum price limit..."
                        value={maxFee}
                        onChange={(e) => setMaxFee(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150"
                    />
                </div>
            </div>

            {/* 📋 Data Rendering Grid Layer */}
            {filteredCourses.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed rounded-xl bg-white max-w-xl mx-auto mt-6">
                    <p className="text-slate-700 font-medium">No matching programs found.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Try modifying your search terms or expanding your tuition budget ceiling.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Card
                            key={course.id}
                            className="flex flex-col justify-between border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition duration-200"
                        >
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-lg font-bold text-slate-800 tracking-tight">
                                    {course.courseName}
                                </CardTitle>
                                <CardDescription className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded w-fit flex items-center gap-1">
                                    ⏱️ {course.duration}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                    {course.description}
                                </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t bg-slate-50/50 p-4 mt-auto rounded-b-xl">
                                <span className="text-lg font-extrabold text-slate-900">
                                    MMK {Number(course.fees).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 h-9 shadow-sm shadow-blue-500/10 active:scale-98 transition duration-150 cursor-pointer">
                                    Enroll Program
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
