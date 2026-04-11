package com.project.ums.repository;

import com.project.ums.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    java.util.List<Department> findAllByOrderByNameAsc();
}
