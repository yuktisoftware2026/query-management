import api from "./axios";

export const getAllAttendance = async () => {
    const response =
        await api.get("/api/attendance");
    return response.data;
};

export const createAttendance = async (
    attendance
) => {
    const response =
        await api.post(
            "/api/attendance",
            attendance
        );
    return response.data;
};

export const updateAttendance = async (
    id,
    attendance
) => {
    const response =
        await api.put(
            `/api/attendance/${id}`,
            attendance
        );
    return response.data;
};