import { useEffect, useState } from "react";
import { getAllStudents } from "../../api/studentApi";

export default function MentorStudentsPage() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Assigned Students
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {
              students.map(student => (

                <tr
                  key={student.id}
                  className="border-t"
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

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}