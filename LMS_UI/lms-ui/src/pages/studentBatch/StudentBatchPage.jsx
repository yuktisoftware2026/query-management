import { useEffect, useState } from "react";

import {
    getAllMappings,
    assignStudent,
    removeStudent
} from "../../api/studentBatchApi";

import {
    getAllStudents
} from "../../api/studentApi";

import {
    getAllBatches
} from "../../api/batchApi";

export default function StudentBatchPage() {

    const [students, setStudents] =
        useState([]);

    const [batches, setBatches] =
        useState([]);

    const [mappings, setMappings] =
        useState([]);

    const [formData, setFormData] =
        useState({
            studentId: "",
            batchId: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                studentData,
                batchData,
                mappingData
            ] = await Promise.all([
                getAllStudents(),
                getAllBatches(),
                getAllMappings()
            ]);

            setStudents(studentData);
            setBatches(batchData);
            setMappings(mappingData);

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

    const handleAssign =
        async () => {

        try {

            await assignStudent(
                formData
            );

            setFormData({
                studentId: "",
                batchId: ""
            });

            loadData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleRemove =
        async (id) => {

        if (
            !window.confirm(
                "Remove Student from Batch?"
            )
        ) {
            return;
        }

        try {

            await removeStudent(
                id
            );

            loadData();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Student Batch Mapping
            </h2>

            <div className="bg-white p-5 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <select
                        name="studentId"
                        value={
                            formData.studentId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Student
                        </option>

                        {
                            students.map(
                                student => (

                                <option
                                    key={
                                        student.id
                                    }
                                    value={
                                        student.id
                                    }
                                >
                                    {
                                        student.name
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
                                    key={
                                        batch.id
                                    }
                                    value={
                                        batch.id
                                    }
                                >
                                    {
                                        batch.batchName
                                    }
                                </option>
                            ))
                        }

                    </select>

                </div>

                <button
                    onClick={
                        handleAssign
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    Assign Student
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>
                        Student ID
                    </th>

                    <th>
                        Batch ID
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

                </thead>

                <tbody>

                {
                    mappings.map(
                        mapping => (

                        <tr
                            key={
                                mapping.id
                            }
                        >

                            <td>
                                {mapping.id}
                            </td>

                            <td>
                                {
                                    mapping.studentId
                                }
                            </td>

                            <td>
                                {
                                    mapping.batchId
                                }
                            </td>

                            <td>
                                {
                                    mapping.status
                                }
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleRemove(
                                            mapping.id
                                        )
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
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