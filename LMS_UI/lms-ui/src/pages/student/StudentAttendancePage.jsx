import { useEffect, useState } from "react";

import {
  getAllAttendance
} from "../../api/attendanceApi";

export default function StudentAttendancePage() {

  const [attendance,
  setAttendance] =
  useState([]);

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance =
  async () => {

    const data =
      await getAllAttendance();

    setAttendance(data);
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        My Attendance
      </h1>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr>

              <th className="p-3">
                Session
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Remarks
              </th>

            </tr>

          </thead>

          <tbody>

            {
              attendance.map(
                record => (

                <tr
                  key={record.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      record.sessionId
                    }
                  </td>

                  <td className="p-3">
                    {
                      record.status
                    }
                  </td>

                  <td className="p-3">
                    {
                      record.remarks
                    }
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