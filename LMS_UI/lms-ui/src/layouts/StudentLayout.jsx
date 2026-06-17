import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {

const menu = [
  {
    label: "Dashboard",
    path: "/student"
  },
  {
    label: "Notes",
    path: "/student/notes"
  },
  {
    label: "Assignments",
    path: "/student/assignments"
  },
  {
    label: "Submissions",
    path: "/student/submissions"
  },
  {
    label: "Attendance",
    path: "/student/attendance"
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