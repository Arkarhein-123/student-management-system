package org.jdc.portal.repository;

import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Course;
import org.jdc.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BatchRepository extends JpaRepository<Batch,Long> {
    Optional<Course> findByCourseId(Long courseId);
    Optional<User> findByTeacherId(Long teacherId);
}
