package com.project.ums.repository;

import com.project.ums.entity.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    java.util.List<AttendanceRecord> findAllByOrderByDateDesc();
}
