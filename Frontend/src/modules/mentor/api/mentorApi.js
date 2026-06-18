import api from "@/api/axios";

// ─── Students (mentor's assigned mentees) ────────────────────────────────────
export const getAllStudents = async () => {
  const response = await api.get("/api/students");
  return response.data;
};

// ─── Attendance (mentor manages group attendance) ─────────────────────────────
export const getAllAttendance = async () => {
  const response = await api.get("/api/attendance");
  return response.data;
};

export const createAttendance = async (attendance) => {
  const response = await api.post("/api/attendance", attendance);
  return response.data;
};

export const updateAttendance = async (id, attendance) => {
  const response = await api.put(`/api/attendance/${id}`, attendance);
  return response.data;
};

// ─── Student-Batch (see which batch each student belongs to) ──────────────────
export const getAllMappings = async () => {
  const response = await api.get("/api/student-batches");
  return response.data;
};

// ─── Mentor Dashboard ─────────────────────────────────────────────────────────
export const getMentorDashboard = async (mentorId) => {
  const response = await api.get(`/api/mentor/dashboard/${mentorId}`);
  return response.data;
};
