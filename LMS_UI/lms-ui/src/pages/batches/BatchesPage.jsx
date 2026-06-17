import { useEffect, useState } from "react";

import {
    getAllBatches,
    createBatch,
    updateBatch,
    deleteBatch
} from "../../api/batchApi";

import {
    getAllCourses
} from "../../api/courseApi";

import {
    getAllFaculty
} from "../../api/facultyApi";

import {
    getAllMentors
} from "../../api/mentorApi";

export default function BatchPage() {

    const [batches, setBatches] =
        useState([]);

    const [courses, setCourses] =
        useState([]);

    const [facultyList, setFacultyList] =
        useState([]);

    const [mentorList, setMentorList] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            courseId: "",
            batchName: "",
            description: "",
            facultyId: "",
            mentorId: "",
            startDate: "",
            endDate: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                batchData,
                courseData,
                facultyData,
                mentorData
            ] = await Promise.all([
                getAllBatches(),
                getAllCourses(),
                getAllFaculty(),
                getAllMentors()
            ]);

            setBatches(batchData);
            setCourses(courseData);
            setFacultyList(facultyData);
            setMentorList(mentorData);

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
                facultyId:
                    Number(
                        formData.facultyId
                    ),
                mentorId:
                    Number(
                        formData.mentorId
                    )
            };

            if (editingId) {

                await updateBatch(
                    editingId,
                    payload
                );

            } else {

                await createBatch(
                    payload
                );
            }

            setEditingId(null);

            setFormData({
                courseId: "",
                batchName: "",
                description: "",
                facultyId: "",
                mentorId: "",
                startDate: "",
                endDate: ""
            });

            loadData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        batch
    ) => {

        setEditingId(
            batch.id
        );

        setFormData({
            courseId:
                batch.courseId,
            batchName:
                batch.batchName,
            description:
                batch.description,
            facultyId:
                batch.facultyId,
            mentorId:
                batch.mentorId,
            startDate: "",
            endDate: ""
        });
    };

    const handleDelete = async (
        id
    ) => {

        if (
            !window.confirm(
                "Archive Batch?"
            )
        ) {
            return;
        }

        await deleteBatch(id);

        loadData();
    };

    const getCourseName = (
        id
    ) => {

        return courses.find(
            c => c.id === id
        )?.courseName || id;
    };

    const getFacultyName = (
        id
    ) => {

        return facultyList.find(
            f => f.id === id
        )?.name || id;
    };

    const getMentorName = (
        id
    ) => {

        return mentorList.find(
            m => m.id === id
        )?.name || id;
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Batch Management
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
                        name="batchName"
                        placeholder="Batch Name"
                        value={
                            formData.batchName
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

                    <select
                        name="facultyId"
                        value={
                            formData.facultyId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Faculty
                        </option>

                        {
                            facultyList.map(
                                faculty => (

                                <option
                                    key={
                                        faculty.id
                                    }
                                    value={
                                        faculty.id
                                    }
                                >
                                    {
                                        faculty.name
                                    }
                                </option>
                            ))
                        }

                    </select>

                    <select
                        name="mentorId"
                        value={
                            formData.mentorId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Mentor
                        </option>

                        {
                            mentorList.map(
                                mentor => (

                                <option
                                    key={
                                        mentor.id
                                    }
                                    value={
                                        mentor.id
                                    }
                                >
                                    {
                                        mentor.name
                                    }
                                </option>
                            ))
                        }

                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={
                            formData.startDate
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={
                            formData.endDate
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
                            ? "Update Batch"
                            : "Create Batch"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr className="border-b">

                    <th>ID</th>
                    <th>Batch</th>
                    <th>Course</th>
                    <th>Faculty</th>
                    <th>Mentor</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    batches.map(
                        batch => (

                        <tr
                            key={
                                batch.id
                            }
                            className="border-b"
                        >

                            <td>
                                {batch.id}
                            </td>

                            <td>
                                {
                                    batch.batchName
                                }
                            </td>

                            <td>
                                {
                                    getCourseName(
                                        batch.courseId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getFacultyName(
                                        batch.facultyId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getMentorName(
                                        batch.mentorId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    batch.status
                                }
                            </td>

                            <td className="flex gap-2 p-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            batch
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            batch.id
                                        )
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Archive
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