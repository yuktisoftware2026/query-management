import api from "@/api/axios";

// ─── Students ───────────────────────────────────────────────────────────────
export const getAllStudents = async () => {
  const response = await api.get("/api/students");
  return response.data;
};

export const createStudent = async (student) => {
  const response = await api.post("/api/students", student);
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await api.put(`/api/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/api/students/${id}`);
  return response.data;
};

// ─── Faculty ────────────────────────────────────────────────────────────────
export const getAllFaculty = async () => {
  const response = await api.get("/api/faculty");
  return response.data;
};

export const createFaculty = async (faculty) => {
  const response = await api.post("/api/faculty", faculty);
  return response.data;
};

export const updateFaculty = async (id, faculty) => {
  const response = await api.put(`/api/faculty/${id}`, faculty);
  return response.data;
};

export const deleteFaculty = async (id) => {
  const response = await api.delete(`/api/faculty/${id}`);
  return response.data;
};

// ─── Mentors ─────────────────────────────────────────────────────────────────
export const getAllMentors = async () => {
  const response = await api.get("/api/mentor");
  return response.data;
};

export const createMentor = async (mentor) => {
  const response = await api.post("/api/mentor", mentor);
  return response.data;
};

export const updateMentor = async (id, mentor) => {
  const response = await api.put(`/api/mentor/${id}`, mentor);
  return response.data;
};

export const deleteMentor = async (id) => {
  const response = await api.delete(`/api/mentor/${id}`);
  return response.data;
};

// ─── Courses ─────────────────────────────────────────────────────────────────
export const getAllCourses = async () => {
  const response = await api.get("/api/courses");
  return response.data;
};

export const createCourse = async (course) => {
  const response = await api.post("/api/courses", course);
  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await api.put(`/api/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/api/courses/${id}`);
  return response.data;
};

// ─── Batches ─────────────────────────────────────────────────────────────────
export const getAllBatches = async () => {
  const response = await api.get("/api/batches");
  return response.data;
};

export const createBatch = async (batch) => {
  const response = await api.post("/api/batches", batch);
  return response.data;
};

export const updateBatch = async (id, batch) => {
  const response = await api.put(`/api/batches/${id}`, batch);
  return response.data;
};

export const deleteBatch = async (id) => {
  const response = await api.delete(`/api/batches/${id}`);
  return response.data;
};

// ─── Student-Batch Mappings ───────────────────────────────────────────────────
export const getAllMappings = async () => {
  const response = await api.get("/api/student-batches");
  return response.data;
};

export const assignStudent = async (mapping) => {
  const response = await api.post("/api/student-batches", mapping);
  return response.data;
};

export const removeStudent = async (id) => {
  const response = await api.delete(`/api/student-batches/${id}`);
  return response.data;
};

// ─── Admin Dashboard ─────────────────────────────────────────────────────────
export const getAdminDashboard = async () => {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
};
