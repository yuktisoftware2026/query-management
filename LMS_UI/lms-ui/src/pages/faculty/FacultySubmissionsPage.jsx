import { useEffect, useState } from "react";

import {
  getAllSubmissions,
  reviewSubmission
} from "../../api/submissionApi";

export default function FacultySubmissionsPage() {

  const [submissions,
  setSubmissions] =
  useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const data =
      await getAllSubmissions();

    setSubmissions(data);
  };

  const handleReview =
  async (id) => {

    const marks =
      prompt("Marks");

    if (!marks) return;

    const feedback =
      prompt("Feedback");

    if (!feedback) return;

    await reviewSubmission(
      id,
      marks,
      feedback
    );

    loadData();
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Submission Review
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr>

            <th>ID</th>
            <th>Assignment</th>
            <th>Student</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {
            submissions.map(
              submission => (

              <tr key={submission.id}>

                <td>
                  {submission.id}
                </td>

                <td>
                  {
                    submission.assignmentId
                  }
                </td>

                <td>
                  {
                    submission.studentId
                  }
                </td>

                <td>
                  {
                    submission.status
                  }
                </td>

                <td>
                  {
                    submission.marks
                  }
                </td>

                <td>

                  {
                    submission.status !==
                    "REVIEWED" && (

                    <button
                      onClick={() =>
                        handleReview(
                          submission.id
                        )
                      }
                      className="
                      bg-green-600
                      text-white
                      px-3
                      py-1
                      rounded"
                    >
                      Review
                    </button>

                    )
                  }

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}