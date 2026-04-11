package com.project.ums.controller;

import com.project.ums.entity.ExamSchedule;
import com.project.ums.repository.ExamScheduleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamScheduleController {

    private final ExamScheduleRepository examScheduleRepository;

    public ExamScheduleController(ExamScheduleRepository examScheduleRepository) {
        this.examScheduleRepository = examScheduleRepository;
    }

    @GetMapping
    public List<ExamSchedule> getAllSchedules() {
        return examScheduleRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ExamSchedule> addSchedule(@RequestBody ExamSchedule examSchedule) {
        if (examSchedule.getRoom() == null || examSchedule.getRoom().isBlank()) {
            examSchedule.setRoom("TBA");
        }
        if (examSchedule.getStatus() == null || examSchedule.getStatus().isBlank()) {
            examSchedule.setStatus("Scheduled");
        }
        ExamSchedule saved = examScheduleRepository.save(examSchedule);
        return ResponseEntity.ok(saved);
    }
}
