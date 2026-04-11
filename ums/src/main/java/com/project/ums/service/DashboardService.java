package com.project.ums.service;

import com.project.ums.dto.DashboardDataDto;
import com.project.ums.dto.DashboardOverviewDto;
import com.project.ums.dto.StudentDto;
import com.project.ums.entity.AttendanceRecord;
import com.project.ums.entity.Student;
import com.project.ums.repository.AttendanceRecordRepository;
import com.project.ums.repository.CourseRepository;
import com.project.ums.repository.DepartmentRepository;
import com.project.ums.repository.FeePaymentRepository;
import com.project.ums.repository.FacultyRepository;
import com.project.ums.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;
    private final FeePaymentRepository feePaymentRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;

    public DashboardService(
            StudentRepository studentRepository,
            FacultyRepository facultyRepository,
            CourseRepository courseRepository,
            DepartmentRepository departmentRepository,
            FeePaymentRepository feePaymentRepository,
            AttendanceRecordRepository attendanceRecordRepository
    ) {
        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.courseRepository = courseRepository;
        this.departmentRepository = departmentRepository;
        this.feePaymentRepository = feePaymentRepository;
        this.attendanceRecordRepository = attendanceRecordRepository;
    }

    public DashboardDataDto getDashboardData() {
        DashboardOverviewDto overview = new DashboardOverviewDto(
                studentRepository.count(),
                facultyRepository.count(),
                calculateAttendanceRate(),
                courseRepository.count(),
                calculateFeesCollected(),
                departmentRepository.count()
        );

        List<StudentDto> recentAdmissions = studentRepository.findTop7ByOrderByEnrolledDateDesc().stream()
                .map(this::toStudentDto)
                .collect(Collectors.toList());

        return new DashboardDataDto(overview, recentAdmissions);
    }

    private StudentDto toStudentDto(Student student) {
        return new StudentDto(
                student.getStudentId(),
                student.getFullName(),
                student.getDepartment(),
                student.getEnrolledDate().toString(),
                student.getStatus()
        );
    }

    private double calculateAttendanceRate() {
        List<AttendanceRecord> records = attendanceRecordRepository.findAll();
        if (records.isEmpty()) {
            return 91.4;
        }

        double totalPresent = records.stream().mapToDouble(AttendanceRecord::getPresentCount).sum();
        double totalSeats = records.stream().mapToDouble(AttendanceRecord::getTotalCount).sum();
        return totalSeats == 0 ? 0 : (totalPresent * 100.0 / totalSeats);
    }

    private double calculateFeesCollected() {
        return feePaymentRepository.findAll().stream().mapToDouble(f -> f.getAmount()).sum();
    }
}
