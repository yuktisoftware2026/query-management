import api from "./axios";

export const getAllFaculty = async () => {
    const response = await api.get("/api/faculty");
    return response.data;
};

export const createFaculty = async (faculty) => {
    const response = await api.post(
        "/api/faculty",
        faculty
    );
    return response.data;
};

export const updateFaculty = async (
    id,
    faculty
) => {
    const response = await api.put(
        `/api/faculty/${id}`,
        faculty
    );
    return response.data;
};

export const deleteFaculty = async (
    id
) => {
    const response = await api.delete(
        `/api/faculty/${id}`
    );
    return response.data;
};