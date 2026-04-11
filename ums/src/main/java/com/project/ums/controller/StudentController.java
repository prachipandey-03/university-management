package com.project.ums.controller;

import com.project.ums.entity.Student;
import com.project.ums.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        student.setStatus(student.getStatus() == null || student.getStatus().isEmpty() ? "Active" : student.getStatus());
        if (student.getEnrolledDate() == null) {
            student.setEnrolledDate(LocalDate.now());
        }
        Student saved = studentRepository.save(student);
        return ResponseEntity.ok(saved);
    }
}
