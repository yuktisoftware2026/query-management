import api from "./axios";

export const getAllStudents = async () => {
    const response = await api.get("/api/students");
    return response.data;
};

export const createStudent = async (student) => {
    const response = await api.post(
        "/api/students",
        student
    );
    return response.data;
};

export const updateStudent = async (
    id,
    student
) => {
    const response = await api.put(
        `/api/students/${id}`,
        student
    );
    return response.data;
};

export const deleteStudent = async (
    id
) => {
    const response = await api.delete(
        `/api/students/${id}`
    );
    return response.data;
};