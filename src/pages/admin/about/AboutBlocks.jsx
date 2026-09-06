import { FaPlus, FaTrash } from "react-icons/fa";

import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutBlocks({
  data,
  setData,
}) {

  const blocks = data.blocks || [];

  function addBlock() {

    setData({

      ...data,

      blocks: [

        ...blocks,

        {
          id: Date.now(),

          title: "",

          description: "",

          image: "",
        },

      ],

    });

  }

  function updateBlock(index, field, value) {

    const updated = [...blocks];

    updated[index][field] = value;

    setData({

      ...data,

      blocks: updated,

    });

  }

  function removeBlock(index) {

    if (!window.confirm("Delete this block?")) return;

    const updated = [...blocks];

    updated.splice(index, 1);

    setData({

      ...data,

      blocks: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-8">

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            About Content Blocks

          </h2>

          <p className="mt-2 text-slate-500">

            Add unlimited sections to your About page.

          </p>

        </div>

        <button
          type="button"
          onClick={addBlock}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Block

        </button>

      </div>

      {/* Blocks */}

      <div className="space-y-8 p-8">

        {blocks.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed p-10 text-center">

            <h3 className="text-lg font-semibold text-slate-600">

              No blocks yet

            </h3>

            <p className="mt-2 text-slate-500">

              Click "Add Block" to create your first section.

            </p>

          </div>

        )}

        {blocks.map((block, index) => (

          <div
            key={block.id}
            className="rounded-2xl border p-8"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#082B69]">

                Block {index + 1}

              </h3>

              <button
                type="button"
                onClick={() => removeBlock(index)}
                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
              >

                <FaTrash />

              </button>

            </div>

            {/* Title */}

            <div className="mb-6">

              <label className="mb-2 block font-semibold">

                Title

              </label>

              <input
                type="text"
                value={block.title}
                onChange={(e) =>
                  updateBlock(
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            {/* Description */}

            <div className="mb-6">

              <label className="mb-2 block font-semibold">

                Description

              </label>

              <textarea
                rows="5"
                value={block.description}
                onChange={(e) =>
                  updateBlock(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            {/* Image */}

            <div>

              <label className="mb-3 block font-semibold">

                Block Image

              </label>

              <ImageUploader
                value={block.image}
                folder="about"
                onChange={(image) =>
                  updateBlock(
                    index,
                    "image",
                    image
                  )
                }
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}