package com.project.ums.repository;

import com.project.ums.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    java.util.List<Faculty> findAllByOrderByFullNameAsc();
}
