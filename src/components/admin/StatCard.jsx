import { FaArrowTrendUp } from "react-icons/fa6";

export default function StatCard({
  title,
  value,
  number,
  color = "#2563EB",
  icon,
}) {
  // Supports both "value" and "number"
  const displayValue = value ?? number ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex items-start justify-between">

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md"
          style={{
            backgroundColor: color,
          }}
        >
          {icon || <FaArrowTrendUp size={26} />}
        </div>

        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            color,
            backgroundColor: `${color}20`,
          }}
        >
          Live
        </span>

      </div>

      <div className="mt-6">

        <h2
          className="text-5xl font-extrabold leading-none"
          style={{
            color,
          }}
        >
          {displayValue}
        </h2>

        <p className="mt-3 text-sm font-medium text-slate-500">
          {title}
        </p>

      </div>

    </div>
  );
}