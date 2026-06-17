import api from "./axios";

export const getAllMappings = async () => {
    const response =
        await api.get(
            "/api/student-batches"
        );

    return response.data;
};

export const assignStudent = async (
    mapping
) => {
    const response =
        await api.post(
            "/api/student-batches",
            mapping
        );

    return response.data;
};

export const removeStudent = async (
    id
) => {
    const response =
        await api.delete(
            `/api/student-batches/${id}`
        );

    return response.data;
};