import { useEffect, useState } from "react";

import {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
} from "../../api/courseApi";

export default function CoursesPage() {

    const [courses, setCourses] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            courseName: "",
            description: ""
        });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {

        try {

            const data =
                await getAllCourses();

            setCourses(data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async () => {

        try {

            if (editingId) {

                await updateCourse(
                    editingId,
                    formData
                );

            } else {

                await createCourse(
                    formData
                );
            }

            setFormData({
                courseName: "",
                description: ""
            });

            setEditingId(null);

            loadCourses();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        course
    ) => {

        setEditingId(course.id);

        setFormData({
            courseName:
                course.courseName,
            description:
                course.description
        });
    };

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Deactivate Course?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteCourse(id);

            loadCourses();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Courses
            </h2>

            <div className="bg-white p-5 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <input
                        name="courseName"
                        placeholder="Course Name"
                        value={formData.courseName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    {
                        editingId
                            ? "Update Course"
                            : "Add Course"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr className="border-b">

                    <th className="p-3">
                        ID
                    </th>

                    <th className="p-3">
                        Course Name
                    </th>

                    <th className="p-3">
                        Description
                    </th>

                    <th className="p-3">
                        Status
                    </th>

                    <th className="p-3">
                        Actions
                    </th>

                </tr>

                </thead>

                <tbody>

                {
                    courses.map(
                        (course) => (

                        <tr
                            key={course.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {course.id}
                            </td>

                            <td className="p-3">
                                {course.courseName}
                            </td>

                            <td className="p-3">
                                {course.description}
                            </td>

                            <td className="p-3">
                                {course.status}
                            </td>

                            <td className="p-3 flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            course
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            course.id
                                        )
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

        </div>
    );
}