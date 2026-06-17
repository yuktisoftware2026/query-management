import { useEffect, useState } from "react";

import {
  getAllAssignments
} from "../../api/assignmentApi";

export default function StudentAssignmentsPage() {

  const [assignments,
  setAssignments] =
  useState([]);

  useEffect(() => {

    loadAssignments();

  }, []);

  const loadAssignments =
  async () => {

    const data =
      await getAllAssignments();

    setAssignments(data);
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Assignments
      </h1>

      <div className="grid gap-4">

        {
          assignments.map(
            assignment => (

            <div
              key={assignment.id}
              className="
              bg-white
              p-5
              rounded-xl
              shadow"
            >

              <h3
                className="
                text-xl
                font-semibold"
              >
                {assignment.title}
              </h3>

              <p className="mt-2">
                {
                  assignment.description
                }
              </p>

              <p
                className="
                text-sm
                text-gray-500
                mt-2"
              >
                Due:
                {" "}
                {
                  assignment.dueDate
                }
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );
}