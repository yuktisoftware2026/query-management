import { Routes, Route } from "react-router-dom";

// Home
import HomePage from "../pages/home/HomePage";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import StudentLayout from "../layouts/StudentLayout";
import MentorLayout from "../layouts/MentorLayout";

// Dashboards
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import FacultyDashboard from "../pages/dashboard/FacultyDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import MentorDashboard from "../pages/dashboard/MentorDashboard";

// Admin Pages
import StudentsPage from "../pages/student/StudentsPage";
import FacultyPage from "../pages/faculty/FacultyPage";
import MentorPage from "../pages/mentor/MentorPage";
import CoursesPage from "../pages/courses/CoursesPage";
import BatchesPage from "../pages/batches/BatchesPage";
import StudentBatchPage from "../pages/studentBatch/StudentBatchPage";

// Faculty Pages
import ModulesPage from "../pages/modules/ModulesPage";
import NotesPage from "../pages/notes/NotesPage";
import AssignmentsPage from "../pages/assignments/AssignmentsPage";
import FacultySubmissionsPage
from "../pages/faculty/FacultySubmissionsPage";
import SessionPage from "../pages/sessions/SessionPage";
import AttendancePage from "../pages/attendance/AttendancePage";

// Student Pages
import StudentSubmissionPage
from "../pages/submissions/StudentSubmissionPage";
import StudentNotesPage from "../pages/student/StudentNotesPage";
import StudentAssignmentsPage from "../pages/student/StudentAssignmentsPage";
import StudentAttendancePage from "../pages/student/StudentAttendancePage";

// Mentor Pages
import MentorStudentsPage from "../pages/mentor/MentorStudentsPage";
import MentorAttendancePage from "../pages/mentor/MentorAttendencePage";

export default function AppRoutes() {

  return (

    <Routes>

      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={<HomePage />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="students"
          element={<StudentsPage />}
        />

        <Route
          path="faculty"
          element={<FacultyPage />}
        />

        <Route
          path="mentors"
          element={<MentorPage />}
        />

        <Route
          path="courses"
          element={<CoursesPage />}
        />

        <Route
          path="batches"
          element={<BatchesPage />}
        />

        <Route
          path="student-batches"
          element={<StudentBatchPage />}
        />

      </Route>

      {/* ================= FACULTY ================= */}

      <Route
        path="/faculty"
        element={<FacultyLayout />}
      >
        <Route
 path="submissions"
 element={
   <FacultySubmissionsPage />
 }
/>

        <Route
          index
          element={<FacultyDashboard />}
        />

        <Route
          path="modules"
          element={<ModulesPage />}
        />

        <Route
          path="notes"
          element={<NotesPage />}
        />

        <Route
          path="assignments"
          element={<AssignmentsPage />}
        />


        <Route
          path="sessions"
          element={<SessionPage />}
        />

        <Route
          path="attendance"
          element={<AttendancePage />}
        />

      </Route>

      {/* ================= STUDENT ================= */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >

        <Route
          index
          element={<StudentDashboard />}
        />

        <Route
          path="notes"
          element={<StudentNotesPage />}
        />

        <Route
          path="assignments"
          element={<StudentAssignmentsPage />}
        />

        <Route
          path="attendance"
          element={<StudentAttendancePage />}
        />
        <Route
        path="submissions"
        element={<StudentSubmissionPage/>}></Route>

        </Route>

      {/* ================= MENTOR ================= */}

      <Route
        path="/mentor"
        element={<MentorLayout />}
      >

        <Route
          index
          element={<MentorDashboard />}
        />

        <Route
          path="students"
          element={<MentorStudentsPage />}
        />

        <Route
          path="attendance"
          element={<MentorAttendancePage />}
        />

      </Route>

    </Routes>

  );
}