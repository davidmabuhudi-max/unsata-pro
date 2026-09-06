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
    card,
    loading,
    saving,
    updateCard,
  } = useHeroCard();

  const [form, setForm] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Initialize form after Firebase data loads
  |--------------------------------------------------------------------------
  */

useEffect(() => {
  if (!loading) {
    setForm({
      title: card.title || "",
      highlight: card.highlight || "",
      description: card.description || "",

      features: [
        {
          text:
            card.features?.[0]?.text ||
            "Leadership Development",
          icon: "users",
        },

        {
          text:
            card.features?.[1]?.text ||
            "Research & Innovation",
          icon: "book",
        },

        {
          text:
            card.features?.[2]?.text ||
            "Community Engagement",
          icon: "lightbulb",
        },

        {
          text:
            card.features?.[3]?.text ||
            "Academic Excellence",
          icon: "nurse",
        },
      ],
    });
  }
}, [loading, card]);

  if (loading || !form) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

        <p className="mt-4 text-slate-500">
          Loading hero card...
        </p>
      </div>
    );
  }

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleFeatureChange(index, value) {
    setForm((previous) => ({
      ...previous,

      features: previous.features.map(
        (feature, featureIndex) =>
          featureIndex === index
            ? {
                ...feature,
                text: value,
              }
            : feature
      ),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter the card title.");
      return;
    }

    if (!form.description.trim()) {
      alert(
        "Please enter the card description."
      );
      return;
    }

    await updateCard(form);
  }

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

              <FaUserNurse className="text-3xl" />

            </div>

            <div>

              <h2 className="text-3xl font-black text-[#082B69]">
                Hero Card Management
              </h2>

              <p className="mt-2 text-slate-500">
                Edit the information displayed on the right side of the homepage hero section.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-lg space-y-8"
      >

        {/* Title */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Main Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={100}
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
            placeholder="UNSATA MUHAS"
          />

        </div>


        {/* Highlight */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Highlighted Title
          </label>

          <input
            type="text"
            name="highlight"
            value={form.highlight}
            onChange={handleChange}
            maxLength={100}
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
            placeholder="Chapter"
          />

        </div>


        {/* Description */}

        <div>

          <label className="mb-2 block font-semibold text-[#082B69]">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            maxLength={1000}
            className="w-full resize-y rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
            placeholder="Write the description displayed inside the hero card."
          />

          <p className="mt-2 text-xs text-slate-500">
            {form.description.length}/1000
          </p>

        </div>


        {/* =====================================================
            FEATURES
        ===================================================== */}

        <div>

          <h3 className="text-xl font-bold text-[#082B69]">
            Card Features
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Change the four feature names displayed in the card.
          </p>

          <div className="mt-6 space-y-5">

            {/* Feature 1 */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-500">

                <FaUsers />

              </div>

              <input
                type="text"
                value={form.features[0].text}
                onChange={(e) =>
                  handleFeatureChange(
                    0,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
              />

            </div>


            {/* Feature 2 */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-500">

                <FaBookMedical />

              </div>

              <input
                type="text"
                value={form.features[1].text}
                onChange={(e) =>
                  handleFeatureChange(
                    1,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
              />

            </div>


            {/* Feature 3 */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-500">

                <FaLightbulb />

              </div>

              <input
                type="text"
                value={form.features[2].text}
                onChange={(e) =>
                  handleFeatureChange(
                    2,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
              />

            </div>


            {/* Feature 4 */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-500">

                <FaUserNurse />

              </div>

              <input
                type="text"
                value={form.features[3].text}
                onChange={(e) =>
                  handleFeatureChange(
                    3,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#082B69]"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            SAVE
        ===================================================== */}

        <div className="flex justify-end border-t border-slate-200 pt-6">

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-3 rounded-xl bg-[#082B69] px-8 py-4 font-semibold text-white hover:bg-[#061d4a] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <FaSave />

            {saving
              ? "Saving..."
              : "Save Hero Card"}

          </button>

        </div>

      </form>

    </div>
  );
}