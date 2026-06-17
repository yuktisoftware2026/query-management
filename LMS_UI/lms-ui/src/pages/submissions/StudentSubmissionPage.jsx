import { useEffect, useState } from "react";

import {
  getAllSubmissions,
  createSubmission
} from "../../api/submissionApi";

import {
  getAllAssignments
} from "../../api/assignmentApi";

import {
  getAllStudents
} from "../../api/studentApi";

export default function StudentSubmissionPage() {

  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    assignmentId: "",
    studentId: "",
    submissionType: "",
    githubLink: "",
    fileUrl: "",
    codeSnippet: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [
        submissionData,
        assignmentData,
        studentData
      ] = await Promise.all([
        getAllSubmissions(),
        getAllAssignments(),
        getAllStudents()
      ]);

      setSubmissions(submissionData);
      setAssignments(assignmentData);
      setStudents(studentData);

    } catch (error) {

      console.error(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    try {

      const payload = {
        ...formData,
        assignmentId: Number(formData.assignmentId),
        studentId: Number(formData.studentId)
      };

      await createSubmission(payload);

      setFormData({
        assignmentId: "",
        studentId: "",
        submissionType: "",
        githubLink: "",
        fileUrl: "",
        codeSnippet: ""
      });

      loadData();

    } catch (error) {

      console.error(error);

    }
  };

  const getAssignmentName = (id) =>
    assignments.find(
      assignment => assignment.id === id
    )?.title || id;

  const getStudentName = (id) =>
    students.find(
      student => student.id === id
    )?.name || id;

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Submit Assignment
      </h2>

      <div className="bg-white p-6 rounded shadow mb-6">

        <div className="grid grid-cols-2 gap-4">

          <select
            name="assignmentId"
            value={formData.assignmentId}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            <option value="">
              Select Assignment
            </option>

            {
              assignments.map(assignment => (

                <option
                  key={assignment.id}
                  value={assignment.id}
                >
                  {assignment.title}
                </option>

              ))
            }

          </select>

          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            <option value="">
              Select Student
            </option>

            {
              students.map(student => (

                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </option>

              ))
            }

          </select>

          <input
            name="submissionType"
            placeholder="Submission Type"
            value={formData.submissionType}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="githubLink"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="fileUrl"
            placeholder="File URL"
            value={formData.fileUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="codeSnippet"
            placeholder="Code Snippet"
            value={formData.codeSnippet}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Submit Assignment
        </button>

      </div>

      <table className="w-full bg-white rounded shadow">

        <thead>

          <tr className="border-b">

            <th>ID</th>
            <th>Assignment</th>
            <th>Student</th>
            <th>Type</th>
            <th>Github</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            submissions.map(submission => (

              <tr
                key={submission.id}
                className="border-b"
              >

                <td>{submission.id}</td>

                <td>
                  {
                    getAssignmentName(
                      submission.assignmentId
                    )
                  }
                </td>

                <td>
                  {
                    getStudentName(
                      submission.studentId
                    )
                  }
                </td>

                <td>
                  {
                    submission.submissionType
                  }
                </td>

                <td>
                  {
                    submission.githubLink
                  }
                </td>

                <td>
                  {
                    submission.status
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