package com.project.ums.config;

import com.project.ums.entity.AttendanceRecord;
import com.project.ums.entity.Course;
import com.project.ums.entity.Department;
import com.project.ums.entity.ExamResult;
import com.project.ums.entity.ExamSchedule;
import com.project.ums.entity.FeePayment;
import com.project.ums.entity.FeeStructure;
import com.project.ums.entity.Faculty;
import com.project.ums.entity.LibraryBook;
import com.project.ums.entity.LibraryIssue;
import com.project.ums.entity.Scholarship;
import com.project.ums.entity.Student;
import com.project.ums.entity.User;
import com.project.ums.repository.AttendanceRecordRepository;
import com.project.ums.repository.CourseRepository;
import com.project.ums.repository.DepartmentRepository;
import com.project.ums.repository.ExamResultRepository;
import com.project.ums.repository.ExamScheduleRepository;
import com.project.ums.repository.FeePaymentRepository;
import com.project.ums.repository.FeeStructureRepository;
import com.project.ums.repository.FacultyRepository;
import com.project.ums.repository.LibraryBookRepository;
import com.project.ums.repository.LibraryIssueRepository;
import com.project.ums.repository.ScholarshipRepository;
import com.project.ums.repository.StudentRepository;
import com.project.ums.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@ConditionalOnProperty(name = "ums.seed-demo-data", havingValue = "true")
public class StartupDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;
    private final FeePaymentRepository feePaymentRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;
    private final LibraryBookRepository libraryBookRepository;
    private final LibraryIssueRepository libraryIssueRepository;
    private final FeeStructureRepository feeStructureRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final ExamResultRepository examResultRepository;
    private final ExamScheduleRepository examScheduleRepository;
    private final PasswordEncoder passwordEncoder;

    public StartupDataLoader(
            UserRepository userRepository,
            StudentRepository studentRepository,
            FacultyRepository facultyRepository,
            CourseRepository courseRepository,
            DepartmentRepository departmentRepository,
            FeePaymentRepository feePaymentRepository,
            AttendanceRecordRepository attendanceRecordRepository,
            LibraryBookRepository libraryBookRepository,
            LibraryIssueRepository libraryIssueRepository,
            FeeStructureRepository feeStructureRepository,
            ScholarshipRepository scholarshipRepository,
            ExamResultRepository examResultRepository,
            ExamScheduleRepository examScheduleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.courseRepository = courseRepository;
        this.departmentRepository = departmentRepository;
        this.feePaymentRepository = feePaymentRepository;
        this.attendanceRecordRepository = attendanceRecordRepository;
        this.libraryBookRepository = libraryBookRepository;
        this.libraryIssueRepository = libraryIssueRepository;
        this.feeStructureRepository = feeStructureRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.examResultRepository = examResultRepository;
        this.examScheduleRepository = examScheduleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrator");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            User fac = new User();
            fac.setUsername("faculty");
            fac.setPassword(passwordEncoder.encode("faculty123"));
            fac.setFullName("Faculty User");
            fac.setRole("FACULTY");
            userRepository.save(fac);
        }

        if (departmentRepository.count() == 0) {
            departmentRepository.saveAll(List.of(
                    new Department("Computer Science", "CSE"),
                    new Department("Electronics & Communications", "ECE"),
                    new Department("Mathematics", "MAT"),
                    new Department("Mechanical Engineering", "ME"),
                    new Department("Biotechnology", "BIO")
            ));
        }

        if (courseRepository.count() == 0) {
            courseRepository.saveAll(List.of(
                    new Course("CSE101", "Introduction to Computer Science", "Computer Science"),
                    new Course("ECE102", "Digital Electronics", "Electronics & Communications"),
                    new Course("MAT105", "Linear Algebra", "Mathematics"),
                    new Course("ME110", "Mechanics of Materials", "Mechanical Engineering"),
                    new Course("BIO120", "Genetics", "Biotechnology")
            ));
        }

        if (facultyRepository.count() == 0) {
            facultyRepository.saveAll(List.of(
                    new Faculty("F001", "Dr. Neha Gupta", "Computer Science", "Associate Professor"),
                    new Faculty("F002", "Dr. Rajesh Singh", "Electronics & Communications", "Professor"),
                    new Faculty("F003", "Dr. Archana Patel", "Mathematics", "Assistant Professor"),
                    new Faculty("F004", "Dr. Siddharth Verma", "Mechanical Engineering", "Professor"),
                    new Faculty("F005", "Dr. Priya Nair", "Biotechnology", "Associate Professor")
            ));
        }

        if (studentRepository.count() == 0) {
            studentRepository.saveAll(List.of(
                    new Student("BU2025001", "Anshu Raj", "Computer Science", LocalDate.of(2025, 8, 1), "Active"),
                    new Student("BU2025002", "Priya Sharma", "Electronics & Communications", LocalDate.of(2025, 8, 1), "Active"),
                    new Student("BU2025003", "Rohan Mehta", "Mathematics", LocalDate.of(2025, 8, 1), "On Leave"),
                    new Student("BU2025004", "Ananya Singh", "Computer Science", LocalDate.of(2025, 8, 1), "Active"),
                    new Student("BU2025005", "Vikram Patel", "Mechanical Engineering", LocalDate.of(2025, 8, 1), "Active"),
                    new Student("BU2025006", "Sneha Reddy", "Biotechnology", LocalDate.of(2025, 8, 1), "Pending"),
                    new Student("BU2025007", "Arjun Nair", "Civil Engineering", LocalDate.of(2025, 8, 1), "Active")
            ));
        }

        if (feePaymentRepository.count() == 0) {
            feePaymentRepository.saveAll(List.of(
                    new FeePayment(380000, LocalDate.of(2025, 8, 2), "BU2025001"),
                    new FeePayment(380000, LocalDate.of(2025, 8, 2), "BU2025002"),
                    new FeePayment(380000, LocalDate.of(2025, 8, 2), "BU2025004"),
                    new FeePayment(380000, LocalDate.of(2025, 8, 2), "BU2025005"),
                    new FeePayment(380000, LocalDate.of(2025, 8, 2), "BU2025007")
            ));
        }

        if (attendanceRecordRepository.count() == 0) {
            attendanceRecordRepository.saveAll(List.of(
                    new AttendanceRecord(LocalDate.of(2025, 4, 4), 182, 200),
                    new AttendanceRecord(LocalDate.of(2025, 4, 5), 174, 190),
                    new AttendanceRecord(LocalDate.of(2025, 4, 6), 188, 205),
                    new AttendanceRecord(LocalDate.of(2025, 4, 7), 190, 210)
            ));
        }

        if (feeStructureRepository.count() == 0) {
            feeStructureRepository.saveAll(List.of(
                    new FeeStructure("B.Tech", "2025-26", "Semester I", 380000),
                    new FeeStructure("M.Tech", "2025-26", "Semester I", 120000)
            ));
        }

        if (scholarshipRepository.count() == 0) {
            scholarshipRepository.saveAll(List.of(
                    new Scholarship("Merit Scholarship", "BU2025001", 50000, "Active"),
                    new Scholarship("Sports Quota", "BU2025004", 25000, "Active")
            ));
        }

        if (libraryBookRepository.count() == 0) {
            libraryBookRepository.saveAll(List.of(
                    new LibraryBook("978-0134685991", "Effective Java", "Joshua Bloch", "CS", "Available"),
                    new LibraryBook("978-0262033848", "Introduction to Algorithms", "CLRS", "CS", "Issued"),
                    new LibraryBook("978-0201633610", "Design Patterns", "GoF", "CS", "Available")
            ));
        }

        if (libraryIssueRepository.count() == 0) {
            libraryIssueRepository.saveAll(List.of(
                    new LibraryIssue(
                            "Introduction to Algorithms",
                            "Anshu Raj",
                            "Student",
                            LocalDate.of(2025, 4, 1),
                            LocalDate.of(2025, 4, 15),
                            "Issued"
                    )
            ));
        }

        if (examScheduleRepository.count() == 0) {
            examScheduleRepository.saveAll(List.of(
                    new ExamSchedule(
                            "CSE101",
                            "Introduction to Computer Science",
                            "Computer Science",
                            LocalDate.of(2025, 5, 12),
                            "Morning",
                            "Hall A",
                            "Scheduled"
                    )
            ));
        }

        if (examResultRepository.count() == 0) {
            examResultRepository.saveAll(List.of(
                    new ExamResult("BU2025001", "Anshu Raj", "CSE101", "Intro CS", 82, "A", "Pass"),
                    new ExamResult("BU2025004", "Ananya Singh", "CSE101", "Intro CS", 91, "A+", "Pass")
            ));
        }
    }
}
