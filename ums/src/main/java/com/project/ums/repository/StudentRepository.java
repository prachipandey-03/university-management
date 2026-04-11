package com.project.ums.repository;

import com.project.ums.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findTop7ByOrderByEnrolledDateDesc();
    List<Student> findAllByOrderByEnrolledDateDesc();
}
