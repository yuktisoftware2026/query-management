import api from "./axios";

export const getAllMentors = async () => {
    const response = await api.get("/api/mentor");
    return response.data;
};

export const createMentor = async (mentor) => {
    const response = await api.post(
        "/api/mentor",
        mentor
    );
    return response.data;
};

export const updateMentor = async (
    id,
    mentor
) => {
    const response = await api.put(
        `/api/mentor/${id}`,
        mentor
    );
    return response.data;
};

export const deleteMentor = async (
    id
) => {
    const response = await api.delete(
        `/api/mentor/${id}`
    );
    return response.data;
};