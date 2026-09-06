import { useState } from "react";

import {
  FaHome,
  FaSave,
  FaEye,
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaNewspaper,
  FaImages,
  FaHandshake,
  FaUserTie,
  FaBullhorn,
  FaArrowUp,
  FaArrowDown,
  FaGripVertical,
} from "react-icons/fa";

import useHomepage from "./useHomepage";
import HeroManagement from "./HeroManagement";
import HeroCardManagement from "./HeroCardManagement";


const defaultSections = {
  hero: true,
  statistics: true,
  about: true,
  leadership: true,
  events: true,
  news: true,
  gallery: true,
  partners: true,
  membership: true,
};


const defaultSectionOrder = [
  "hero",
  "statistics",
  "about",
  "leadership",
  "events",
  "news",
  "gallery",
  "partners",
  "membership",
];


const sectionItems = [
  {
    key: "hero",
    title: "Hero Section",
    description:
      "Main homepage banner and introduction.",
    icon: <FaBullhorn />,
  },

  {
    key: "statistics",
    title: "Statistics",
    description:
      "Display important UNSATA statistics and impact numbers.",
    icon: <FaChartBar />,
  },

  {
    key: "about",
    title: "About UNSATA",
    description:
      "Vision, mission, objectives and organization information.",
    icon: <FaHome />,
  },

  {
    key: "leadership",
    title: "Leadership",
    description:
      "Display the current UNSATA leadership team.",
    icon: <FaUserTie />,
  },

  {
    key: "events",
    title: "Events",
    description:
      "Display upcoming and recent UNSATA events.",
    icon: <FaCalendarAlt />,
  },

  {
    key: "news",
    title: "News",
    description:
      "Display the latest published news articles.",
    icon: <FaNewspaper />,
  },

  {
    key: "gallery",
    title: "Gallery",
    description:
      "Display photos and activities from the gallery.",
    icon: <FaImages />,
  },

  {
    key: "partners",
    title: "Partners",
    description:
      "Display organizations and institutions collaborating with UNSATA.",
    icon: <FaHandshake />,
  },

  {
    key: "membership",
    title: "Membership CTA",
    description:
      "Display the membership registration call-to-action.",
    icon: <FaUsers />,
  },
];


