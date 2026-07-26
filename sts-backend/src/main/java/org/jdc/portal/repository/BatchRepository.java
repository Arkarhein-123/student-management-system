package org.jdc.portal.repository;

import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Course;
import org.jdc.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BatchRepository extends JpaRepository<Batch,Long> {
    boolean existsByCourseId(Long courseId);

    List<Batch> findByCourseId(Long courseId);

    @Query("select b from Batch b  join fetch b.teacher t where t.id = :userId")
    List<Batch> findByUserId(Long userId);
}
