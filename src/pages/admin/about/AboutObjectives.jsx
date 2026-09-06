import {
  FaBullseye,
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

export default function AboutObjectives({
  data,
  setData,
}) {
  const objectives = data.objectives || [];

  function updateObjective(index, field, value) {
    const updated = [...objectives];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData({
      ...data,
      objectives: updated,
    });
  }

  function addObjective() {
    setData({
      ...data,
      objectives: [
        ...objectives,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
        },
      ],
    });
  }

  function removeObjective(index) {
    const updated = objectives.filter((_, i) => i !== index);

    setData({
      ...data,
      objectives: updated,
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = objectives.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = objectives.findIndex(
      (item) => item.id === over.id
    );

    const reordered = arrayMove(
      objectives,
      oldIndex,
      newIndex
    );

    setData({
      ...data,
      objectives: reordered,
    });
  }

  return (
    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

            <FaBullseye className="text-2xl" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#082B69]">

              Objectives

            </h2>

            <p className="mt-1 text-slate-500">

              Manage organization objectives.

            </p>

          </div>

        </div>

        <button
          onClick={addObjective}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Objective

        </button>

      </div>

      {/* Body */}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={objectives.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >

          <div className="space-y-8 p-8">

            {objectives.length === 0 && (

              <div className="rounded-2xl border-2 border-dashed p-12 text-center text-slate-500">

                No objectives added yet.

              </div>

            )}

            {objectives.map((item, index) => (

              <SortableCard
                key={item.id}
                id={item.id}
              >

                <div className="mb-6 flex items-center justify-between">

                  <h3 className="text-xl font-bold text-[#082B69]">

                    Objective {index + 1}

                  </h3>

                  <button
                    onClick={() => removeObjective(index)}
                    className="rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
                  >

                    <FaTrash />

                  </button>

                </div>

                <div className="space-y-5">

                  <div>

                    <label className="mb-2 block font-semibold">

                      Title

                    </label>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateObjective(
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

                      Description

                    </label>

                    <textarea
                      rows={4}
                      value={item.description}
                      onChange={(e) =>
                        updateObjective(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border p-4"
                    />

                  </div>

                </div>

              </SortableCard>

            ))}

          </div>

        </SortableContext>

      </DndContext>

    </div>
  );
}