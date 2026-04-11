package com.project.ums.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "faculty")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String facultyId;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String department;
    @Column(nullable = false)
    private String title;

    public Faculty() {
    }

    public Faculty(String facultyId, String fullName, String department, String title) {
        this.facultyId = facultyId;
        this.fullName = fullName;
        this.department = department;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
