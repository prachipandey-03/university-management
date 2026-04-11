USE ums;

-- Reset the app's active academic master data.
DELETE FROM faculty;
ALTER TABLE faculty AUTO_INCREMENT = 1;

DELETE FROM students;
ALTER TABLE students AUTO_INCREMENT = 1;

DELETE FROM courses;
ALTER TABLE courses AUTO_INCREMENT = 1;

DELETE FROM departments;
ALTER TABLE departments AUTO_INCREMENT = 1;

INSERT INTO departments (code, name) VALUES
('CSE', 'Computer Science Engineering'),
('IT', 'Information Technology'),
('ECE', 'Electronics and Communication Engineering'),
('ME', 'Mechanical Engineering'),
('CE', 'Civil Engineering'),
('MBA', 'Business Administration');

INSERT INTO courses (course_code, course_name, department) VALUES
('CSE101', 'Introduction to Programming', 'Computer Science Engineering'),
('IT201', 'Database Systems', 'Information Technology'),
('ECE301', 'Digital Communication', 'Electronics and Communication Engineering'),
('ME210', 'Thermodynamics', 'Mechanical Engineering'),
('CE220', 'Structural Analysis', 'Civil Engineering'),
('MBA110', 'Principles of Management', 'Business Administration');

INSERT INTO faculty (faculty_id, full_name, department, title)
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1
    FROM seq
    WHERE n < 500
)
SELECT
    CONCAT('FAC2026', LPAD(n, 4, '0')) AS faculty_id,
    CONCAT(
        ELT(1 + MOD(n - 1, 25),
            'Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Krishna',
            'Ishaan', 'Rohan', 'Karan', 'Rahul', 'Siddharth',
            'Ananya', 'Priya', 'Kavya', 'Sneha', 'Ritika',
            'Neha', 'Pooja', 'Meera', 'Diya', 'Aisha',
            'Dev', 'Aryan', 'Nikhil', 'Tanvi', 'Reyansh'
        ),
        ' ',
        ELT(1 + MOD(FLOOR((n - 1) / 25), 25),
            'Sharma', 'Verma', 'Patel', 'Singh', 'Gupta',
            'Mehta', 'Reddy', 'Nair', 'Joshi', 'Kapoor',
            'Malhotra', 'Bansal', 'Saxena', 'Kulkarni', 'Mishra',
            'Agarwal', 'Chopra', 'Yadav', 'Trivedi', 'Arora',
            'Jain', 'Bose', 'Iyer', 'Pillai', 'Sethi'
        )
    ) AS full_name,
    ELT(1 + MOD(n - 1, 6),
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Business Administration'
    ) AS department,
    ELT(1 + MOD(n - 1, 6),
        'Assistant Professor',
        'Associate Professor',
        'Professor',
        'Lecturer',
        'Visiting Faculty',
        'Academic Coordinator'
    ) AS title
FROM seq;

INSERT INTO students (student_id, full_name, department, enrolled_date, status)
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1
    FROM seq
    WHERE n < 500
)
SELECT
    CONCAT('STU2026', LPAD(n, 4, '0')) AS student_id,
    CONCAT(
        ELT(1 + MOD(n - 1, 25),
            'Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Krishna',
            'Ishaan', 'Rohan', 'Karan', 'Rahul', 'Siddharth',
            'Ananya', 'Priya', 'Kavya', 'Sneha', 'Ritika',
            'Neha', 'Pooja', 'Meera', 'Diya', 'Aisha',
            'Dev', 'Aryan', 'Nikhil', 'Tanvi', 'Reyansh'
        ),
        ' ',
        ELT(1 + MOD(FLOOR((n + 74) / 25), 25),
            'Sharma', 'Verma', 'Patel', 'Singh', 'Gupta',
            'Mehta', 'Reddy', 'Nair', 'Joshi', 'Kapoor',
            'Malhotra', 'Bansal', 'Saxena', 'Kulkarni', 'Mishra',
            'Agarwal', 'Chopra', 'Yadav', 'Trivedi', 'Arora',
            'Jain', 'Bose', 'Iyer', 'Pillai', 'Sethi'
        )
    ) AS full_name,
    ELT(1 + MOD(n - 1, 6),
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Business Administration'
    ) AS department,
    DATE_ADD('2024-07-01', INTERVAL MOD(n - 1, 300) DAY) AS enrolled_date,
    CASE
        WHEN MOD(n, 15) = 0 THEN 'Pending'
        WHEN MOD(n, 11) = 0 THEN 'On Leave'
        ELSE 'Active'
    END AS status
FROM seq;
