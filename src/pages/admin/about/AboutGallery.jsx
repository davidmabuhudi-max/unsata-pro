import { FaPlus, FaTrash } from "react-icons/fa";
import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutGallery({
  data,
  setData,
}) {

  const gallery = data.gallery || [];

  function addImage() {

    setData({

      ...data,

      gallery: [

        ...gallery,

        {
          id: Date.now(),

          title: "",

          caption: "",

          category: "General",

          image: "",

          order: gallery.length + 1,

          active: true,
        },

      ],

    });

  }

  function updateImage(index, field, value) {

    const updated = [...gallery];

    updated[index][field] = value;

    setData({

      ...data,

      gallery: updated,

    });

  }

  function deleteImage(index) {

    if (!window.confirm("Delete this image?")) return;

    const updated = [...gallery];

    updated.splice(index, 1);

    setData({

      ...data,

      gallery: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="flex items-center justify-between border-b p-8">

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            About Gallery

          </h2>

          <p className="mt-2 text-slate-500">

            Upload images that appear on the About page.

          </p>

        </div>

        <button
          type="button"
          onClick={addImage}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >

          <FaPlus />

          Add Image

        </button>

      </div>

      <div className="space-y-8 p-8">

        {gallery.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed p-12 text-center">

            <h3 className="text-lg font-semibold">

              No images uploaded

            </h3>

            <p className="mt-2 text-slate-500">

              Click "Add Image" to begin.

            </p>

          </div>

        )}

        {gallery.map((item, index) => (

          <div
            key={item.id}
            className="rounded-2xl border p-8"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#082B69]">

                Image {index + 1}

              </h3>

              <button
                type="button"
                onClick={() => deleteImage(index)}
                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
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
                    updateImage(
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

                  Category

                </label>

                <select
                  value={item.category}
                  onChange={(e)=>
                    updateImage(
                      index,
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                >

                  <option>General</option>

                  <option>Community Outreach</option>

                  <option>Training</option>

                  <option>Leadership</option>

                  <option>Conference</option>

                  <option>Research</option>

                  <option>Volunteer Work</option>

                  <option>Campus Activities</option>

                </select>

              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-semibold">

                Caption

              </label>

              <textarea
                rows="4"
                value={item.caption}
                onChange={(e)=>
                  updateImage(
                    index,
                    "caption",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-4"
              />

            </div>

            <div className="mt-6">

              <label className="mb-3 block font-semibold">

                Gallery Image

              </label>

              <ImageUploader
                value={item.image}
                folder="about/gallery"
                onChange={(image)=>
                  updateImage(
                    index,
                    "image",
                    image
                  )
                }
              />

            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">

                  Display Order

                </label>

                <input
                  type="number"
                  value={item.order}
                  onChange={(e)=>
                    updateImage(
                      index,
                      "order",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div className="flex items-center gap-3 pt-10">

                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e)=>
                    updateImage(
                      index,
                      "active",
                      e.target.checked
                    )
                  }
                />

                <label className="font-medium">

                  Display this image

                </label>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}