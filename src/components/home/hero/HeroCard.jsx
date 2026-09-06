import { motion } from "framer-motion";

import {
  FaUserNurse,
  FaBookMedical,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";


const defaultHeroCard = {
  title: "UNSATA MUHAS",

  highlightedTitle: "Chapter",

  description:
    "Empowering nursing students at Muhimbili University of Health and Allied Sciences through leadership, academic excellence, research, innovation, and community engagement.",

  features: [
    "Leadership Development",
    "Research & Innovation",
    "Community Engagement",
    "Academic Excellence",
  ],

  active: true,
};


export default function HeroCard() {

  const [card, setCard] =
    useState(defaultHeroCard);

  useEffect(() => {

    async function loadHeroCard() {

      try {

        const heroCardRef = doc(
          db,
          "homepage",
          "heroCard"
        );

        const snapshot =
          await getDoc(heroCardRef);

        if (snapshot.exists()) {

          setCard({
            ...defaultHeroCard,
            ...snapshot.data(),
          });

        }

      } catch (error) {

        console.error(
          "Failed to load hero card:",
          error
        );

      }

    }

    loadHeroCard();

  }, []);


  if (card.active === false) {
    return null;
  }


  const features =
    card.features ||
    defaultHeroCard.features;


  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 80,
      }}

      animate={{
        opacity: 1,
        x: 0,
        y: [0, -8, 0],
      }}

      transition={{

        opacity: {
          duration: 1,
        },

        x: {
          duration: 1,
        },

        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },

      }}

      className="hidden lg:flex justify-center"

    >

      <div
        className="
          w-96
          rounded-3xl
          border border-white/20
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          p-8
          transition-all
          duration-500
          hover:bg-white/15
          hover:-translate-y-2
          hover:shadow-cyan-500/20
        "
      >

        {/* Icon */}

        <div
          className="
            w-20
            h-20
            rounded-full
            bg-cyan-500
            flex
            items-center
            justify-center
            text-white
            text-4xl
            mx-auto
          "
        >

          <FaUserNurse />

        </div>


        {/* Main Title */}

        <h2
          className="
            mt-6
            text-3xl
            text-center
            font-bold
            text-white
          "
        >

          {card.title}

        </h2>


        {/* Highlighted Title */}

        <h3
          className="
            text-center
            text-cyan-300
            text-2xl
            font-semibold
          "
        >

          {card.highlightedTitle}

        </h3>


        {/* Description */}

        <p
          className="
            mt-6
            text-center
            text-blue-100
            leading-8
          "
        >

          {card.description}

        </p>


        {/* Features */}

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-4 text-white">

            <FaUsers className="text-cyan-300 text-xl shrink-0" />

            {features[0]}

          </div>


          <div className="flex items-center gap-4 text-white">

            <FaBookMedical className="text-cyan-300 text-xl shrink-0" />

            {features[1]}

          </div>


          <div className="flex items-center gap-4 text-white">

            <FaLightbulb className="text-cyan-300 text-xl shrink-0" />

            {features[2]}

          </div>


          <div className="flex items-center gap-4 text-white">

            <FaUserNurse className="text-cyan-300 text-xl shrink-0" />

            {features[3]}

          </div>

        </div>

      </div>

    </motion.div>

  );
}