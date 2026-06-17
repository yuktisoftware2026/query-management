import { Link } from "react-router-dom";

export default function HomePage() {

  const portals = [
    {
      title: "Admin Portal",
      path: "/admin"
    },
    {
      title: "Faculty Portal",
      path: "/faculty"
    },
    {
      title: "Mentor Portal",
      path: "/mentor"
    },
    {
      title: "Student Portal",
      path: "/student"
    }
  ];

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-6xl">

        <h1 className="text-5xl font-bold text-center mb-10">
          LMS Portal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {
            portals.map(portal => (

              <Link
                key={portal.title}
                to={portal.path}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {portal.title}
                </h2>

                <p className="text-gray-500">
                  Open Dashboard
                </p>

              </Link>

            ))
          }

        </div>

      </div>

    </div>
  );
}