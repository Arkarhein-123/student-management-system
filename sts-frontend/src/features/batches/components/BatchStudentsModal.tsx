import React, { useEffect, useState } from "react";
import { X, Search, Users, Loader2, Calendar, Mail, UserCheck } from "lucide-react";
import { batchApi } from "../services/BatchApi";
import type { AdminBatchResponse } from "../schemas/BatchSchema";
import type { BatchStudentResponse } from "@/types";

interface BatchStudentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    batch: AdminBatchResponse | null;
}

export const BatchStudentsModal: React.FC<BatchStudentsModalProps> = ({ isOpen, onClose, batch }) => {
    const [students, setStudents] = useState<BatchStudentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (isOpen && batch) {
            fetchStudents();
        } else {
            setStudents([]);
            setSearchQuery("");
        }
    }, [isOpen, batch]);

    const fetchStudents = async () => {
        if (!batch) return;
        setIsLoading(true);
        try {
            const data = await batchApi.getBatchStudents(batch.id);
            setStudents(data);
        } catch (error) {
            console.error("Failed to load enrolled students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !batch) return null;

    // Filters out non-approved students and applies search filter
    const filteredStudents = students.filter((s) => {
        const status = s.enrollmentStatus?.toUpperCase();
        const isApproved = status === "APPROVED" || status === "ENROLLED";
        const matchesSearch =
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase());

        return isApproved && matchesSearch;
    });

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                                <Users className="w-3.5 h-3.5" />
                                {batch.batchCode}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                                ({filteredStudents.length} / {batch.maxSeats} Approved)
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mt-1">
                            Enrolled Students &mdash; {batch.courseName}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sub-header / Search */}
                <div className="p-4 border-b border-slate-100 bg-white shrink-0">
                    <div className="relative w-full">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filter approved students by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                </div>

                {/* Content Table / Loading State */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex h-48 items-center justify-center">
                            <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                            <p className="text-sm font-semibold text-slate-700">No approved students found</p>
                            <p className="text-xs text-slate-400 mt-1">
                                {searchQuery
                                    ? "No approved students match your search filter."
                                    : "There are no approved students in this batch yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead>
                                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="pb-3 px-2">Student</th>
                                        <th className="pb-3 px-2">Enrollment Date</th>
                                        <th className="pb-3 px-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.studentId} className="hover:bg-slate-50/50 transition">
                                            <td className="py-3 px-2">
                                                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                                                    <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                                                    {student.name}
                                                </div>
                                                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <Mail className="w-3 h-3" />
                                                    {student.email}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-xs font-medium text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {formatDate(student.enrollmentDate)}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
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

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-end shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-xl transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BatchStudentsModal;
