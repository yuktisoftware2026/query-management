import api from "./axios";

export const getAllSessions = async () => {
    const response =
        await api.get("/api/sessions");
    return response.data;
};

export const createSession = async (
    session
) => {
    const response =
        await api.post(
            "/api/sessions",
            session
        );
    return response.data;
};

export const updateSession = async (
    id,
    session
) => {
    const response =
        await api.put(
            `/api/sessions/${id}`,
            session
        );
    return response.data;
};

export const deleteSession = async (
    id
) => {
    const response =
        await api.delete(
            `/api/sessions/${id}`
        );
    return response.data;
};