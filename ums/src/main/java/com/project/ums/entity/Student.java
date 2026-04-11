package com.project.ums.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String studentId;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String department;
    @Column(nullable = false)
    private LocalDate enrolledDate;
    @Column(nullable = false)
    private String status;

    public Student() {
    }

    public Student(String studentId, String fullName, String department, LocalDate enrolledDate, String status) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.department = department;
        this.enrolledDate = enrolledDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getEnrolledDate() {
        return enrolledDate;
    }

    public void setEnrolledDate(LocalDate enrolledDate) {
        this.enrolledDate = enrolledDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
