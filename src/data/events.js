import conference from "../assets/images/events/conference.jpg";
import outreach from "../assets/images/events/outreach.jpg";
import workshop from "../assets/images/events/workshop.jpg";

const events = [
  {
    id: 1,

    title: "UNSATA Annual Scientific Conference",

    category: "Conference",

    description:
      "Annual conference bringing together nursing students, educators and healthcare professionals from universities across Tanzania to share research, innovation and professional experiences.",

    shortDescription:
      "Annual national scientific conference for nursing students.",

    day: "25",

    month: "AUG",

    date: "25 August 2026",

    time: "08:00 AM",

    location: "Dar es Salaam",

    venue: "Julius Nyerere International Convention Centre",

    image: conference,

    registration: true,

    registrationLink: "#",

    featured: true,

    active: true,
  },

  {
    id: 2,

    title: "Community Health Outreach",

    category: "Community Outreach",

    description:
      "UNSATA members provide health education, free screening, disease prevention awareness and community engagement activities to improve public health.",

    shortDescription:
      "Community outreach programme serving local communities.",

    day: "10",

    month: "SEP",

    date: "10 September 2026",

    time: "09:00 AM",

    location: "Dodoma",

    venue: "Haneti Village",

    image: outreach,

    registration: false,

    registrationLink: "",

    featured: false,

    active: true,
  },

  {
    id: 3,

    title: "Research & Innovation Workshop",

    category: "Workshop",

    description:
      "A practical workshop designed to equip nursing students with research methodology, scientific writing, innovation and evidence-based practice skills.",

    shortDescription:
      "Workshop on research and innovation for nursing students.",

    day: "18",

    month: "OCT",

    date: "18 October 2026",

    time: "10:00 AM",

    location: "Mwanza",

    venue: "CUHAS Conference Hall",

    image: workshop,

    registration: true,

    registrationLink: "#",

    featured: false,

    active: true,
  },
];

export default events;