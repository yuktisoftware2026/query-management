import { useEffect, useState } from "react";

import {
    getAllSessions,
    createSession,
    updateSession,
    deleteSession
} from "../../api/sessionApi";

import {
    getAllBatches
} from "../../api/batchApi";

import {
    getAllModules
} from "../../api/moduleApi";

import {
    getAllFaculty
} from "../../api/facultyApi";

export default function SessionPage() {

    const [sessions, setSessions] =
        useState([]);

    const [batches, setBatches] =
        useState([]);

    const [modules, setModules] =
        useState([]);

    const [facultyList, setFacultyList] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            batchId: "",
            moduleId: "",
            title: "",
            sessionDate: "",
            startTime: "",
            endTime: "",
            createdBy: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const [
            sessionData,
            batchData,
            moduleData,
            facultyData
        ] = await Promise.all([
            getAllSessions(),
            getAllBatches(),
            getAllModules(),
            getAllFaculty()
        ]);

        setSessions(sessionData);
        setBatches(batchData);
        setModules(moduleData);
        setFacultyList(facultyData);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async () => {

        const payload = {
            ...formData,
            batchId:
                Number(formData.batchId),
            moduleId:
                Number(formData.moduleId),
            createdBy:
                Number(formData.createdBy)
        };

        if (editingId) {

            await updateSession(
                editingId,
                payload
            );

        } else {

            await createSession(
                payload
            );
        }

        setEditingId(null);

        setFormData({
            batchId: "",
            moduleId: "",
            title: "",
            sessionDate: "",
            startTime: "",
            endTime: "",
            createdBy: ""
        });

        loadData();
    };

    const handleEdit = (
        session
    ) => {

        setEditingId(
            session.id
        );

        setFormData({
            batchId:
                session.batchId,
            moduleId:
                session.moduleId,
            title:
                session.title,
            sessionDate:
                session.sessionDate,
            startTime:
                session.startTime,
            endTime:
                session.endTime,
            createdBy:
                session.createdBy
        });
    };

    const handleDelete =
        async (id) => {

        if (
            !window.confirm(
                "Delete Session?"
            )
        ) {
            return;
        }

        await deleteSession(id);

        loadData();
    };

    const getBatchName =
        (id) =>
            batches.find(
                b => b.id === id
            )?.batchName || id;

    const getModuleName =
        (id) =>
            modules.find(
                m => m.id === id
            )?.title || id;

    const getFacultyName =
        (id) =>
            facultyList.find(
                f => f.id === id
            )?.name || id;

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Sessions
            </h2>

            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <select
                        name="batchId"
                        value={formData.batchId}
                        onChange={handleChange}
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
                                    {batch.batchName}
                                </option>
                            ))
                        }
                    </select>

                    <select
                        name="moduleId"
                        value={formData.moduleId}
                        onChange={handleChange}
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
                                    {module.title}
                                </option>
                            ))
                        }
                    </select>

                    <input
                        name="title"
                        placeholder="Session Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="sessionDate"
                        value={formData.sessionDate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <select
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="">
                            Select Faculty
                        </option>

                        {
                            facultyList.map(
                                faculty => (
                                <option
                                    key={faculty.id}
                                    value={faculty.id}
                                >
                                    {faculty.name}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    {
                        editingId
                            ? "Update Session"
                            : "Create Session"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Batch</th>
                    <th>Module</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Faculty</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {
                    sessions.map(
                        session => (

                        <tr
                            key={session.id}
                        >
                            <td>{session.id}</td>

                            <td>
                                {
                                    getBatchName(
                                        session.batchId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getModuleName(
                                        session.moduleId
                                    )
                                }
                            </td>

                            <td>
                                {session.title}
                            </td>

                            <td>
                                {
                                    session.sessionDate
                                }
                            </td>

                            <td>
                                {
                                    getFacultyName(
                                        session.createdBy
                                    )
                                }
                            </td>

                            <td className="flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            session
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            session.id
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