import { useEffect, useState } from "react";

import {
    getAllMentors,
    createMentor,
    updateMentor,
    deleteMentor
} from "../../api/mentorApi";

export default function MentorPage() {

    const [mentorList, setMentorList] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            expertise: ""
        });

    useEffect(() => {
        loadMentors();
    }, []);

    const loadMentors = async () => {

        try {

            const data =
                await getAllMentors();

            setMentorList(data);

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

                await updateMentor(
                    editingId,
                    formData
                );

            } else {

                await createMentor(
                    formData
                );
            }

            setFormData({
                name: "",
                email: "",
                phone: "",
                expertise: ""
            });

            setEditingId(null);

            loadMentors();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        mentor
    ) => {

        setEditingId(
            mentor.id
        );

        setFormData({
            name: mentor.name,
            email: mentor.email,
            phone: mentor.phone,
            expertise: mentor.expertise
        });
    };

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Deactivate Mentor?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteMentor(
                id
            );

            loadMentors();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Mentors
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
                        name="expertise"
                        placeholder="Expertise"
                        value={formData.expertise}
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
                            ? "Update Mentor"
                            : "Add Mentor"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr className="border-b">

                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Expertise</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    mentorList.map(
                        (mentor) => (

                        <tr
                            key={mentor.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {mentor.id}
                            </td>

                            <td className="p-3">
                                {mentor.name}
                            </td>

                            <td className="p-3">
                                {mentor.email}
                            </td>

                            <td className="p-3">
                                {mentor.phone}
                            </td>

                            <td className="p-3">
                                {mentor.expertise}
                            </td>

                            <td className="p-3">
                                {mentor.status}
                            </td>

                            <td className="p-3 flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            mentor
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            mentor.id
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