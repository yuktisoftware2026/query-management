import api from "./axios";

export const getAllModules = async () => {
    const response =
        await api.get("/api/modules");

    return response.data;
};

export const createModule = async (
    module
) => {

    const response =
        await api.post(
            "/api/modules",
            module
        );

    return response.data;
};

export const updateModule = async (
    id,
    module
) => {

    const response =
        await api.put(
            `/api/modules/${id}`,
            module
        );

    return response.data;
};

export const completeModule = async (
    id
) => {

    const response =
        await api.patch(
            `/api/modules/${id}/complete`
        );

    return response.data;
};