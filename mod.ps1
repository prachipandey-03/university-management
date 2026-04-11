$html = Get-Content -Path "dashboard.html" -Raw

$pages = @(
    @("admission.html", "New Admission", "Master -> New Admission", "<div class='table-card' style='max-width:500px;margin:20px auto;padding:24px'><h2 style='margin-bottom:20px; font-size:1.2rem; color: #fff;'>Admit Student</h2><form id='pageForm' onsubmit=""submitForm(event, '/api/students')""><input id='studentId' placeholder='Student ID' class='form-input' style='width:100%;margin-bottom:15px' required><input id='fullName' placeholder='Name' class='form-input' style='width:100%;margin-bottom:15px' required><input id='department' placeholder='Department' class='form-input' style='width:100%;margin-bottom:15px' required><input id='status' placeholder='Status' class='form-input' style='width:100%;margin-bottom:15px'><button type='submit' class='btn-sm primary' style='width:100%;padding:12px;'>Submit</button></form></div>"),
    @("faculty.html", "Add Faculty", "Master -> New Faculty", "<div class='table-card' style='max-width:500px;margin:20px auto;padding:24px'><h2 style='margin-bottom:20px; font-size:1.2rem; color: #fff;'>Faculty Registration</h2><form id='pageForm' onsubmit=""submitForm(event, '/api/faculty')""><input id='facultyId' placeholder='Faculty ID' class='form-input' style='width:100%;margin-bottom:15px' required><input id='fullName' placeholder='Name' class='form-input' style='width:100%;margin-bottom:15px' required><input id='title' placeholder='Title' class='form-input' style='width:100%;margin-bottom:15px' required><input id='department' placeholder='Department' class='form-input' style='width:100%;margin-bottom:15px' required><button type='submit' class='btn-sm primary' style='width:100%;padding:12px;'>Submit</button></form></div>"),
    @("attendance.html", "Mark Attendance", "Attendance", "<div class='table-card' style='max-width:500px;margin:20px auto;padding:24px'><h2 style='margin-bottom:20px; font-size:1.2rem; color: #fff;'>Daily Attendance</h2><form id='pageForm' onsubmit=""submitForm(event, '/api/attendance')""><input type='date' id='date' class='form-input' style='width:100%;margin-bottom:15px' required><input type='number' id='totalCount' placeholder='Total count' class='form-input' style='width:100%;margin-bottom:15px' required><input type='number' id='presentCount' placeholder='Present count' class='form-input' style='width:100%;margin-bottom:15px' required><button type='submit' class='btn-sm primary' style='width:100%;padding:12px;'>Submit</button></form></div>"),
    @("fee.html", "Collect Fee", "Finance -> Fee Collection", "<div class='table-card' style='max-width:500px;margin:20px auto;padding:24px'><h2 style='margin-bottom:20px; font-size:1.2rem; color: #fff;'>Fee Payment</h2><form id='pageForm' onsubmit=""submitForm(event, '/api/fees')""><input id='studentId' placeholder='Student ID' class='form-input' style='width:100%;margin-bottom:15px' required><input type='number' id='amount' placeholder='Amount' class='form-input' style='width:100%;margin-bottom:15px' required><input type='date' id='paymentDate' class='form-input' style='width:100%;margin-bottom:15px' required><button type='submit' class='btn-sm primary' style='width:100%;padding:12px;'>Submit</button></form></div>"),
    @("exam.html", "Exam Schedule", "Exam", "<div class='table-card' style='max-width:500px;margin:20px auto;padding:24px'><h2 style='margin-bottom:20px; font-size:1.2rem; color: #fff;'>Schedule Exam</h2><form id='pageForm' onsubmit=""submitForm(event, '/api/exams')""><input id='courseCode' placeholder='Course Code' class='form-input' style='width:100%;margin-bottom:15px' required><input id='courseName' placeholder='Course Name' class='form-input' style='width:100%;margin-bottom:15px' required><input id='department' placeholder='Department' class='form-input' style='width:100%;margin-bottom:15px' required><input type='date' id='examDate' class='form-input' style='width:100%;margin-bottom:15px' required><input id='slot' placeholder='Slot' class='form-input' style='width:100%;margin-bottom:15px' required><input id='room' placeholder='Room' class='form-input' style='width:100%;margin-bottom:15px' required><input id='status' placeholder='Status' value='Scheduled' class='form-input' style='width:100%;margin-bottom:15px'><button type='submit' class='btn-sm primary' style='width:100%;padding:12px;'>Submit</button></form></div>")
)

$prefixIdx = $html.IndexOf("<!-- Page Header -->")
$suffixIdx = $html.LastIndexOf("</main>")

if ($prefixIdx -gt 0 -and $suffixIdx -gt $prefixIdx) {
    $prefix = $html.Substring(0, $prefixIdx)
    $suffix = $html.Substring($suffixIdx)
    
    foreach ($p in $pages) {
        $filename = $p[0]; $title = $p[1]; $bread = $p[2]; $form = $p[3]
        $content = $prefix + "<div class='page-header'><div><h1 class='page-title'>$title</h1><p class='page-breadcrumb'>$bread</p></div><div class='page-header-actions'><button class='btn-sm' onclick=""window.location.href='dashboard.html'"">← Back to Dashboard</button></div></div><div class='content-grid' style='display:block'>$form</div>" + $suffix
        $content = $content.Replace('<script src="js/dashboard.js"></script>', '<script src="js/pages.js"></script>')
        Set-Content -Path $filename -Value $content
        Write-Host "Modified $filename"
    }
} else {
    Write-Host "Indices not found!"
}
