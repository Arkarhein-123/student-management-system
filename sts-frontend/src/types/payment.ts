export type PaymentStatus = "PENDING" | "APPROVED" | "DROPPED";
export type EnrollmentStatus = "PENDING" | "APPROVED" | "DROPPED";

export interface PaymentSubmitRequest {
    batchId: number;
    slipImageUrl: string;
    remarks?: string;
}

export interface PaymentStatusUpdateRequest {
    status: PaymentStatus;
}

export interface PaymentResponse {
    paymentId: number;
    enrollmentId: number;
    studentId: number;
    studentName: string;
    batchId: number;
    batchCode: string;
    courseTitle: string;
    amount: number;
    slipImageUrl: string;
    remarks?: string;
    paymentStatus: PaymentStatus;
    enrollmentStatus: EnrollmentStatus;
    submittedAt: string;
}
