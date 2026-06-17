import { useEffect, useState } from "react";

import {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent
} from "../../api/studentApi";

export default function StudentsPage() {

    const [students, setStudents] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: ""
        });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            const data =
                await getAllStudents();

            setStudents(data);

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

                await updateStudent(
                    editingId,
                    formData
                );

            } else {

                await createStudent(
                    formData
                );
            }

            setFormData({
                name: "",
                email: "",
                phone: ""
            });

            setEditingId(null);

            loadStudents();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (
        student
    ) => {

        setEditingId(student.id);

        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone
        });
    };

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Deactivate Student?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteStudent(id);

            loadStudents();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Students
            </h2>

            <div className="bg-white p-5 rounded shadow mb-6">

                <div className="grid grid-cols-3 gap-4">

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

                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    {
                        editingId
                            ? "Update Student"
                            : "Add Student"
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
                        Status
                    </th>

                    <th className="p-3">
                        Actions
                    </th>

                </tr>

                </thead>

                <tbody>

                {
                    students.map(
                        (student) => (

                        <tr
                            key={student.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {student.id}
                            </td>

                            <td className="p-3">
                                {student.name}
                            </td>

                            <td className="p-3">
                                {student.email}
                            </td>

                            <td className="p-3">
                                {student.phone}
                            </td>

                            <td className="p-3">
                                {student.status}
                            </td>

                            <td className="p-3 flex gap-2">

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            student
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            student.id
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