export default function HomepageManagement() {

  const {
    data,
    setData,
    loading,
    save,
  } = useHomepage();


  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");


  const sections = {
    ...defaultSections,
    ...(data?.sections || {}),
  };


  const sectionOrder =
    Array.isArray(data?.sectionOrder) &&
    data.sectionOrder.length > 0
      ? data.sectionOrder
      : defaultSectionOrder;
        function toggleSection(key) {
    setData((previous) => ({
      ...previous,

      sections: {
        ...(previous?.sections || defaultSections),

        [key]: !(
          previous?.sections?.[key] ??
          defaultSections[key]
        ),
      },
    }));
  }


  function moveSection(index, direction) {
    const newOrder = [...sectionOrder];

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;


    if (
      targetIndex < 0 ||
      targetIndex >= newOrder.length
    ) {
      return;
    }


    [
      newOrder[index],
      newOrder[targetIndex],
    ] = [
      newOrder[targetIndex],
      newOrder[index],
    ];


    setData((previous) => ({
      ...previous,
      sectionOrder: newOrder,
    }));
  }


  function handleSave() {
    setSaving(true);
    setMessage("");

    Promise.resolve(save())
      .then(() => {
        setMessage(
          "Homepage settings saved successfully."
        );
      })
      .catch((error) => {
        console.error(error);

        setMessage(
          "Failed to save homepage settings."
        );
      })
      .finally(() => {
        setSaving(false);
      });
  }


  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

          <p className="mt-4 text-slate-500">
            Loading homepage settings...
          </p>

        </div>

      </div>
    );
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

              <FaHome className="text-3xl" />

            </div>


            <div>

              <h1 className="text-3xl font-black text-[#082B69]">
                Homepage Management
              </h1>

              <p className="mt-2 text-slate-500">
                Control which sections appear on the public homepage.
              </p>

            </div>

          </div>


          <div className="flex flex-wrap gap-3">

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-blue-200 px-6 py-4 font-semibold text-[#082B69] hover:bg-blue-50"
            >

              <FaEye />

              View Homepage

            </a>


            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-4 font-semibold text-white hover:bg-[#061d4a] disabled:cursor-not-allowed disabled:opacity-60"
            >

              <FaSave />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          SAVE MESSAGE
      ===================================================== */}

      {message && (

        <div
          className={`rounded-2xl px-6 py-4 font-medium ${
            message.includes("successfully")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>

      )}


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Homepage Sections
          </p>

          <p className="mt-3 text-4xl font-black text-[#082B69]">
            {sectionItems.length}
          </p>

          <p className="mt-2 text-slate-500">
            Available sections
          </p>

        </div>


        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Currently Visible
          </p>

          <p className="mt-3 text-4xl font-black text-green-600">
            {
              sectionItems.filter(
                (item) => sections[item.key]
              ).length
            }
          </p>

          <p className="mt-2 text-slate-500">
            Sections shown to visitors
          </p>

        </div>


        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Hidden
          </p>

          <p className="mt-3 text-4xl font-black text-slate-500">
            {
              sectionItems.filter(
                (item) => !sections[item.key]
              ).length
            }
          </p>

          <p className="mt-2 text-slate-500">
            Sections currently disabled
          </p>

        </div>

      </div>


      {/* =====================================================
          SECTION ORDER
      ===================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="border-b p-8">

          <h2 className="text-2xl font-black text-[#082B69]">
            Homepage Sections
          </h2>

          <p className="mt-2 text-slate-500">
            Turn sections on or off and arrange their order.
          </p>

        </div>


        <div className="space-y-4 p-8">

          {sectionOrder.map(
            (key, index) => {

              const item =
                sectionItems.find(
                  (section) =>
                    section.key === key
                );


              if (!item) {
                return null;
              }


              const visible =
                sections[item.key];


              return (

                <div
                  key={item.key}
                  className={`rounded-2xl border p-5 transition ${
                    visible
                      ? "border-blue-100 bg-slate-50"
                      : "border-slate-200 bg-slate-100 opacity-70"
                  }`}
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#082B69]">

                        {item.icon}

                      </div>


                      <div>

                        <h3 className="font-bold text-[#082B69]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {item.description}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      {/* Move Up */}

                      <button
                        type="button"
                        onClick={() =>
                          moveSection(
                            index,
                            "up"
                          )
                        }
                        disabled={
                          index === 0
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-slate-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move up"
                      >
                        <FaArrowUp />
                      </button>


                      {/* Move Down */}

                      <button
                        type="button"
                        onClick={() =>
                          moveSection(
                            index,
                            "down"
                          )
                        }
                        disabled={
                          index ===
                          sectionOrder.length -
                            1
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-slate-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move down"
                      >
                        <FaArrowDown />
                      </button>


                      {/* Drag Indicator */}

                      <div className="hidden text-slate-300 md:block">
                        <FaGripVertical />
                      </div>


                      {/* Toggle */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleSection(
                            item.key
                          )
                        }
                        className={`relative h-7 w-14 rounded-full transition ${
                          visible
                            ? "bg-[#082B69]"
                            : "bg-slate-300"
                        }`}
                        aria-label={`Toggle ${item.title}`}
                      >

                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                            visible
                              ? "left-8"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>

            {/* =====================================================
    HERO MANAGEMENT
===================================================== */}

<HeroManagement />
<HeroManagement />

<HeroCardManagement />


{/* =====================================================
    HERO CARD MANAGEMENT
===================================================== */}

<HeroCardManagement />

      {/* =====================================================
          FINAL SAVE BUTTON
      ===================================================== */}

      <div className="flex justify-end pb-8">

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-8 py-4 font-semibold text-white shadow-lg hover:bg-[#061d4a] disabled:cursor-not-allowed disabled:opacity-60"
        >

          <FaSave />

          {saving
            ? "Saving..."
            : "Save Homepage Settings"}

        </button>

      </div>

    </div>
  );
}