package com.project.ums.controller;

import com.project.ums.entity.Scholarship;
import com.project.ums.repository.ScholarshipRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipRepository scholarshipRepository;

    public ScholarshipController(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    @GetMapping
    public List<Scholarship> list() {
        return scholarshipRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Scholarship> create(@RequestBody Scholarship scholarship) {
        if (scholarship.getStatus() == null || scholarship.getStatus().isBlank()) {
            scholarship.setStatus("Active");
        }
        return ResponseEntity.ok(scholarshipRepository.save(scholarship));
    }
}
