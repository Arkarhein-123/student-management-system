import axiosClient from "../../../config/axiosClient"
import type { CourseResponse } from "./CourseResponse";

/**
 * 
 * private Long id;

    @Column(name = "course_name",nullable = false,length = 150)
    private String courseName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration",nullable = false,length = 50)
    private String duration;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal fees;
 */

export const courseApi = {
    getAll: async ():Promise<CourseResponse[]> =>{
        const response = await axiosClient.get("/get-courses");
        return response.data;
    },
}