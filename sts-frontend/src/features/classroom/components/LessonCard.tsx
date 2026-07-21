import type { Lesson } from "@/types";
import { Video, FolderGit2, Calendar, ExternalLink } from "lucide-react"; 

interface LessonCardProps {
    lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
    return (
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
            <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{lesson.title}</h4>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Published: {lesson.publishDate}
                </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {lesson.recordingUrl && (
                    <a
                        href={lesson.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        <Video className="w-3.5 h-3.5" />
                        Recording
                        <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                )}

                {lesson.materialUrl && (
                    <a
                        href={lesson.materialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        Materials
                        <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                )}

                {!lesson.recordingUrl && !lesson.materialUrl && (
                    <span className="text-xs text-slate-400 font-medium italic px-2">No links attached</span>
                )}
            </div>
        </div>
    );
}
