import axiosClient from "@/config/axiosClient";
import type { PaymentStatusUpdateRequest, PaymentResponse, PaymentSubmitRequest } from "@/types/payment";

export const paymentApi = {
    submitPayment: async (payload: PaymentSubmitRequest): Promise<PaymentResponse> => {
        const response = await axiosClient.post<PaymentResponse>("/student/payments", payload);
        return response.data;
    },

    getPaymentByEnrollmentId: async (enrollmentId: number): Promise<PaymentResponse> => {
        const response = await axiosClient.get<PaymentResponse>(`/student/payments/enrollment/${enrollmentId}`);
        return response.data;
    },

    // ─── Admin Endpoints ───
    getAllPayments: async (): Promise<PaymentResponse[]> => {
        const response = await axiosClient.get<PaymentResponse[]>("/admin/payments");
        return response.data;
    },

    updatePaymentStatus: async (paymentId: number, payload: PaymentStatusUpdateRequest): Promise<PaymentResponse> => {
        const response = await axiosClient.put<PaymentResponse>(`/admin/payments/${paymentId}/status`, payload);
        return response.data;
    },
};
