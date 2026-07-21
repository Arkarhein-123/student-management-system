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
    batchId: number;
}

export interface BatchDetails {
    id: number;
    batchCode: string;
    startDate: string;
    scheduleInfo: string;
    format: string;
    cohortLevel: string;
    maxSeats: number;
    enrolledSeats: number;
    teacherName: string;
    studentEnrollmentStatus: "PENDING" | "APPROVED" | "DROPPED" | "Not Enrolled";
}

export interface CourseDetails {
    id: number;
    courseName: string;
    description: string;
    duration: string;
    fees: number;
    category: string;
    imageUrl: string;
    batches: BatchDetails[];
}


// lesson dto
export interface Lesson {
    id: number;
    title: string;
    moduleName: string;
    recordingUrl: string | null;
    materialUrl: string | null;
    publishDate: string;
}

export interface ClassroomDetailResponse {
    batchId: number;
    batchCode: string;
    courseTitle: string;
    startDate: string;
    scheduleInfo: string;
    format: string;
    cohortLevel: string;
    teacherName: string;
    lessons: Lesson[];
}