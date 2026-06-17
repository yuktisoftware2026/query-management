import api from "./axios";

export const getAllBatches = async () => {
    const response =
        await api.get("/api/batches");

    return response.data;
};

export const createBatch = async (
    batch
) => {

    const response =
        await api.post(
            "/api/batches",
            batch
        );

    return response.data;
};

export const updateBatch = async (
    id,
    batch
) => {

    const response =
        await api.put(
            `/api/batches/${id}`,
            batch
        );

    return response.data;
};

export const deleteBatch = async (
    id
) => {

    const response =
        await api.delete(
            `/api/batches/${id}`
        );

    return response.data;
};