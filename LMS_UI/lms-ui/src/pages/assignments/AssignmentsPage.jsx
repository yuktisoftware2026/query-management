import { useEffect, useState } from "react";

import {
    getAllAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from "../../api/assignmentApi";

import {
    getAllModules
} from "../../api/moduleApi";

import {
    getAllBatches
} from "../../api/batchApi";

import {
    getAllFaculty
} from "../../api/facultyApi";

export default function AssignmentPage() {

    const [assignments, setAssignments] =
        useState([]);

    const [modules, setModules] =
        useState([]);

    const [batches, setBatches] =
        useState([]);

    const [facultyList, setFacultyList] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            moduleId: "",
            batchId: "",
            title: "",
            description: "",
            createdBy: "",
            dueDate: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const [
            assignmentData,
            moduleData,
            batchData,
            facultyData
        ] = await Promise.all([
            getAllAssignments(),
            getAllModules(),
            getAllBatches(),
            getAllFaculty()
        ]);

        setAssignments(
            assignmentData
        );

        setModules(
            moduleData
        );

        setBatches(
            batchData
        );

        setFacultyList(
            facultyData
        );
    };

    const handleChange = (
        e
    ) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async () => {

        const payload = {
            ...formData,
            moduleId:
                Number(
                    formData.moduleId
                ),
            batchId:
                Number(
                    formData.batchId
                ),
            createdBy:
                Number(
                    formData.createdBy
                )
        };

        if (editingId) {

            await updateAssignment(
                editingId,
                payload
            );

        } else {

            await createAssignment(
                payload
            );
        }

        setEditingId(null);

        setFormData({
            moduleId: "",
            batchId: "",
            title: "",
            description: "",
            createdBy: "",
            dueDate: ""
        });

        loadData();
    };

    const handleEdit = (
        assignment
    ) => {

        setEditingId(
            assignment.id
        );

        setFormData({
            moduleId:
                assignment.moduleId,
            batchId:
                assignment.batchId,
            title:
                assignment.title,
            description:
                assignment.description,
            createdBy:
                assignment.createdBy,
            dueDate:
                assignment.dueDate
                    ?.slice(0,16)
        });
    };

    const handleDelete =
        async (id) => {

        if (
            !window.confirm(
                "Deactivate Assignment?"
            )
        ) {
            return;
        }

        await deleteAssignment(
            id
        );

        loadData();
    };

    const getModuleName =
        (id) =>
            modules.find(
                m => m.id === id
            )?.title || id;

    const getBatchName =
        (id) =>
            batches.find(
                b => b.id === id
            )?.batchName || id;

    const getFacultyName =
        (id) =>
            facultyList.find(
                f => f.id === id
            )?.name || id;

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Assignments
            </h2>

            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <select
                        name="moduleId"
                        value={
                            formData.moduleId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Module
                        </option>

                        {
                            modules.map(
                                module => (

                                <option
                                    key={module.id}
                                    value={module.id}
                                >
                                    {
                                        module.title
                                    }
                                </option>
                            ))
                        }

                    </select>

                    <select
                        name="batchId"
                        value={
                            formData.batchId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Batch
                        </option>

                        {
                            batches.map(
                                batch => (

                                <option
                                    key={batch.id}
                                    value={batch.id}
                                >
                                    {
                                        batch.batchName
                                    }
                                </option>
                            ))
                        }

                    </select>

                    <input
                        name="title"
                        placeholder="Title"
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

                    <select
                        name="createdBy"
                        value={
                            formData.createdBy
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

                    <input
                        type="datetime-local"
                        name="dueDate"
                        value={
                            formData.dueDate
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
                            ? "Update Assignment"
                            : "Create Assignment"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Module</th>
                    <th>Batch</th>
                    <th>Title</th>
                    <th>Faculty</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    assignments.map(
                        assignment => (

                        <tr
                            key={
                                assignment.id
                            }
                        >

                            <td>
                                {
                                    assignment.id
                                }
                            </td>

                            <td>
                                {
                                    getModuleName(
                                        assignment.moduleId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getBatchName(
                                        assignment.batchId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    assignment.title
                                }
                            </td>

                            <td>
                                {
                                    getFacultyName(
                                        assignment.createdBy
                                    )
                                }
                            </td>

                            <td>
                                {
                                    assignment.dueDate
                                }
                            </td>

                            <td>
                                {
                                    assignment.status
                                }
                            </td>

                            <td className="flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            assignment
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            assignment.id
                                        )
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Deactivate
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