package com.project.ums.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private int presentCount;
    @Column(nullable = false)
    private int totalCount;

    public AttendanceRecord() {
    }

    public AttendanceRecord(LocalDate date, int presentCount, int totalCount) {
        this.date = date;
        this.presentCount = presentCount;
        this.totalCount = totalCount;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getPresentCount() {
        return presentCount;
    }

    public void setPresentCount(int presentCount) {
        this.presentCount = presentCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public double percentage() {
        return totalCount == 0 ? 0 : (presentCount * 100.0 / totalCount);
    }
}
