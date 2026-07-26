// src/utils/errorHandler.ts
export function extractErrorMessage(error: any): string {
    if (error.response) {
        // Backend returned an explicit ErrorResponse payload
        const data = error.response.data;
        if (data && typeof data === "object" && "message" in data) {
            return (data as { message: string }).message;
        }
        if (error.response.status === 404) return "Requested terminal resource not found.";
        if (error.response.status === 500) return "Server terminal encountered a critical error.";
    } else if (error.request) {
        return "Network connection block. Server terminal appears offline.";
    }
    return error.message || "An unexpected error occurred.";
}
