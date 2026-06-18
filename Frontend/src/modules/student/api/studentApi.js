import api from "@/api/axios";

// ─── Notes (read-only for student) ───────────────────────────────────────────
export const getAllNotes = async () => {
  const response = await api.get("/api/notes");
  return response.data;
};

// ─── Assignments (read-only for student) ─────────────────────────────────────
export const getAllAssignments = async () => {
  const response = await api.get("/api/assignments");
  return response.data;
};

// ─── Submissions (student submits their own work) ─────────────────────────────
export const getAllSubmissions = async () => {
  const response = await api.get("/api/submissions");
  return response.data;
};

export const createSubmission = async (submission) => {
  const response = await api.post("/api/submissions", submission);
  return response.data;
};

// ─── Attendance (student views their own attendance) ─────────────────────────
export const getAllAttendance = async () => {
  const response = await api.get("/api/attendance");
  return response.data;
};

// ─── Student Dashboard ────────────────────────────────────────────────────────
export const getStudentDashboard = async (studentId) => {
  const response = await api.get(`/api/student/dashboard/${studentId}`);
  return response.data;
};

// ─── Batch Progress ───────────────────────────────────────────────────────────
export const getBatchProgress = async (batchId) => {
  const response = await api.get(`/api/progress/${batchId}`);
  return response.data;
};
