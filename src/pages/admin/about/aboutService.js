import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const aboutRef = doc(db, "about", "homepage");

/*
|--------------------------------------------------------------------------
| Get About Data
|--------------------------------------------------------------------------
*/

export async function getAboutData() {

  const snapshot = await getDoc(aboutRef);

  if (!snapshot.exists()) {

    return {

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
      seo: {},

    };

  }

  const data = snapshot.data();

  return {

    general: {

      section: data.section || "",

      title: data.title || "",

      description: data.description || "",

      image: data.image || "",

      buttonText: data.buttonText || "Learn More",

    },

    vision: {

      title: data.visionTitle || "",

      description: data.visionDescription || "",

    },

    mission: {

      title: data.missionTitle || "",

      description: data.missionDescription || "",

    },

    objectives: data.objectives || [],

    coreValues: data.coreValues || [],

    activities: data.activities || [],

    statistics: data.statistics || [],

    timeline: data.timeline || [],

    partners: data.partners || [],

    gallery: data.gallery || [],

    seo: data.seo || {},

  };

}

/*
|--------------------------------------------------------------------------
| Save About Data
|--------------------------------------------------------------------------
*/

export async function saveAboutData(data) {

  const payload = {

    section: data.general.section,

    title: data.general.title,

    description: data.general.description,

    image: data.general.image,

    buttonText: data.general.buttonText,

    visionTitle: data.vision.title,

    visionDescription: data.vision.description,

    missionTitle: data.mission.title,

    missionDescription: data.mission.description,

    objectives: data.objectives || [],

    coreValues: data.coreValues || [],

    activities: data.activities || [],

    statistics: data.statistics || [],

    timeline: data.timeline || [],

    partners: data.partners || [],

    gallery: data.gallery || [],

    seo: data.seo || {},

  };

  await setDoc(

    aboutRef,

    payload,

    {

      merge: true,

    }

  );

}