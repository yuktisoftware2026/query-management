import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  const menu = [
    {
      label: "Dashboard",
      path: "/admin"
    },
    {
      label: "Students",
      path: "/admin/students"
    },
    {
      label: "Faculty",
      path: "/admin/faculty"
    },
    {
      label: "Mentors",
      path: "/admin/mentors"
    },
    {
      label: "Courses",
      path: "/admin/courses"
    },
    {
      label: "Batches",
      path: "/admin/batches"
    }
  ];

  return (

    <div className="flex">

      <Sidebar menu={menu} />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Navbar
          title="Admin Portal"
        />

        <div className="p-6">

          <Outlet />

        </div>

      </div>

    </div>

  );
}