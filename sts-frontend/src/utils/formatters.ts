export const formatDate = (dateValue?: string | number[] | null): string => {
    if (!dateValue) return "N/A";

    // Handle Java LocalDateTime serialized as an array: [YYYY, MM, DD, HH, mm, ss]
    if (Array.isArray(dateValue)) {
        const [year, month, day] = dateValue;
        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    // Handle standard ISO date string: "2026-07-26T13:27:19"
    const parsedDate = new Date(dateValue);
    if (isNaN(parsedDate.getTime())) return String(dateValue);

    return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
