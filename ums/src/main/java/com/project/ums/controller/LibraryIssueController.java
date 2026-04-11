package com.project.ums.controller;

import com.project.ums.entity.LibraryIssue;
import com.project.ums.repository.LibraryIssueRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library/issues")
public class LibraryIssueController {

    private final LibraryIssueRepository libraryIssueRepository;

    public LibraryIssueController(LibraryIssueRepository libraryIssueRepository) {
        this.libraryIssueRepository = libraryIssueRepository;
    }

    @GetMapping
    public List<LibraryIssue> list() {
        return libraryIssueRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<LibraryIssue> create(@RequestBody LibraryIssue issue) {
        if (issue.getStatus() == null || issue.getStatus().isBlank()) {
            issue.setStatus("Issued");
        }
        return ResponseEntity.ok(libraryIssueRepository.save(issue));
    }
}
