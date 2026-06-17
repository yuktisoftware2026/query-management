import { useEffect, useState } from "react";

import {
    getAllNotes,
    createNotes,
    updateNotes,
    deleteNotes
} from "../../api/notesApi";

import {
    getAllModules
} from "../../api/moduleApi";

import {
    getAllBatches
} from "../../api/batchApi";

import {
    getAllFaculty
} from "../../api/facultyApi";

export default function NotesPage() {

    const [notes, setNotes] =
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
            fileUrl: "",
            uploadedBy: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                notesData,
                moduleData,
                batchData,
                facultyData
            ] = await Promise.all([
                getAllNotes(),
                getAllModules(),
                getAllBatches(),
                getAllFaculty()
            ]);

            setNotes(notesData);
            setModules(moduleData);
            setBatches(batchData);
            setFacultyList(facultyData);

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
                moduleId:
                    Number(formData.moduleId),
                batchId:
                    Number(formData.batchId),
                uploadedBy:
                    Number(formData.uploadedBy)
            };

            if (editingId) {

                await updateNotes(
                    editingId,
                    payload
                );

            } else {

                await createNotes(
                    payload
                );
            }

            setEditingId(null);

            setFormData({
                moduleId: "",
                batchId: "",
                title: "",
                description: "",
                fileUrl: "",
                uploadedBy: ""
            });

            loadData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        note
    ) => {

        setEditingId(note.id);

        setFormData({
            moduleId:
                note.moduleId,
            batchId:
                note.batchId,
            title:
                note.title,
            description:
                note.description,
            fileUrl:
                note.fileUrl,
            uploadedBy:
                note.uploadedBy
        });
    };

    const handleDelete =
        async (id) => {

        if (
            !window.confirm(
                "Deactivate Note?"
            )
        ) {
            return;
        }

        await deleteNotes(id);

        loadData();
    };

    const getModuleName = (
        id
    ) =>
        modules.find(
            m => m.id === id
        )?.title || id;

    const getBatchName = (
        id
    ) =>
        batches.find(
            b => b.id === id
        )?.batchName || id;

    const getFacultyName = (
        id
    ) =>
        facultyList.find(
            f => f.id === id
        )?.name || id;

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Notes
            </h2>

            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

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

                    <input
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="fileUrl"
                        placeholder="File URL"
                        value={formData.fileUrl}
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

                    <select
                        name="uploadedBy"
                        value={formData.uploadedBy}
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
                            ? "Update Notes"
                            : "Create Notes"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr className="border-b">

                    <th>ID</th>
                    <th>Module</th>
                    <th>Batch</th>
                    <th>Title</th>
                    <th>File</th>
                    <th>Uploaded By</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    notes.map(
                        note => (

                        <tr
                            key={note.id}
                            className="border-b"
                        >

                            <td>{note.id}</td>

                            <td>
                                {
                                    getModuleName(
                                        note.moduleId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getBatchName(
                                        note.batchId
                                    )
                                }
                            </td>

                            <td>
                                {note.title}
                            </td>

                            <td>
                                {note.fileUrl}
                            </td>

                            <td>
                                {
                                    getFacultyName(
                                        note.uploadedBy
                                    )
                                }
                            </td>

                            <td>
                                {note.status}
                            </td>

                            <td className="flex gap-2 p-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            note
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            note.id
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