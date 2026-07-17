import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

// Define TypeScript structures for our registered classrooms
interface EnrolledClassroom {
    id: number;
    batchId: number;
    batchCode: string;
    courseName: string;
    imageUrl: string;
    progressPercent: number;
}

export default function StudentEnrolledTracksPage() {
    const navigate = useNavigate();
    const [classrooms, setClassrooms] = useState<EnrolledClassroom[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulating an API fetch for enrolled/active courses.
        // Replace this with your store or direct axios backend call later.
        const mockEnrolledClassrooms: EnrolledClassroom[] = [
            {
                id: 1,
                batchId: 104,
                batchCode: "RX-104",
                courseName: "Full-Stack React Store Blueprint",
                imageUrl:
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",

                progressPercent: 45,
            },
            {
                id: 2,
                batchId: 92,
                batchCode: "DES-092",
                courseName: "Modern UI/UX Design Professional",
                imageUrl:
                    "https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&w=600&q=80",

                progressPercent: 82,
            },
            {
                id: 3,
                batchId: 405,
                batchCode: "PY-405",
                courseName: "Backend Architecture with Python",
                imageUrl:
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",

                progressPercent: 12,
            },
        ];

        setTimeout(() => {
            setClassrooms(mockEnrolledClassrooms);
            setLoading(false);
        }, 500);
    }, []);

    const handleResumeCourse = (batchId: number) => {
        navigate(`/student/classroom/${batchId}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                        <GraduationCap className="w-6 h-6" />
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Your Registered Classrooms
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                        Manage and track your active educational paths and learning progress.
                    </p>
                </div>
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Current Status: Active
                    </span>
                </div>
            </div>

            {/* Enrolled Courses Grid */}
            {classrooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classrooms.map((classroom) => (
                        <div
                            key={classroom.id}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
                        >
                            {/* Graphic Frame with Status Badge */}
                            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                                <img
                                    src={classroom.imageUrl}
                                    alt={classroom.courseName}
                                    className="w-full h-full object-cover"
                                />
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

                                {/* Progress Indicator */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-slate-400">Course Progress</span>
                                        <span className="text-blue-600">{classroom.progressPercent}% Complete</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                            style={{ width: `${classroom.progressPercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Dynamic Navigation Action */}
                                <button
                                    onClick={() => handleResumeCourse(classroom.batchId)}
                                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition duration-150 shadow-2xs tracking-wide cursor-pointer text-center"
                                >
                                    [Resume Lecture Course &rarr;]
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-2">
                    <p className="text-slate-800 font-bold">No active enrollments found.</p>
                    <p className="text-xs text-slate-500">
                        Explore our catalog to sign up for classes and begin learning.
                    </p>
                </div>
            )}
        </div>
    );
}
