import { useEffect, useState } from "react";

import {
    getAllAttendance,
    createAttendance,
    updateAttendance
} from "../../api/attendanceApi";

import {
    getAllSessions
} from "../../api/sessionApi";

import {
    getAllStudents
} from "../../api/studentApi";

export default function AttendancePage() {

    const [attendanceList, setAttendanceList] =
        useState([]);

    const [sessions, setSessions] =
        useState([]);

    const [students, setStudents] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            sessionId: "",
            studentId: "",
            status: "PRESENT",
            remarks: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const [
            attendanceData,
            sessionData,
            studentData
        ] = await Promise.all([
            getAllAttendance(),
            getAllSessions(),
            getAllStudents()
        ]);

        setAttendanceList(
            attendanceData
        );

        setSessions(
            sessionData
        );

        setStudents(
            studentData
        );
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
            sessionId:
                Number(
                    formData.sessionId
                ),
            studentId:
                Number(
                    formData.studentId
                )
        };

        if (editingId) {

            await updateAttendance(
                editingId,
                payload
            );

        } else {

            await createAttendance(
                payload
            );
        }

        setEditingId(null);

        setFormData({
            sessionId: "",
            studentId: "",
            status: "PRESENT",
            remarks: ""
        });

        loadData();
    };

    const handleEdit = (
        attendance
    ) => {

        setEditingId(
            attendance.id
        );

        setFormData({
            sessionId:
                attendance.sessionId,
            studentId:
                attendance.studentId,
            status:
                attendance.status,
            remarks:
                attendance.remarks
        });
    };

    const getSessionName =
        (id) =>
            sessions.find(
                s => s.id === id
            )?.title || id;

    const getStudentName =
        (id) =>
            students.find(
                s => s.id === id
            )?.name || id;

    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                Attendance
            </h2>

            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-2 gap-4">

                    <select
                        name="sessionId"
                        value={
                            formData.sessionId
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Select Session
                        </option>

                        {
                            sessions.map(
                                session => (

                                <option
                                    key={
                                        session.id
                                    }
                                    value={
                                        session.id
                                    }
                                >
                                    {
                                        session.title
                                    }
                                </option>
                            ))
                        }

                    </select>

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
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                    >

                        <option value="PRESENT">
                            PRESENT
                        </option>

                        <option value="ABSENT">
                            ABSENT
                        </option>

                        <option value="LATE">
                            LATE
                        </option>

                    </select>

                    <input
                        name="remarks"
                        placeholder="Remarks"
                        value={
                            formData.remarks
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
                            ? "Update Attendance"
                            : "Mark Attendance"
                    }
                </button>

            </div>

            <table className="w-full bg-white rounded shadow">

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Session</th>
                    <th>Student</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {
                    attendanceList.map(
                        attendance => (

                        <tr
                            key={
                                attendance.id
                            }
                        >

                            <td>
                                {
                                    attendance.id
                                }
                            </td>

                            <td>
                                {
                                    getSessionName(
                                        attendance.sessionId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    getStudentName(
                                        attendance.studentId
                                    )
                                }
                            </td>

                            <td>
                                {
                                    attendance.status
                                }
                            </td>

                            <td>
                                {
                                    attendance.remarks
                                }
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            attendance
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
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