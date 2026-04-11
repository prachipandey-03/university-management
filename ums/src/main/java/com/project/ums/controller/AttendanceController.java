package com.project.ums.controller;

import com.project.ums.entity.AttendanceRecord;
import com.project.ums.repository.AttendanceRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRecordRepository attendanceRecordRepository;

    public AttendanceController(AttendanceRecordRepository attendanceRecordRepository) {
        this.attendanceRecordRepository = attendanceRecordRepository;
    }

    @GetMapping
    public List<AttendanceRecord> getAllRecords() {
        return attendanceRecordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<AttendanceRecord> addRecord(@RequestBody AttendanceRecord record) {
        AttendanceRecord saved = attendanceRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }
}
