package com.project.ums.controller;

import com.project.ums.entity.ExamResult;
import com.project.ums.repository.ExamResultRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-results")
public class ExamResultController {

    private final ExamResultRepository examResultRepository;

    public ExamResultController(ExamResultRepository examResultRepository) {
        this.examResultRepository = examResultRepository;
    }

    @GetMapping
    public List<ExamResult> list() {
        return examResultRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ExamResult> create(@RequestBody ExamResult result) {
        if (result.getResultStatus() == null || result.getResultStatus().isBlank()) {
            result.setResultStatus("Recorded");
        }
        return ResponseEntity.ok(examResultRepository.save(result));
    }
}
