import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAbout from "./useAbout";
import { saveAboutData } from "./aboutService";

import AboutGeneral from "./AboutGeneral";
import AboutVision from "./AboutVision";
import AboutMission from "./AboutMission";
import AboutObjectives from "./AboutObjectives";
import AboutCoreValues from "./AboutCoreValues";
import AboutActivities from "./AboutActivities";
import AboutStatistics from "./AboutStatistics";
import AboutTimeline from "./AboutTimeline";
import AboutPartners from "./AboutPartners";
import AboutGallery from "./AboutGallery";
import AboutSeo from "./AboutSeo";
import AboutPreview from "./AboutPreview";

const defaultData = {
  general: {
    section: "ABOUT UNSATA",
    title: "",
    description: "",
    image: "",
    buttonText: "Learn More",
  },

  vision: {
    title: "",
    description: "",
  },

  mission: {
    title: "",
    description: "",
  },

  objectives: [],

  coreValues: [],

  activities: [],

  statistics: [],

  timeline: [],

  partners: [],

  gallery: [],

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    index: true,
  },
};

export default function AboutManagement() {

  const {
    aboutData,
    loading,
  } = useAbout();

  const [data, setData] = useState(defaultData);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (aboutData) {

      setData({

        ...defaultData,

        ...aboutData,

      });

    }

  }, [aboutData]);

  async function handleSave() {

    try {

      setSaving(true);

      await saveAboutData(data);

      toast.success("About page updated successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Failed to save.");

    } finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black text-[#082B69]">

              About Page Management

            </h1>

            <p className="mt-3 text-slate-500">

              Manage every section displayed on the public About page.

            </p>

          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-[#082B69] px-8 py-4 text-white font-semibold hover:bg-[#061d4a]"
          >

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

      {/* Forms */}

      <div className="grid xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2 space-y-8">

          <AboutGeneral
            data={data}
            setData={setData}
          />

          <AboutVision
            data={data}
            setData={setData}
          />

          <AboutMission
            data={data}
            setData={setData}
          />

          <AboutObjectives
            data={data}
            setData={setData}
          />

          <AboutCoreValues
            data={data}
            setData={setData}
          />

          <AboutActivities
            data={data}
            setData={setData}
          />

          <AboutStatistics
            data={data}
            setData={setData}
          />

          <AboutTimeline
            data={data}
            setData={setData}
          />

          <AboutPartners
            data={data}
            setData={setData}
          />

          <AboutGallery
            data={data}
            setData={setData}
          />

          <AboutSeo
            data={data}
            setData={setData}
          />

        </div>

        {/* Live Preview */}

        <div>

          <AboutPreview
            data={data}
          />

        </div>

      </div>

    </div>

  );

}