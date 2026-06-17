import api from "./axios";

export const getAllNotes = async () => {
    const response =
        await api.get("/api/notes");

    return response.data;
};

export const createNotes = async (
    notes
) => {

    const response =
        await api.post(
            "/api/notes",
            notes
        );

    return response.data;
};

export const updateNotes = async (
    id,
    notes
) => {

    const response =
        await api.put(
            `/api/notes/${id}`,
            notes
        );

    return response.data;
};

export const deleteNotes = async (
    id
) => {

    const response =
        await api.delete(
            `/api/notes/${id}`
        );

    return response.data;
};