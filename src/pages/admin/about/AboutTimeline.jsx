import { FaPlus, FaTrash } from "react-icons/fa";
import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutTimeline({
  data,
  setData,
}) {

  const timeline = data.timeline || [];

  function addTimeline() {

    setData({

      ...data,

      timeline: [

        ...timeline,

        {
          id: Date.now(),
          year: "",
          title: "",
          description: "",
          image: "",
          order: timeline.length + 1,
          active: true,
        },

      ],

    });

  }

  function updateTimeline(index, field, value) {

    const updated = [...timeline];

    updated[index][field] = value;

    setData({

      ...data,

      timeline: updated,

    });

  }

  function deleteTimeline(index) {

    if (!window.confirm("Delete this timeline item?")) return;

    const updated = [...timeline];

    updated.splice(index, 1);

    setData({

      ...data,

      timeline: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="flex items-center justify-between border-b p-8">

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            Timeline

          </h2>

          <p className="mt-2 text-slate-500">

            Create the history and milestones of UNSATA.

          </p>

        </div>

        <button
          type="button"
          onClick={addTimeline}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Timeline

        </button>

      </div>

      <div className="space-y-8 p-8">

        {timeline.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed p-10 text-center">

            <h3 className="font-semibold text-slate-600">

              No timeline items available

            </h3>

            <p className="mt-2 text-slate-500">

              Click "Add Timeline" to begin.

            </p>

          </div>

        )}

        {timeline.map((item, index) => (

          <div
            key={item.id}
            className="rounded-2xl border p-8"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#082B69]">

                Timeline {index + 1}

              </h3>

              <button
                type="button"
                onClick={() => deleteTimeline(index)}
                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
              >

                <FaTrash />

              </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">

                  Year

                </label>

                <input
                  type="text"
                  value={item.year}
                  onChange={(e)=>
                    updateTimeline(
                      index,
                      "year",
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
                    updateTimeline(
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

              <label className="mb-2 block font-semibold">

                Title

              </label>

              <input
                type="text"
                value={item.title}
                onChange={(e)=>
                  updateTimeline(
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-semibold">

                Description

              </label>

              <textarea
                rows="5"
                value={item.description}
                onChange={(e)=>
                  updateTimeline(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            <div className="mt-6">

              <label className="mb-3 block font-semibold">

                Timeline Image

              </label>

              <ImageUploader
                value={item.image}
                folder="about/timeline"
                onChange={(image)=>
                  updateTimeline(
                    index,
                    "image",
                    image
                  )
                }
              />

            </div>

            <div className="mt-6 flex items-center gap-3">

              <input
                type="checkbox"
                checked={item.active}
                onChange={(e)=>
                  updateTimeline(
                    index,
                    "active",
                    e.target.checked
                  )
                }
              />

              <label className="font-medium">

                Display this timeline item

              </label>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}