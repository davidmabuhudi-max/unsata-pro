import eventCategories from "../../data/eventCategories";

export default function EventFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {

  return (

    <section className="py-10 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-6">

          <input
  type="text"
  placeholder="Search event..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border rounded-xl p-4"
/>

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border rounded-xl p-4"
>

            {eventCategories.map(category => (

              <option
                key={category}
              >
                {category}
              </option>

            ))}

          </select>

        </div>

      </div>

    </section>

  );

}