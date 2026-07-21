import type { Lesson } from "@/types";

export interface GroupedLessons {
    [moduleName: string]: Lesson[];
}

export const groupLessonsByModule = (lessons: Lesson[]): GroupedLessons => {
    return lessons.reduce<GroupedLessons>((acc, lesson) => {
        const moduleKey = lesson.moduleName || "General Resources";
        if (!acc[moduleKey]) {
            acc[moduleKey] = [];
        }
        acc[moduleKey].push(lesson);
        return acc;
    }, {});
};
