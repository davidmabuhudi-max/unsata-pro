import leader1 from "../assets/images/leaders/leader1.jpg";
import leader2 from "../assets/images/leaders/leader2.jpg";
import leader3 from "../assets/images/leaders/leader3.jpg";

const leaders = [
  {
    id: 1,

    name: "David Mabuhudi",

    position: "President",

    university: "Muhimbili University of Health and Allied Sciences",

    year: "Final Year",

    image: leader1,

    bio:
"Provides strategic leadership to the UNSATA MUHAS  and represents nursing students within the university while promoting academic excellence, leadership, research, and community engagement.",

    responsibilities: [
      "Provide strategic leadership.",
      "Chair executive meetings.",
      "Represent UNSATA nationally.",
      "Strengthen partnerships.",
    ],

    email: "president@unsatamuhas.org",

    phone: "+255 XXX XXX XXX",

    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      x: "",
    },

    order: 1,

    active: true,
  },

  {
    id: 2,

    name: "Leader Name",

    position: "Vice President",

    university: "Muhimbili University of Health and Allied Sciences",

    year: "Final Year",

    image: leader2,

    bio:
"Supports the President in coordinating chapter activities, strengthening teamwork, and ensuring successful implementation of student programs.",

    responsibilities: [
      "Assist the President.",
      "Coordinate committees.",
      "Monitor projects.",
    ],

    email: "vicepresident@unsatamuhas.org",

    phone: "",

    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      x: "",
    },

    order: 2,

    active: true,
  },

  {
    id: 3,

    name: "Leader Name",

    position: "Secretary General",

    university: "Muhimbili University of Health and Allied Sciences",

    year: "Final Year",

    image: leader3,

    bio:
"Responsible for official communication, documentation, meeting records, and coordination of administrative activities within the chapter.",

    responsibilities: [
      "Prepare meeting minutes.",
      "Official correspondence.",
      "Maintain records.",
    ],

    email: "secretary@unsatamuhas.org",

    phone: "",

    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      x: "",
    },

    order: 3,

    active: true,
  },
];

export default leaders;