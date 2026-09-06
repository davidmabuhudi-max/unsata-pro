import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutGeneral({
  data,
  setData,
}) {
  const general = data.general;

  function handleChange(e) {
    setData({
      ...data,
      general: {
        ...general,
        [e.target.name]: e.target.value,
      },
    });
  }

  return (
    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="border-b p-8">

        <h2 className="text-2xl font-bold text-[#082B69]">
          General Information
        </h2>

        <p className="mt-2 text-slate-500">
          Configure the main About page section.
        </p>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Section Label */}

        <div>

          <label className="mb-2 block font-semibold">
            Section Label
          </label>

          <input
            type="text"
            name="section"
            value={general.section}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

        {/* Title */}

        <div>

          <label className="mb-2 block font-semibold">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={general.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows="6"
            name="description"
            value={general.description}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

        {/* Button */}

        <div>

          <label className="mb-2 block font-semibold">
            Button Text
          </label>

          <input
            type="text"
            name="buttonText"
            value={general.buttonText}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

        {/* Image */}

        <div>

          <label className="mb-4 block font-semibold">
            Hero Image
          </label>

          <ImageUploader
            value={general.image}
            folder="about"
            onChange={(image) =>
              setData({
                ...data,
                general: {
                  ...general,
                  image,
                },
              })
            }
          />

        </div>

      </div>

    </div>
  );
}