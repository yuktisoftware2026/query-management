import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function FacultyLayout() {

  const menu = [
    {
      label: "Dashboard",
      path: "/faculty"
    },
    {
      label: "Modules",
      path: "/faculty/modules"
    },
    {
      label: "Notes",
      path: "/faculty/notes"
    },
    {
      label: "Assignments",
      path: "/faculty/assignments"
    },
    {
      label: "Sessions",
      path: "/faculty/sessions"
    },
    {
      label: "Attendance",
      path: "/faculty/attendance"
    },
    {
      label: "Submissions",
      path: "/faculty/submissions"
    }
  ];

  return (
    <div className="flex">

      <Sidebar menu={menu} />

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}