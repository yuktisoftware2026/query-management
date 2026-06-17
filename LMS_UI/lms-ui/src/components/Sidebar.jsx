import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ menu }) {

  const location = useLocation();

  return (

    <div className="w-64 min-h-screen bg-slate-900 text-white">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <Link
          to="/"
          className="
          text-3xl
          font-bold
          tracking-wide
          hover:text-blue-400
          transition"
        >
          LMS
        </Link>

      </div>

      {/* Menu */}

      <div className="py-4">

        {
          menu.map(item => (

            <Link
              key={item.path}
              to={item.path}
              className={`
                block
                px-6
                py-3
                transition
                font-medium

                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-gray-200"
                }
              `}
            >
              {item.label}
            </Link>

          ))
        }

      </div>

    </div>

  );
}