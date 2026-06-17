import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const response =
        await api.get("/api/admin/dashboard");

      setDashboard(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <Card
          title="Students"
          value={dashboard.totalStudents}
        />

        <Card
          title="Faculty"
          value={dashboard.totalFaculty}
        />

        <Card
          title="Mentors"
          value={dashboard.totalMentors}
        />

        <Card
          title="Courses"
          value={dashboard.totalCourses}
        />

        <Card
          title="Batches"
          value={dashboard.totalBatches}
        />

        <Card
          title="Active Batches"
          value={dashboard.activeBatches}
        />

        <Card
          title="Inactive Batches"
          value={dashboard.inactiveBatches}
        />

      </div>
    </div>
  );
}

function Card({ title, value }) {

  return (
    <div className="bg-white p-5 rounded shadow">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}