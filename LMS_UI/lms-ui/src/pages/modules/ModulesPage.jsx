import { useEffect, useState } from "react";

import {
    getAllModules,
    createModule,
    updateModule,
    completeModule
} from "../../api/moduleApi";

import {
    getAllCourses
} from "../../api/courseApi";

export default function ModulesPage() {

    const [modules, setModules] =
        useState([]);

    const [courses, setCourses] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            courseId: "",
            title: "",
            description: "",
            sequenceNo: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                moduleData,
                courseData
            ] = await Promise.all([
                getAllModules(),
                getAllCourses()
            ]);

            setModules(moduleData);
            setCourses(courseData);

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

            const payload = {
                ...formData,
                courseId:
                    Number(
                        formData.courseId
                    ),
                sequenceNo:
                    Number(
                        formData.sequenceNo
                    )
            };

            if (editingId) {

                await updateModule(
                    editingId,
                    payload
                );

            } else {

                await createModule(
                    payload
                );
            }

            setEditingId(null);

            setFormData({
                courseId: "",
                title: "",
                description: "",
                sequenceNo: ""
            });

            loadData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        module
    ) => {

        setEditingId(
            module.id
        );

        setFormData({
            courseId:
                module.courseId,
            title:
                module.title,
            description:
                module.description,
            sequenceNo:
                module.sequenceNo
        });
    };

    const handleComplete =
        async (id) => {

        if (
            !window.confirm(
                "Mark module completed?"
            )
        ) {
            return;
        }

        await completeModule(
            id
        );

        loadData();
    };

    const getCourseName = (
        id
    ) => {

        return courses.find(
            c => c.id === id
        )?.courseName || id;
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Modules
            </h2>

            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <select
                        name="courseId"
                        value={
                            formData.courseId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Course
                        </option>

                        {
                            courses.map(
                                course => (

                                <option
                                    key={
                                        course.id
                                    }
                                    value={
                                        course.id
                                    }
                                >
                                    {
                                        course.courseName
                                    }
                                </option>
                            ))
                        }

                    </select>

                    <input
                        name="title"
                        placeholder="Module Title"
                        value={
                            formData.title
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        name="description"
                        placeholder="Description"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="sequenceNo"
                        placeholder="Sequence No"
                        value={
                            formData.sequenceNo
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    />

                </div>

                <button
                    onClick={
                        handleSubmit
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    {
                        editingId
                            ? "Update Module"
                            : "Create Module"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr className="border-b">

                    <th>ID</th>
                    <th>Course</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Sequence</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    modules.map(
                        module => (

                        <tr
                            key={
                                module.id
                            }
                            className="border-b"
                        >

                            <td>
                                {module.id}
                            </td>

                            <td>
                                {
                                    getCourseName(
                                        module.courseId
                                    )
                                }
                            </td>

                            <td>
                                {module.title}
                            </td>

                            <td>
                                {
                                    module.description
                                }
                            </td>

                            <td>
                                {
                                    module.sequenceNo
                                }
                            </td>

                            <td>
                                {
                                    module.status
                                }
                            </td>

                            <td className="flex gap-2 p-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            module
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleComplete(
                                            module.id
                                        )
                                    }
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Complete
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