export interface Course {
    id: number;
    courseName: string;
    description: string;
    duration: string;
    fees: number;
    category: string;
    imageUrl: string;
    isAvailable: boolean;
}

export interface Batch {
    id: number;
    batchCode: string;
    startDate: string; // ISO Date string
    scheduleInfo: string;
    format: string;
    cohortLevel: string;
    maxSeats: number;
    enrolledSeats: number;
    course: Course;
}

export interface ActiveEnrollmentView {
    courseName: string;
    scheduleInfo: string;
    format: string;
    batchId: string;
}
