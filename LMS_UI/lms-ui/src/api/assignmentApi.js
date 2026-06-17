import api from "./axios";

export const getAllAssignments = async () => {
    const response =
        await api.get(
            "/api/assignments"
        );

    return response.data;
};

export const createAssignment = async (
    assignment
) => {

    const response =
        await api.post(
            "/api/assignments",
            assignment
        );

    return response.data;
};

export const updateAssignment = async (
    id,
    assignment
) => {

    const response =
        await api.put(
            `/api/assignments/${id}`,
            assignment
        );

    return response.data;
};

export const deleteAssignment = async (
    id
) => {

    const response =
        await api.delete(
            `/api/assignments/${id}`
        );

    return response.data;
};