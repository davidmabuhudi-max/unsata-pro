import {
  FaStar,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableCard from "../../../components/admin/SortableCard";

export default function AboutCoreValues({
  data,
  setData,
}) {

  const coreValues = data.coreValues || [];

  function addValue() {

    setData({

      ...data,

      coreValues: [

        ...coreValues,

        {

          id: Date.now().toString(),

          title: "",

          description: "",

          icon: "FaStar",

          color: "#1565C0",

        },

      ],

    });

  }

  function updateValue(index, field, value) {

    const updated = [...coreValues];

    updated[index] = {

      ...updated[index],

      [field]: value,

    };

    setData({

      ...data,

      coreValues: updated,

    });

  }

  function removeValue(index) {

    const updated = coreValues.filter(
      (_, i) => i !== index
    );

    setData({

      ...data,

      coreValues: updated,

    });

  }

  function handleDragEnd(event) {

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = coreValues.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = coreValues.findIndex(
      (item) => item.id === over.id
    );

    const reordered = arrayMove(
      coreValues,
      oldIndex,
      newIndex
    );

    setData({

      ...data,

      coreValues: reordered,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">

            <FaStar className="text-2xl"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#082B69]">

              Core Values

            </h2>

            <p className="mt-1 text-slate-500">

              Manage organization core values.

            </p>

          </div>

        </div>

        <button
          onClick={addValue}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Value

        </button>

      </div>

      {/* Body */}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={coreValues.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >

          <div className="space-y-8 p-8">

            {coreValues.length === 0 && (

              <div className="rounded-2xl border-2 border-dashed p-12 text-center text-slate-500">

                No core values added.

              </div>

            )}

            {coreValues.map((item, index) => (

              <SortableCard
                key={item.id}
                id={item.id}
              >

                <div className="mb-6 flex items-center justify-between">

                  <h3 className="text-xl font-bold text-[#082B69]">

                    Core Value {index + 1}

                  </h3>

                  <button
                    onClick={() => removeValue(index)}
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
                        updateValue(
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
                        updateValue(
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
                      updateValue(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border p-4"
                  />

                </div>

                <div className="mt-6">

                  <label className="mb-2 block font-semibold">

                    Color

                  </label>

                  <input
                    type="color"
                    value={item.color}
                    onChange={(e)=>
                      updateValue(
                        index,
                        "color",
                        e.target.value
                      )
                    }
                    className="h-12 w-28 rounded-lg border"
                  />

                </div>

              </SortableCard>

            ))}

          </div>

        </SortableContext>

      </DndContext>

    </div>

  );

}