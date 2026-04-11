# UniVerse UMS — Menu information architecture

| Section | Menu label | HTML file | Scope | API |
|---------|------------|-----------|-------|-----|
| Master | New Faculty | `faculty.html` | MVP form + POST | `/api/faculty` |
| Master | New Student Admission | `admission.html` | MVP form + POST | `/api/students` |
| Master | Department Setup | `departments.html` | MVP form + list | `/api/departments` |
| Master | Course Management | `courses.html` | MVP form + list | `/api/courses` |
| Details | Student Details | `student-details.html` | MVP table | `/api/students` GET |
| Details | Teacher Details | `teacher-details.html` | MVP table | `/api/faculty` GET |
| Details | Department Details | `department-details.html` | MVP table | `/api/departments` GET |
| Attendance | Student Attendance | `attendance-student.html` | MVP daily aggregate form | `/api/attendance` POST |
| Attendance | Teacher Attendance | `attendance-teacher.html` | MVP (same pattern, labeled) | `/api/attendance` POST |
| Attendance | Student Attendance Detail | `attendance-student-detail.html` | MVP history table | `/api/attendance` GET |
| Attendance | Teacher Attendance Detail | `attendance-teacher-detail.html` | MVP history table | `/api/attendance` GET |
| Examination | Exam Schedule | `exam.html` | MVP form + list | `/api/exams` |
| Examination | Mark Entry | `exam-marks.html` | MVP form | `/api/exam-results` POST |
| Examination | Result Declaration | `exam-results.html` | MVP table | `/api/exam-results` GET |
| Examination | Grade Report | `exam-grades.html` | MVP table (grades) | `/api/exam-results` GET |
| Finance | Fee Collection | `fee.html` | MVP form | `/api/fees` POST |
| Finance | Fee Structure | `fee-structure.html` | MVP form + list | `/api/fee-structures` |
| Finance | Scholarship Management | `scholarships.html` | MVP form + list | `/api/scholarships` |
| Finance | Finance Report | `finance-report.html` | MVP aggregates | `/api/fees` GET + client summary |
| Library | Book Catalog | `library-books.html` | MVP form + list | `/api/library/books` |
| Library | Issue / Return | `library-issues.html` | MVP form + list | `/api/library/issues` |
| Library | Library Members | `library-members.html` | MVP merged list | `/api/students` + `/api/faculty` GET |
| Reports | Student Report | `report-students.html` | MVP | `/api/students` GET |
| Reports | Attendance Report | `report-attendance.html` | MVP | `/api/attendance` GET |
| Reports | Finance Report | `report-finance.html` | MVP | `/api/fees` GET |
| Reports | Examination Report | `report-exams.html` | MVP | `/api/exam-results` + `/api/exams` GET |
| — | Dashboard Overview | `dashboard.html` | Home | `/api/dashboard/data` |

**Placeholder**: None — all routes map to functional MVP pages as above.
