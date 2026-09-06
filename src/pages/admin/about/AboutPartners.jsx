import { FaPlus, FaTrash } from "react-icons/fa";
import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutPartners({
  data,
  setData,
}) {

  const partners = data.partners || [];

  function addPartner() {

    setData({

      ...data,

      partners: [

        ...partners,

        {
          id: Date.now(),
          name: "",
          category: "University",
          website: "",
          description: "",
          logo: "",
          order: partners.length + 1,
          active: true,
        },

      ],

    });

  }

  function updatePartner(index, field, value) {

    const updated = [...partners];

    updated[index][field] = value;

    setData({

      ...data,

      partners: updated,

    });

  }

  function removePartner(index) {

    if (!window.confirm("Delete this partner?")) return;

    const updated = [...partners];

    updated.splice(index, 1);

    setData({

      ...data,

      partners: updated,

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="flex items-center justify-between border-b p-8">

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">
            Partners & Collaborations
          </h2>

          <p className="mt-2 text-slate-500">
            Manage organizations collaborating with UNSATA.
          </p>

        </div>

        <button
          type="button"
          onClick={addPartner}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >
          <FaPlus />
          Add Partner
        </button>

      </div>

      <div className="space-y-8 p-8">

        {partners.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed p-10 text-center">

            <h3 className="text-lg font-semibold text-slate-600">
              No partners added
            </h3>

            <p className="mt-2 text-slate-500">
              Click "Add Partner" to begin.
            </p>

          </div>

        )}

        {partners.map((partner, index) => (

          <div
            key={partner.id}
            className="rounded-2xl border p-8"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#082B69]">
                Partner {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removePartner(index)}
                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
              >
                <FaTrash />
              </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-semibold">
                  Partner Name
                </label>

                <input
                  type="text"
                  value={partner.name}
                  onChange={(e)=>
                    updatePartner(
                      index,
                      "name",
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
                  value={partner.category}
                  onChange={(e)=>
                    updatePartner(
                      index,
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                >
                  <option>University</option>
                  <option>Hospital</option>
                  <option>Government</option>
                  <option>NGO</option>
                  <option>Private Company</option>
                  <option>International Organization</option>
                  <option>Professional Association</option>
                </select>

              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-semibold">
                Website
              </label>

              <input
                type="url"
                value={partner.website}
                onChange={(e)=>
                  updatePartner(
                    index,
                    "website",
                    e.target.value
                  )
                }
                placeholder="https://example.org"
                className="w-full rounded-xl border p-4"
              />

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                rows="4"
                value={partner.description}
                onChange={(e)=>
                  updatePartner(
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
                Partner Logo
              </label>

              <ImageUploader
                value={partner.logo}
                folder="about/partners"
                onChange={(image)=>
                  updatePartner(
                    index,
                    "logo",
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
                  value={partner.order}
                  onChange={(e)=>
                    updatePartner(
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
                  checked={partner.active}
                  onChange={(e)=>
                    updatePartner(
                      index,
                      "active",
                      e.target.checked
                    )
                  }
                />

                <label className="font-medium">
                  Display this partner
                </label>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}