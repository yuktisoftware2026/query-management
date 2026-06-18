import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './modules/home/pages/Home'
import { Login } from './modules/home/pages/Login'
import { AdminLayoutComponent } from './modules/admin/layouts/AdminLayout'
import { AdminDashboard, Students, Faculty, Mentors, Courses, Batches, StudentBatch } from './modules/admin'
import { FacultyLayoutComponent } from './modules/faculty/layouts/FacultyLayout'
import { FacultyDashboard, Modules, Notes as FacultyNotes, Assignments as FacultyAssignments, Submissions, Sessions, Attendance as FacultyAttendance } from './modules/faculty'
import { StudentLayoutComponent } from './modules/student/layouts/StudentLayout'
import { StudentDashboard, Notes, Assignments, Submissions as StudentSubmissions, Attendance } from './modules/student'
import { MentorLayoutComponent } from './modules/mentor/layouts/MentorLayout'
import { MentorDashboard, Students as MenteeStudents, Attendance as MentorAttendance } from './modules/mentor'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayoutComponent />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="courses" element={<Courses />} />
          <Route path="batches" element={<Batches />} />
          <Route path="student-batch" element={<StudentBatch />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyLayoutComponent />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="modules" element={<Modules />} />
          <Route path="notes" element={<FacultyNotes />} />
          <Route path="assignments" element={<FacultyAssignments />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="attendance" element={<FacultyAttendance />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayoutComponent />}>
          <Route index element={<StudentDashboard />} />
          <Route path="notes" element={<Notes />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="submissions" element={<StudentSubmissions />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* Mentor Routes */}
        <Route path="/mentor" element={<MentorLayoutComponent />}>
          <Route index element={<MentorDashboard />} />
          <Route path="students" element={<MenteeStudents />} />
          <Route path="attendance" element={<MentorAttendance />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
