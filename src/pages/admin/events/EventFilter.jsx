import { FaSearch } from "react-icons/fa";

const categories = [
  "All",
  "Conference",
  "Workshop",
  "Training",
  "Seminar",
  "Meeting",
  "Research",
  "Community Outreach",
  "Sports",
  "Career Development",
  "Other",
];

export default function EventFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <section className="bg-white py-8 border-b">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Search */}

          <div className="relative">

            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            {categories.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>

      </div>

    </section>
  );
}