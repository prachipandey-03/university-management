package com.project.ums.dto;

public record DashboardOverviewDto(
        long studentCount,
        long facultyCount,
        double attendanceRate,
        long courseCount,
        double feesCollected,
        long departmentCount
) {
}
