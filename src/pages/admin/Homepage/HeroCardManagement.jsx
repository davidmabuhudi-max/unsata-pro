import { useState } from "react";

import {
  FaUserNurse,
  FaUsers,
  FaBookMedical,
  FaLightbulb,
  FaSave,
} from "react-icons/fa";

import { useHeroCard } from "./useHeroCard";

export default function HeroCardManagement() {
  const {
    data,
    setData,
    loading,
    saveHeroCard,
  } = useHeroCard();

  const [saving, setSaving] = useState(false);

  if (loading || !data) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

            <p className="mt-4 text-slate-500">
              Loading hero card...
            </p>

          </div>
        </div>
      </div>
    );
  }

  function updateField(name, value) {
    setData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function updateFeature(index, value) {
    setData((previous) => {
      const features = [
        ...(previous.features || []),
      ];

      features[index] = value;

      return {
        ...previous,
        features,
      };
    });
  }

  async function handleSave() {
    try {
      setSaving(true);

      await saveHeroCard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white shadow-lg">

      {/* Header */}

      <div className="border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">
            <FaUserNurse className="text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#082B69]">
              Hero Card Management
            </h2>

            <p className="mt-1 text-slate-500">
              Edit the information displayed on the right side of the homepage hero section.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}

      <div className="space-y-6 p-8">

        {/* Main Title */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Main Title
          </label>

          <input
            type="text"
            value={data.title || ""}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
            placeholder="Example: UNSATA MUHAS"
            className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-[#082B69] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Highlighted Title */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Highlighted Title
          </label>

          <input
            type="text"
            value={
              data.highlightedTitle || ""
            }
            onChange={(e) =>
              updateField(
                "highlightedTitle",
                e.target.value
              )
            }
            placeholder="Example: Chapter"
            className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-[#082B69] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Description
          </label>

          <textarea
            rows={6}
            value={data.description || ""}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            placeholder="Write the description displayed inside the hero card."
            className="w-full resize-y rounded-xl border border-slate-300 p-4 outline-none transition focus:border-[#082B69] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Features */}

        <div>

          <h3 className="mb-4 text-lg font-bold text-[#082B69]">
            Card Features
          </h3>

          <div className="space-y-4">

            {/* Feature 1 */}

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#082B69]">
                <FaUsers />
              </div>

              <input
                type="text"
                value={
                  data.features?.[0] || ""
                }
                onChange={(e) =>
                  updateFeature(
                    0,
                    e.target.value
                  )
                }
                placeholder="Leadership Development"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#082B69]"
              />

            </div>

            {/* Feature 2 */}

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#082B69]">
                <FaBookMedical />
              </div>

              <input
                type="text"
                value={
                  data.features?.[1] || ""
                }
                onChange={(e) =>
                  updateFeature(
                    1,
                    e.target.value
                  )
                }
                placeholder="Research & Innovation"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#082B69]"
              />

            </div>

            {/* Feature 3 */}

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#082B69]">
                <FaLightbulb />
              </div>

              <input
                type="text"
                value={
                  data.features?.[2] || ""
                }
                onChange={(e) =>
                  updateFeature(
                    2,
                    e.target.value
                  )
                }
                placeholder="Community Engagement"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#082B69]"
              />

            </div>

            {/* Feature 4 */}

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#082B69]">
                <FaUserNurse />
              </div>

              <input
                type="text"
                value={
                  data.features?.[3] || ""
                }
                onChange={(e) =>
                  updateFeature(
                    3,
                    e.target.value
                  )
                }
                placeholder="Academic Excellence"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#082B69]"
              />

            </div>

          </div>

        </div>

        {/* Active */}

        <div className="rounded-2xl bg-slate-50 p-5">

          <label className="flex cursor-pointer items-center gap-4">

            <input
              type="checkbox"
              checked={data.active !== false}
              onChange={(e) =>
                updateField(
                  "active",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

            <div>

              <p className="font-semibold text-[#082B69]">
                Show Hero Card
              </p>

              <p className="text-sm text-slate-500">
                Turn this off if you do not want the card to appear on the homepage.
              </p>

            </div>

          </label>

        </div>

        {/* Save */}

        <div className="flex justify-end border-t pt-6">

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 rounded-xl bg-[#082B69] px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-[#061d4a] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <FaSave />

            {saving
              ? "Saving..."
              : "Save Hero Card"}

          </button>

        </div>

      </div>

    </div>
  );
}