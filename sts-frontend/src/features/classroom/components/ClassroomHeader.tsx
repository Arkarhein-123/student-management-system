import type { ClassroomDetailResponse } from "@/types";
import { Calendar, Clock, User, Sparkles } from "lucide-react";

interface ClassroomHeaderProps {
    data: ClassroomDetailResponse;
}

export default function ClassroomHeader({ data }: ClassroomHeaderProps) {
    return (
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                    <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                        {data.batchCode} • {data.format}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">{data.courseTitle}</h1>
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-bold rounded-full">
                    {data.cohortLevel}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>
                        Instructor: <strong className="text-white">{data.teacherName}</strong>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{data.scheduleInfo}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Start Date: {data.startDate}</span>
                </div>
            </div>
        </div>
    );
}
