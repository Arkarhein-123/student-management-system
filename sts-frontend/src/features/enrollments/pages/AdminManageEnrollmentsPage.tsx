import { useState, useEffect } from "react";
import {
    UserCheck,
    Search,
    CheckCircle2,
    XCircle,
    Eye,
    Clock,
    AlertCircle,
    ExternalLink,
    Loader2,
    RefreshCw,
    GraduationCap,
    X,
    Sparkles,
    ShieldCheck,
    Filter,
    RotateCcw,
} from "lucide-react";
import type { PaymentResponse, PaymentStatus, EnrollmentStatus } from "@/types/payment";
import { paymentApi } from "@/features/payment/services/paymentApi";

export default function AdminManageEnrollmentsPage() {
    const [payments, setPayments] = useState<PaymentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
    const [activeItem, setActiveItem] = useState<PaymentResponse | null>(null);

    // ─── Fetch Payments ───
    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await paymentApi.getAllPayments();
            setPayments(data);
        } catch (err: any) {
            console.error("Failed to fetch payments:", err);
            setError(err.response?.data?.message || "Failed to load payment requests from server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // ─── Status Override Handler ───
    const handleUpdateStatus = async (paymentId: number, newStatus: PaymentStatus) => {
        try {
            setIsSubmitting(true);
            const updatedPayment = await paymentApi.updatePaymentStatus(paymentId, {
                status: newStatus,
            });

            setPayments((prev) => prev.map((item) => (item.paymentId === paymentId ? updatedPayment : item)));

            // Update active item inside modal to reflect state change immediately
            setActiveItem(updatedPayment);
        } catch (err: any) {
            alert(err.response?.data?.message || `Failed to update payment status.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Filtering Logic ───
    const filteredPayments = payments.filter((item) => {
        const matchesSearch =
            item.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.batchCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.paymentId.toString().includes(searchTerm);

        const matchesStatus = selectedStatus === "ALL" || item.paymentStatus === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const pendingCount = payments.filter((e) => e.paymentStatus === "PENDING").length;
    const verifiedCount = payments.filter((e) => e.paymentStatus === "APPROVED").length;

    const renderPaymentStatusBadge = (status: PaymentStatus) => {
        switch (status) {
            case "APPROVED":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 whitespace-nowrap">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Approved
                    </span>
                );
            case "DROPPED":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 border border-rose-500/20 whitespace-nowrap">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Dropped
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 whitespace-nowrap">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        Pending
                    </span>
                );
        }
    };

    const renderEnrollmentStatusBadge = (status: EnrollmentStatus) => {
        switch (status) {
            case "APPROVED":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                        <GraduationCap className="w-3 h-3 text-blue-600" /> Active
                    </span>
                );
            case "DROPPED":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                        Dropped
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                        Unverified
                    </span>
                );
        }
    };

    return (
        <div className="p-4 space-y-4 w-full min-h-screen bg-slate-50/50">
            {/* ─── HEADER SECTION ─── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide uppercase border border-blue-100">
                        <Sparkles className="w-3 h-3" /> Operations Desk
                    </div>
                    <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <UserCheck className="w-6 h-6 text-blue-600" /> Enrollment Verification
                    </h1>
                    <p className="text-xs text-slate-500 font-normal">
                        Review student payment receipts and grant immediate classroom access.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={fetchPayments}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100/80 active:scale-95 text-slate-600 transition cursor-pointer"
                        title="Refresh Table Data"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
                    </button>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                            <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">Pending</p>
                            <p className="text-base font-black text-amber-950 leading-none">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700">
                            <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Verified</p>
                            <p className="text-base font-black text-emerald-950 leading-none">{verifiedCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── FILTERS & SEARCH BAR ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search student, batch, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl w-full sm:w-auto">
                    <div className="px-2 text-slate-400 text-xs font-semibold flex items-center gap-1 shrink-0">
                        <Filter className="w-3 h-3" /> Status:
                    </div>
                    {["ALL", "PENDING", "APPROVED", "DROPPED"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                selectedStatus === status
                                    ? "bg-white text-slate-900 shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── PAYMENTS TABLE ─── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                            Fetching verification queue...
                        </p>
                    </div>
                ) : error ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center px-4">
                        <AlertCircle className="w-10 h-10 text-rose-500" />
                        <p className="text-sm font-bold text-slate-800">{error}</p>
                        <button
                            onClick={fetchPayments}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    <th className="py-3.5 px-5">Student</th>
                                    <th className="py-3.5 px-5">Batch</th>
                                    <th className="py-3.5 px-5">Amount</th>
                                    <th className="py-3.5 px-5">Submitted</th>
                                    <th className="py-3.5 px-5">Payment</th>
                                    <th className="py-3.5 px-5">Enrollment</th>
                                    <th className="py-3.5 px-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium">
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                                            No matching payment submissions found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((item) => (
                                        <tr key={item.paymentId} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-3.5 px-5">
                                                <span className="font-mono text-[10px] text-slate-400 font-bold block">
                                                    #{item.paymentId}
                                                </span>
                                                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                                                    {item.studentName}
                                                </p>
                                            </td>

                                            <td className="py-3.5 px-5">
                                                <span className="inline-block bg-slate-100 font-mono text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded">
                                                    {item.batchCode}
                                                </span>
                                                <p className="text-slate-500 text-[11px] font-normal mt-0.5 line-clamp-1 max-w-[180px]">
                                                    {item.courseTitle}
                                                </p>
                                            </td>

                                            <td className="py-3.5 px-5 font-extrabold text-slate-900 text-xs whitespace-nowrap">
                                                {item.amount?.toLocaleString()}{" "}
                                                <span className="text-[10px] font-semibold text-slate-400">MMK</span>
                                            </td>

                                            <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap text-[11px]">
                                                {item.submittedAt
                                                    ? new Date(item.submittedAt).toLocaleDateString()
                                                    : "N/A"}
                                            </td>

                                            <td className="py-3.5 px-5">
                                                {renderPaymentStatusBadge(item.paymentStatus)}
                                            </td>

                                            <td className="py-3.5 px-5">
                                                {renderEnrollmentStatusBadge(item.enrollmentStatus)}
                                            </td>

                                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setActiveItem(item)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ─── MODAL DIALOG WITH ADMIN OVERRIDE CONTROLS ─── */}
            {activeItem && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-base font-extrabold text-slate-900">Payment Verification</h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Payment #{activeItem.paymentId} • Enrollment #{activeItem.enrollmentId}
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveItem(null)}
                                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                    <span>Uploaded Receipt Image</span>
                                    {activeItem.slipImageUrl && (
                                        <a
                                            href={activeItem.slipImageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                                        >
                                            View Original <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 max-h-64 flex items-center justify-center p-2">
                                    {activeItem.slipImageUrl ? (
                                        <img
                                            src={activeItem.slipImageUrl}
                                            alt="Payment Slip"
                                            className="object-contain max-h-60 w-full rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-slate-500 text-xs py-12">No receipt image provided</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                                <div>
                                    <p className="text-slate-400 font-medium">Student Name</p>
                                    <p className="font-bold text-slate-900 text-sm mt-0.5">{activeItem.studentName}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium">Batch</p>
                                    <p className="font-bold text-slate-900 text-sm mt-0.5">{activeItem.batchCode}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium">Total Fees</p>
                                    <p className="font-extrabold text-blue-600 text-sm mt-0.5">
                                        {activeItem.amount?.toLocaleString()} MMK
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium">Student Note</p>
                                    <p className="font-medium text-slate-700 mt-0.5 italic">
                                        {activeItem.remarks || "None"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions Footer: Super Admin Override Buttons */}
                        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <button
                                onClick={() => setActiveItem(null)}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
                            >
                                Close
                            </button>

                            <div className="flex items-center gap-2">
                                {/* Option to Reset back to PENDING */}
                                {activeItem.paymentStatus !== "PENDING" && (
                                    <button
                                        onClick={() => handleUpdateStatus(activeItem.paymentId, "PENDING")}
                                        disabled={isSubmitting}
                                        className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        Reset to Pending
                                    </button>
                                )}

                                {/* Option to Drop / Reject */}
                                {activeItem.paymentStatus !== "DROPPED" && (
                                    <button
                                        onClick={() => handleUpdateStatus(activeItem.paymentId, "DROPPED")}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-50"
                                    >
                                        Drop Enrollment
                                    </button>
                                )}

                                {/* Option to Approve */}
                                {activeItem.paymentStatus !== "APPROVED" && (
                                    <button
                                        onClick={() => handleUpdateStatus(activeItem.paymentId, "APPROVED")}
                                        disabled={isSubmitting}
                                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="w-4 h-4" />
                                        )}
                                        Approve Payment
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
