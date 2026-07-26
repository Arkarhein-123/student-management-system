package org.jdc.portal.repository;

import org.jdc.portal.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson,Long> {

    @Query("""
            select l from Lesson l
            where l.batch.id = :batchId
            order by l.publishDate asc, l.id asc
            """)
    List<Lesson> findLessonByBatchId(@Param("batchId") Long batchId);

}
