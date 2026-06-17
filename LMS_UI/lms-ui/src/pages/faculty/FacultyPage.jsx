import { useEffect, useState } from "react";

import {
    getAllFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty
} from "../../api/facultyApi";

export default function FacultyPage() {

    const [facultyList, setFacultyList] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            specialization: ""
        });

    useEffect(() => {
        loadFaculty();
    }, []);

    const loadFaculty = async () => {

        try {

            const data =
                await getAllFaculty();

            setFacultyList(data);

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

                await updateFaculty(
                    editingId,
                    formData
                );

            } else {

                await createFaculty(
                    formData
                );
            }

            setFormData({
                name: "",
                email: "",
                phone: "",
                specialization: ""
            });

            setEditingId(null);

            loadFaculty();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        faculty
    ) => {

        setEditingId(
            faculty.id
        );

        setFormData({
            name:
                faculty.name,
            email:
                faculty.email,
            phone:
                faculty.phone,
            specialization:
                faculty.specialization
        });
    };

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Deactivate Faculty?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteFaculty(
                id
            );

            loadFaculty();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Faculty
            </h2>

            <div className="bg-white p-5 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
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
                            ? "Update Faculty"
                            : "Add Faculty"
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
                        Name
                    </th>

                    <th className="p-3">
                        Email
                    </th>

                    <th className="p-3">
                        Phone
                    </th>

                    <th className="p-3">
                        Specialization
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
                    facultyList.map(
                        (faculty) => (

                        <tr
                            key={faculty.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {faculty.id}
                            </td>

                            <td className="p-3">
                                {faculty.name}
                            </td>

                            <td className="p-3">
                                {faculty.email}
                            </td>

                            <td className="p-3">
                                {faculty.phone}
                            </td>

                            <td className="p-3">
                                {faculty.specialization}
                            </td>

                            <td className="p-3">
                                {faculty.status}
                            </td>

                            <td className="p-3 flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            faculty
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            faculty.id
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