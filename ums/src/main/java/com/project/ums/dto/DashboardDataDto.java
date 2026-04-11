package com.project.ums.dto;

import java.util.List;

public record DashboardDataDto(
        DashboardOverviewDto overview,
        List<StudentDto> recentAdmissions
) {
}
