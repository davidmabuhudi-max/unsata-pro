import {
  FaHandsHelping,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function AboutActivities({
  data,
  setData,
}) {

  const activities = data.activities || [];

  function addActivity() {

    setData({

      ...data,

      activities: [

        ...activities,

        {

          id: Date.now().toString(),

          title: "",

          description: "",

          icon: "FaHandsHelping",

          image: "",

          active: true,

          order: activities.length + 1,

        },

      ],

    });

  }

  function updateActivity(index, field, value) {

    const updated = [...activities];

    updated[index][field] = value;

    setData({

      ...data,

      activities: updated,

    });

  }

  function removeActivity(index) {

    const updated = activities.filter(
      (_, i) => i !== index
    );

    setData({

      ...data,

      activities: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">

            <FaHandsHelping className="text-2xl"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#082B69]">

              Activities

            </h2>

            <p className="mt-1 text-slate-500">

              Manage all activities displayed on the About page.

            </p>

          </div>

        </div>

        <button
          onClick={addActivity}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Activity

        </button>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {activities.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed p-12 text-center text-slate-500">

            No activities available.

          </div>

        )}

        {activities.map((item, index) => (

          <div
            key={item.id}
            className="rounded-2xl border bg-slate-50 p-6"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#082B69]">

                Activity {index + 1}

              </h3>

              <button
                onClick={() => removeActivity(index)}
                className="rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
              >

                <FaTrash />

              </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">

                  Title

                </label>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e)=>
                    updateActivity(
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

                  Icon Name

                </label>

                <input
                  type="text"
                  value={item.icon}
                  onChange={(e)=>
                    updateActivity(
                      index,
                      "icon",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-semibold">

                Description

              </label>

              <textarea
                rows={4}
                value={item.description}
                onChange={(e)=>
                  updateActivity(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">

                  Image URL

                </label>

                <input
                  type="text"
                  value={item.image}
                  onChange={(e)=>
                    updateActivity(
                      index,
                      "image",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold">

                  Display Order

                </label>

                <input
                  type="number"
                  value={item.order}
                  onChange={(e)=>
                    updateActivity(
                      index,
                      "order",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e)=>
                    updateActivity(
                      index,
                      "active",
                      e.target.checked
                    )
                  }
                />

                <span className="font-semibold">

                  Active

                </span>

              </label>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}