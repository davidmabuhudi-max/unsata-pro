import { FaPlus, FaTrash } from "react-icons/fa";

export default function AboutStatistics({
  data,
  setData,
}) {

  const statistics = data.statistics || [];

  function addStatistic() {

    setData({

      ...data,

      statistics: [

        ...statistics,

        {
          id: Date.now(),
          title: "",
          value: "",
          suffix: "+",
          icon: "users",
        },

      ],

    });

  }

  function updateStatistic(index, field, value) {

    const updated = [...statistics];

    updated[index][field] = value;

    setData({

      ...data,

      statistics: updated,

    });

  }

  function deleteStatistic(index) {

    if (!window.confirm("Delete this statistic?")) return;

    const updated = [...statistics];

    updated.splice(index, 1);

    setData({

      ...data,

      statistics: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="flex items-center justify-between border-b p-8">

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            Statistics

          </h2>

          <p className="mt-2 text-slate-500">

            Manage counters displayed on the About page.

          </p>

        </div>

        <button
          type="button"
          onClick={addStatistic}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Statistic

        </button>

      </div>

      <div className="space-y-6 p-8">

        {statistics.length === 0 && (

          <div className="rounded-xl border-2 border-dashed p-10 text-center text-slate-500">

            No statistics added yet.

          </div>

        )}

        {statistics.map((item, index) => (

          <div
            key={item.id}
            className="rounded-2xl border p-6"
          >

            <div className="mb-5 flex items-center justify-between">

              <h3 className="font-bold text-[#082B69]">

                Statistic {index + 1}

              </h3>

              <button
                type="button"
                onClick={() => deleteStatistic(index)}
                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
              >

                <FaTrash />

              </button>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">

                  Title

                </label>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e)=>
                    updateStatistic(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold">

                  Value

                </label>

                <input
                  type="number"
                  value={item.value}
                  onChange={(e)=>
                    updateStatistic(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold">

                  Suffix

                </label>

                <input
                  type="text"
                  value={item.suffix}
                  onChange={(e)=>
                    updateStatistic(
                      index,
                      "suffix",
                      e.target.value
                    )
                  }
                  placeholder="+"
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold">

                  Icon

                </label>

                <select
                  value={item.icon}
                  onChange={(e)=>
                    updateStatistic(
                      index,
                      "icon",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                >

                  <option value="users">Users</option>

                  <option value="university">University</option>

                  <option value="calendar">Events</option>

                  <option value="graduation">Graduation</option>

                  <option value="award">Awards</option>

                  <option value="hospital">Hospital</option>

                  <option value="globe">Global</option>

                </select>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}