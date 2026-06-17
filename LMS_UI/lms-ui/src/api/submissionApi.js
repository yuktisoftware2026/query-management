import api from "./axios";

export const getAllSubmissions = async () => {
    const response =
        await api.get(
            "/api/submissions"
        );

    return response.data;
};

export const createSubmission =
    async (submission) => {

    const response =
        await api.post(
            "/api/submissions",
            submission
        );

    return response.data;
};

export const reviewSubmission =
    async (
        id,
        marks,
        feedback
    ) => {

    const response =
        await api.patch(
            `/api/submissions/${id}/review`,
            null,
            {
                params: {
                    marks,
                    feedback
                }
            }
        );

    return response.data;
};