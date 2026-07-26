//package org.jdc.portal.dto.request;
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//
//public record TeacherCreateRequest(
//        @NotBlank(message = "Teacher name can't be blank")
//        @Size(max = 150, message = "Teacher name can't exceed 150 characters")
//        String name,
//
//        @NotBlank(message = "Email can't be blank")
//        @Email(message = "Email is not valid")
//        @Size(max = 150, message = "Email can't exceed 150 characters")
//        String email
//) {
//}
