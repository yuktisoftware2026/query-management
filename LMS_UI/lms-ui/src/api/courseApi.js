import api from "./axios";

export const getAllCourses = async () => {
    const response = await api.get("/api/courses");
    return response.data;
};

export const createCourse = async (course) => {
    const response = await api.post(
        "/api/courses",
        course
    );
    return response.data;
};

export const updateCourse = async (
    id,
    course
) => {
    const response = await api.put(
        `/api/courses/${id}`,
        course
    );
    return response.data;
};

export const deleteCourse = async (
    id
) => {
    const response = await api.delete(
        `/api/courses/${id}`
    );
    return response.data;
};