package org.jdc.portal;


import org.jdc.portal.entity.*;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.CourseRepository;
import org.jdc.portal.repository.EnrollmentRepository;
import org.jdc.portal.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

//    @Bean
    public ApplicationRunner runner(UserRepository repo,PasswordEncoder passwordEncoder){
        return args -> {
            repo.save(new User(
                    null,
                    "Saya_Min_Lwin",
                    "teacher.super@gmail.com",
                    passwordEncoder.encode("12345678"),
                    Role.ROLE_TEACHER,
                    true
            ));
        };
    }

//    @Bean
    public ApplicationRunner runner(
            UserRepository userRepository,
            CourseRepository courseRepository,
            BatchRepository batchRepository,
            EnrollmentRepository enrollmentRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {

            // ─── CLEAN SLATE PROCESS (Drop dependencies backward) ───
            enrollmentRepository.deleteAllInBatch();
            batchRepository.deleteAllInBatch();
            userRepository.deleteAllInBatch();

            // ─── 1. SEED TEACHER USER ───
            // Order: id, name, email, password, role, isActive
            User teacher = new User(
                    null,
                    "Master Teacher",
                    "teacher.core@gmail.com",
                    passwordEncoder.encode("12345678"),
                    Role.ROLE_TEACHER,
                    true
            );
            teacher = userRepository.save(teacher);

            // ─── 2. REFERENCE EXISTING DB COURSES ───
            Course reactCourse = courseRepository.findById(1L)
                    .orElseThrow(() -> new IllegalStateException("Base course ID 1 (React) not found in DB."));
            Course javaCourse = courseRepository.findById(2L)
                    .orElseThrow(() -> new IllegalStateException("Base course ID 2 (Java) not found in DB."));

            // ─── 3. SEED BATCHES (Capped at 50 max seats) ───
            // Order: id, batchCode, startDate, scheduleInfo, format, cohortLevel, maxSeats, enrolledSeats, course, teacher
            Batch reactBatch = new Batch(
                    null,
                    "B1-REACT-2026",
                    LocalDate.of(2026, 8, 1),
                    "Sat & Sun (9:00 AM - 12:00 PM)",
                    "Offline (Room 204)",
                    "Intermediate to Advanced",
                    50,
                    2, // Matches the two active enrollees created below
                    reactCourse,
                    teacher
            );
            reactBatch = batchRepository.save(reactBatch);

            Batch javaBatch = new Batch(
                    null,
                    "B1-JAVA-2026",
                    LocalDate.of(2026, 8, 15),
                    "Mon & Wed (6:30 PM - 8:30 PM)",
                    "Offline (Room 101)",
                    "Advanced Professional",
                    50,
                    2, // Matches the two enrollees created below
                    javaCourse,
                    teacher
            );
            javaBatch = batchRepository.save(javaBatch);

            // ─── 4. SEED TEST STUDENT USERS ───
           User student1 = new User(null, "Alpha Win", "student1@email.com", passwordEncoder.encode("12345678"), Role.ROLE_STUDENT, true);
            User student2 = new User(null, "Beta Kyaw", "student2@email.com", passwordEncoder.encode("12345678"), Role.ROLE_STUDENT, true);
            User student3 = new User(null, "Gamma Aung", "student3@email.com", passwordEncoder.encode("12345678"), Role.ROLE_STUDENT, true);
            User student4 = new User(null, "Delta Soe", "student4@email.com", passwordEncoder.encode("12345678"), Role.ROLE_STUDENT, true);

            userRepository.saveAll(List.of(student1, student2, student3, student4));

            // ─── 5. TRANSACTIONAL ENROLLMENTS WITH CUSTOM LIFECYCLE STATUSES ───
            // Order: id, student, batch, enrollmentDate, enrollmentStatus
            // Note: enrollmentDate will be overwritten accurately by @PrePersist during .save() execution
            enrollmentRepository.save(new Enrollment(null, student1, reactBatch, LocalDateTime.now(), EnrollmentStatus.APPROVED));
            enrollmentRepository.save(new Enrollment(null, student2, reactBatch, LocalDateTime.now(), EnrollmentStatus.APPROVED));

            enrollmentRepository.save(new Enrollment(null, student3, javaBatch, LocalDateTime.now(), EnrollmentStatus.APPROVED));
            enrollmentRepository.save(new Enrollment(null, student4, javaBatch, LocalDateTime.now(), EnrollmentStatus.PENDING));

            System.out.println("🎉 Data seeding complete! Application testing boundaries successfully constructed.");
        };
    }







}
