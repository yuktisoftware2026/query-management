export default function DashboardCard({
  title,
  value
}) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      hover:shadow-lg
      transition"
    >

      <h3
        className="
        text-gray-500
        text-lg
        mb-2"
      >
        {title}
      </h3>

      <p
        className="
        text-4xl
        font-bold
        text-blue-600"
      >
        {value}
      </p>

    </div>

  );
}