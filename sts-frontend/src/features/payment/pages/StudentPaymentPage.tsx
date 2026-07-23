import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCourseStore } from "@/store/useCourseStore";
import { useAuthStore } from "@/store/useAuthStore";
import { uploadReceiptImage } from "@/utils/supabaseStorage";
import { Copy, UploadCloud, CheckCircle, Shield, Clock, HeartHandshake, ArrowLeft } from "lucide-react";
import { paymentApi } from "../services/paymentApi";

export default function StudentPaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Fallback if accessed without router state
    const paymentState = location.state as {
        courseId: number;
        batchId: number;
        courseName: string;
        fees: number;
        batchCode: string;
    } | null;

    const { user } = useAuthStore();
    const studentId = (user as any)?.id || 16;
    const { fetchCourseDetails } = useCourseStore();

    // Form states
    const [remarks, setRemarks] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!paymentState) {
        return (
            <div className="max-w-md mx-auto my-12 text-center space-y-4">
                <p className="text-sm text-rose-600 font-semibold">No active payment context found.</p>
                <button
                    onClick={() => navigate("/student")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 underline cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                </button>
            </div>
        );
    }

    const { courseId, batchId, courseName, fees, batchCode } = paymentState;

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!selectedFile) {
            alert("Please upload your payment screenshot to proceed.");
            return;
        }

        try {
            setIsSubmitting(true);

            // 1. Upload receipt to Supabase "payment-image" bucket
            const slipImageUrl = await uploadReceiptImage(selectedFile, "payment-image");

            // 2. Delegate submission to paymentApi service
            await paymentApi.submitPayment({
                batchId,
                remarks: remarks.trim() || undefined,
                slipImageUrl,
            });

            // 3. Refresh course details in store & redirect back to course view
            await fetchCourseDetails(courseId, studentId);
            navigate(`/student/courses/${courseId}`);
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || "Failed to submit payment request.";
            setErrorMessage(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <button onClick={() => navigate("/student")} className="hover:text-slate-900 cursor-pointer">
                    Dashboard
                </button>
                <span>/</span>
                <button
                    onClick={() => navigate(`/student/courses/${courseId}`)}
                    className="hover:text-slate-900 cursor-pointer"
                >
                    Enrollment
                </button>
                <span>/</span>
                <span className="text-slate-900">Payment</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Course Enrollment Payment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Course Invoice Meta & Transfer Methods */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Invoice Panel */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/20 border border-slate-200 rounded-2xl p-6 space-y-6 shadow-2xs">
                        <div className="space-y-2">
                            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                                Current Enrollment
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{courseName}</h3>
                            <p className="text-xs text-slate-500 font-medium">Batch Code: {batchCode}</p>
                        </div>

                        <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">Total Enrollment Fee</span>
                            <span className="text-xl font-black text-blue-600">{fees.toLocaleString()} MMK</span>
                        </div>
                    </div>

                    {/* Transfer Details Panel */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">Payment Methods</h4>

                        <div className="space-y-3">
                            {/* Bank 1 */}
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-800">KBZ Bank</span>
                                        <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.2 rounded-sm">
                                            Transfer
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-semibold">JDC Academy Co., Ltd.</p>
                                    <p className="text-[11px] text-slate-500 font-mono font-medium">
                                        123-456-7890123456
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy("123-456-7890123456", "kbz")}
                                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                >
                                    {copiedId === "kbz" ? (
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Bank 2 */}
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-800">CB Bank</span>
                                        <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.2 rounded-sm">
                                            Transfer
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-semibold">JDC Academy</p>
                                    <p className="text-[11px] text-slate-500 font-mono font-medium">
                                        987-654-3210987654
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy("987-654-3210987654", "cb")}
                                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                >
                                    {copiedId === "cb" ? (
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Online Payment */}
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-800">Online Payment</span>
                                        <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.2 rounded-sm">
                                            International
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-semibold">PayPal</p>
                                    <p className="text-[11px] text-slate-500 font-mono font-medium">
                                        payments@jdcacademy.com
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy("payments@jdcacademy.com", "paypal")}
                                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                >
                                    {copiedId === "paypal" ? (
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Submission Form */}
                <div className="lg:col-span-2 space-y-6">
                    <form
                        onSubmit={handleFormSubmit}
                        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs"
                    >
                        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Payment Submission Form
                        </h2>

                        {errorMessage && (
                            <div className="p-3 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                                {errorMessage}
                            </div>
                        )}

                        {/* Additional Remarks Field */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Remarks / Notes (Optional)
                            </label>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Any additional information about your payment transaction..."
                                className="w-full min-h-[100px] p-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-slate-50/50 resize-y"
                            />
                        </div>

                        {/* File Upload Field */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Payment Transaction Proof (Screenshot) <span className="text-rose-500">*</span>
                            </label>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition hover:bg-slate-50/50 ${
                                    selectedFile ? "border-emerald-300 bg-emerald-50/10" : "border-slate-200"
                                }`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/gif"
                                    className="hidden"
                                />

                                <UploadCloud
                                    className={`w-10 h-10 ${selectedFile ? "text-emerald-500" : "text-slate-400"}`}
                                />

                                <div className="text-center space-y-1">
                                    <p className="text-sm font-bold text-slate-800">
                                        {selectedFile ? selectedFile.name : "Click to upload"}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {selectedFile
                                            ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                                            : "PNG, JPG or GIF"}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 italic">
                                Please attach your transaction success screenshot (Max size: 20MB allowed)
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => navigate(`/student/courses/${courseId}`)}
                                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition text-center"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto sm:ml-auto px-8 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-2xs cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Uploading & Submitting..." : "Submit Payment"}
                            </button>
                        </div>
                    </form>

                    {/* Visual Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                            <div className="text-xs font-bold text-slate-700">
                                <p>Secure Transaction</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-center gap-3">
                            <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                            <div className="text-xs font-bold text-slate-700">
                                <p>24/7 Verification</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-center gap-3">
                            <HeartHandshake className="w-5 h-5 text-blue-500 shrink-0" />
                            <div className="text-xs font-bold text-slate-700">
                                <p>Priority Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
