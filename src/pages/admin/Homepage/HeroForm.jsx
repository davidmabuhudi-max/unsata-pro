import { useState } from "react";

import ImageUploader from "../../../components/common/ImageUploader";

export default function HeroForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(
    initialData || {
      subtitle: "",
      title: "",
      description: "",
      image: "",
      active: true,
    }
  );

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter the hero title.");
      return;
    }

    if (!form.image) {
      alert("Please upload a hero image.");
      return;
    }

    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-xl"
    >

      {/* Header */}

      <div>
        <h2 className="text-3xl font-black text-[#082B69]">
          Hero Slide
        </h2>

        <p className="mt-2 text-slate-500">
          Manage the content displayed in the homepage hero slider.
        </p>
      </div>

      {/* Subtitle */}

      <div>
        <label className="mb-2 block font-semibold">
          Subtitle
        </label>

        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          maxLength={100}
          placeholder="Example: UNSATA MUHAS CHAPTER"
          className="w-full rounded-xl border p-4 outline-none focus:border-[#082B69]"
        />
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-semibold">
          Main Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          maxLength={150}
          placeholder="Example: Empowering Future Nursing Leaders"
          className="w-full rounded-xl border p-4 outline-none focus:border-[#082B69]"
        />

        <p className="mt-2 text-xs text-slate-500">
          {form.title.length}/150
        </p>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          maxLength={1000}
          placeholder="Write the description displayed below the hero title."
          className="w-full resize-y rounded-xl border p-4 outline-none focus:border-[#082B69]"
        />

        <p className="mt-2 text-xs text-slate-500">
          {form.description.length}/1000
        </p>
      </div>

      {/* Image */}

      <div>
        <label className="mb-4 block font-semibold">
          Hero Background Image
        </label>

        <ImageUploader
          value={form.image}
          folder="hero"
          onChange={(image) =>
            setForm((previous) => ({
              ...previous,
              image,
            }))
          }
        />
      </div>

      {/* Active */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <label className="flex cursor-pointer items-center gap-4">

          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
            className="h-5 w-5"
          />

          <div>
            <p className="font-semibold text-[#082B69]">
              Show this slide
            </p>

            <p className="text-sm text-slate-500">
              Hidden slides will not appear on the public homepage.
            </p>
          </div>

        </label>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 border-t pt-6">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-8 py-3 font-semibold hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[#082B69] px-8 py-3 font-semibold text-white hover:bg-[#061d4a]"
        >
          Save Slide
        </button>

      </div>

    </form>
  );
}