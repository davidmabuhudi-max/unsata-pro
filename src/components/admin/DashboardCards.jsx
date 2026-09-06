export default function DashboardCards({ members }) {

  const total = members.length;

  const pending = members.filter(
    m => m.status === "Pending"
  ).length;

  const approved = members.filter(
    m => m.status === "Approved"
  ).length;

  const rejected = members.filter(
    m => m.status === "Rejected"
  ).length;

  const cards = [
    {
      title: "Total Members",
      value: total,
      color: "bg-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: approved,
      color: "bg-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      color: "bg-red-600",
    },
  ];

  return (

    <div className="grid md:grid-cols-4 gap-6 mb-10">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.color} rounded-3xl p-8 text-white shadow-lg`}
        >

          <h2 className="text-lg">

            {card.title}

          </h2>

          <p className="text-5xl font-black mt-4">

            {card.value}

          </p>

        </div>

      ))}

    </div>

  );

}