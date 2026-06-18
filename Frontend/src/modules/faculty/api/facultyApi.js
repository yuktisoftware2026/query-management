import api from "@/api/axios";

// ─── Modules ─────────────────────────────────────────────────────────────────
export const getAllModules = async () => {
  const response = await api.get("/api/modules");
  return response.data;
};

export const createModule = async (module) => {
  const response = await api.post("/api/modules", module);
  return response.data;
};

export const updateModule = async (id, module) => {
  const response = await api.put(`/api/modules/${id}`, module);
  return response.data;
};

export const completeModule = async (id) => {
  const response = await api.patch(`/api/modules/${id}/complete`);
  return response.data;
};

// ─── Notes ───────────────────────────────────────────────────────────────────
export const getAllNotes = async () => {
  const response = await api.get("/api/notes");
  return response.data;
};

export const createNotes = async (notes) => {
  const response = await api.post("/api/notes", notes);
  return response.data;
};

export const updateNotes = async (id, notes) => {
  const response = await api.put(`/api/notes/${id}`, notes);
  return response.data;
};

export const deleteNotes = async (id) => {
  const response = await api.delete(`/api/notes/${id}`);
  return response.data;
};

// ─── Assignments ─────────────────────────────────────────────────────────────
export const getAllAssignments = async () => {
  const response = await api.get("/api/assignments");
  return response.data;
};

export const createAssignment = async (assignment) => {
  const response = await api.post("/api/assignments", assignment);
  return response.data;
};

export const updateAssignment = async (id, assignment) => {
  const response = await api.put(`/api/assignments/${id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (id) => {
  const response = await api.delete(`/api/assignments/${id}`);
  return response.data;
};

// ─── Submissions (Faculty reviews) ───────────────────────────────────────────
export const getAllSubmissions = async () => {
  const response = await api.get("/api/submissions");
  return response.data;
};

export const reviewSubmission = async (id, marks, feedback) => {
  const response = await api.patch(`/api/submissions/${id}/review`, null, {
    params: { marks, feedback },
  });
  return response.data;
};

// ─── Sessions ────────────────────────────────────────────────────────────────
export const getAllSessions = async () => {
  const response = await api.get("/api/sessions");
  return response.data;
};

export const createSession = async (session) => {
  const response = await api.post("/api/sessions", session);
  return response.data;
};

export const updateSession = async (id, session) => {
  const response = await api.put(`/api/sessions/${id}`, session);
  return response.data;
};

export const deleteSession = async (id) => {
  const response = await api.delete(`/api/sessions/${id}`);
  return response.data;
};

// ─── Attendance ───────────────────────────────────────────────────────────────
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

// ─── Faculty Dashboard ────────────────────────────────────────────────────────
export const getFacultyDashboard = async (facultyId) => {
  const response = await api.get(`/api/faculty/dashboard/${facultyId}`);
  return response.data;
};
