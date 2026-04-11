/**
 * Sidebar navigation: page id matches body[data-ums-page] for active state.
 */
window.UMS_NAV_SECTIONS = [
  {
    id: 'master',
    title: 'Master',
    iconGradient: 'linear-gradient(135deg, rgba(124,110,247,0.2), rgba(91,156,246,0.2))',
    stroke: '#7c6ef7',
    iconSvg: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    items: [
      { page: 'faculty', label: 'New Faculty', href: 'faculty.html' },
      { page: 'admission', label: 'New Student Admission', href: 'admission.html' },
      { page: 'departments', label: 'Department Setup', href: 'departments.html' },
      { page: 'courses', label: 'Course Management', href: 'courses.html' }
    ]
  },
  {
    id: 'details',
    title: 'Details',
    iconGradient: 'linear-gradient(135deg, rgba(91,156,246,0.2), rgba(77,208,225,0.2))',
    stroke: '#5b9cf6',
    iconSvg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    items: [
      { page: 'student-details', label: 'Student Details', href: 'student-details.html' },
      { page: 'teacher-details', label: 'Teacher Details', href: 'teacher-details.html' },
      { page: 'department-details', label: 'Department Details', href: 'department-details.html' }
    ]
  },
  {
    id: 'attendance',
    title: 'Attendance',
    iconGradient: 'linear-gradient(135deg, rgba(77,208,225,0.2), rgba(124,110,247,0.2))',
    stroke: '#4dd0e1',
    iconSvg: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>',
    items: [
      { page: 'attendance-student', label: 'Student Attendance', href: 'attendance-student.html' },
      { page: 'attendance-teacher', label: 'Teacher Attendance', href: 'attendance-teacher.html' },
      { page: 'attendance-student-detail', label: 'Student Attendance Detail', href: 'attendance-student-detail.html' },
      { page: 'attendance-teacher-detail', label: 'Teacher Attendance Detail', href: 'attendance-teacher-detail.html' }
    ]
  },
  {
    id: 'exam',
    title: 'Examination',
    iconGradient: 'linear-gradient(135deg, rgba(179,157,219,0.2), rgba(124,110,247,0.2))',
    stroke: '#b39ddb',
    iconSvg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    items: [
      { page: 'exam', label: 'Exam Schedule', href: 'exam.html' },
      { page: 'exam-marks', label: 'Mark Entry', href: 'exam-marks.html' },
      { page: 'exam-results', label: 'Result Declaration', href: 'exam-results.html' },
      { page: 'exam-grades', label: 'Grade Report', href: 'exam-grades.html' }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    iconGradient: 'linear-gradient(135deg, rgba(91,156,246,0.2), rgba(179,157,219,0.2))',
    stroke: '#5b9cf6',
    iconSvg: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    items: [
      { page: 'fee', label: 'Fee Collection', href: 'fee.html' },
      { page: 'fee-structure', label: 'Fee Structure', href: 'fee-structure.html' },
      { page: 'scholarships', label: 'Scholarship Management', href: 'scholarships.html' },
      { page: 'finance-report', label: 'Finance Report', href: 'finance-report.html' }
    ]
  },
  {
    id: 'library',
    title: 'Library',
    iconGradient: 'linear-gradient(135deg, rgba(77,208,225,0.2), rgba(91,156,246,0.15))',
    stroke: '#4dd0e1',
    iconSvg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    items: [
      { page: 'library-books', label: 'Book Catalog', href: 'library-books.html' },
      { page: 'library-issues', label: 'Issue / Return', href: 'library-issues.html' },
      { page: 'library-members', label: 'Library Members', href: 'library-members.html' }
    ]
  },
  {
    id: 'reports',
    title: 'Reports',
    iconGradient: 'linear-gradient(135deg, rgba(124,110,247,0.15), rgba(77,208,225,0.15))',
    stroke: '#7c6ef7',
    iconSvg: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    items: [
      { page: 'report-students', label: 'Student Report', href: 'report-students.html' },
      { page: 'report-attendance', label: 'Attendance Report', href: 'report-attendance.html' },
      { page: 'report-finance', label: 'Finance Report', href: 'report-finance.html' },
      { page: 'report-exams', label: 'Examination Report', href: 'report-exams.html' }
    ]
  }
];
