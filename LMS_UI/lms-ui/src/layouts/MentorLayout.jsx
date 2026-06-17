import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MentorLayout() {

  const menu = [
    {
      label: "Dashboard",
      path: "/mentor"
    },
    {
      label: "Students",
      path: "/mentor/students"
    },
    {
      label: "Attendance",
      path: "/mentor/attendance"
    },
    {
      label: "Progress",
      path: "/mentor/progress"
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