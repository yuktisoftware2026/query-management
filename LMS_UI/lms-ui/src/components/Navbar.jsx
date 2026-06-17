export default function Navbar({
  title
}) {

  return (

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-gray-600">
          LMS Portal
        </div>

        <div
          className="
          w-10
          h-10
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          font-bold"
        >
          A
        </div>

      </div>

    </div>

  );
}