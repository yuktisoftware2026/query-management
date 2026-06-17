import { useEffect, useState } from "react";
import { getAllAttendance } from "../../api/attendanceApi";

export default function MentorAttendancePage() {

  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {

    try {

      const data =
        await getAllAttendance();

      setAttendance(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Student Attendance
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Session
              </th>

              <th className="p-3 text-left">
                Student
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Remarks
              </th>

            </tr>

          </thead>

          <tbody>

            {
              attendance.map(record => (

                <tr
                  key={record.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {record.id}
                  </td>

                  <td className="p-3">
                    {record.sessionId}
                  </td>

                  <td className="p-3">
                    {record.studentId}
                  </td>

                  <td className="p-3">
                    {record.status}
                  </td>

                  <td className="p-3">
                    {record.remarks}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}