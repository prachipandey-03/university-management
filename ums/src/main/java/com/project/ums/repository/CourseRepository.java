package com.project.ums.repository;

import com.project.ums.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    java.util.List<Course> findAllByOrderByCourseCodeAsc();
}
