package com.project.ums.dto;

public record StudentDto(
        String studentId,
        String fullName,
        String department,
        String enrolled,
        String status
) {
}
