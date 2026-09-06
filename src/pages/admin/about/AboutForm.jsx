import { useState } from "react";
import { FaSave, FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";

import { saveAboutData } from "./aboutService";
import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutForm({
  aboutData,
  setAboutData,
}) {
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    if (
      !window.confirm(
        "Reset all changes made on this form?"
      )
    ) {
      return;
    }

    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await saveAboutData(aboutData);

      toast.success("About page updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save About information.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-lg"
    >
      <div>

        <h2 className="text-2xl font-bold text-[#082B69]">
          About Information
        </h2>

        <p className="mt-2 text-slate-500">
          Manage the About section displayed on the website.
        </p>

      </div>

      {/* Section */}

      <div>

        <label className="mb-2 block font-semibold">
          Section Label
        </label>

        <input
          type="text"
          name="section"
          value={aboutData.section}
          onChange={handleChange}
          className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-[#082B69]"
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
          value={aboutData.title}
          onChange={handleChange}
          className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-[#082B69]"
        />

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={aboutData.description}
          onChange={handleChange}
          className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-[#082B69]"
        />

      </div>

      {/* Mission */}

      <div className="space-y-5 rounded-2xl border p-6">

        <h3 className="text-xl font-bold text-[#082B69]">
          Mission
        </h3>

        <input
          type="text"
          name="missionTitle"
          value={aboutData.missionTitle}
          onChange={handleChange}
          placeholder="Mission Title"
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={4}
          name="missionDescription"
          value={aboutData.missionDescription}
          onChange={handleChange}
          placeholder="Mission Description"
          className="w-full rounded-xl border p-4"
        />

      </div>

      {/* Vision */}

      <div className="space-y-5 rounded-2xl border p-6">

        <h3 className="text-xl font-bold text-[#082B69]">
          Vision
        </h3>

        <input
          type="text"
          name="visionTitle"
          value={aboutData.visionTitle}
          onChange={handleChange}
          placeholder="Vision Title"
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={4}
          name="visionDescription"
          value={aboutData.visionDescription}
          onChange={handleChange}
          placeholder="Vision Description"
          className="w-full rounded-xl border p-4"
        />

      </div>

      {/* Community */}

      <div className="space-y-5 rounded-2xl border p-6">

        <h3 className="text-xl font-bold text-[#082B69]">
          Community Engagement
        </h3>

        <input
          type="text"
          name="communityTitle"
          value={aboutData.communityTitle}
          onChange={handleChange}
          placeholder="Community Title"
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={4}
          name="communityDescription"
          value={aboutData.communityDescription}
          onChange={handleChange}
          placeholder="Community Description"
          className="w-full rounded-xl border p-4"
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
          value={aboutData.buttonText}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

      </div>

      {/* Image */}

      <div>

        <label className="mb-4 block font-semibold">
          About Image
        </label>

        <ImageUploader
          value={aboutData.image}
          folder="about"
          onChange={(image) =>
            setAboutData({
              ...aboutData,
              image,
            })
          }
        />

      </div>

      {/* Buttons */}

      <div className="flex gap-4">

        <button
          type="submit"
          disabled={saving}
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#082B69] py-4 text-lg font-semibold text-white hover:bg-[#061d4a]"
        >
          <FaSave />

          {saving ? "Saving..." : "Save Changes"}

        </button>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-3 rounded-xl border px-8 font-semibold hover:bg-slate-100"
        >
          <FaUndo />

          Reset

        </button>

      </div>

    </form>
  );
}