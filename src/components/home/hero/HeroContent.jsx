import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function HeroContent({ slide }) {
  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={slide.id}
        className="text-white max-w-2xl"

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
          y: -40,
        }}

        transition={{
          duration: 0.8,
        }}
      >

        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="inline-block mb-6"
        >
          <span className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-300/30 text-cyan-200 text-sm tracking-[3px] uppercase">
            {slide.subtitle}
          </span>
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .4 }}
          className="text-5xl lg:text-7xl font-black leading-tight"
        >
          {slide.title}
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .6 }}
          className="mt-8 text-xl leading-9 text-blue-100"
        >
          {slide.description}
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .8 }}
          className="flex gap-5 mt-12"
        >
          <Link to="/membership">
            <Button>
              apply for membership
            </Button>
          </Link>

          <Link to="/about">
            <Button variant="outline">
              Explore UNSATA-MUHAS 
            </Button>
          </Link>
        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}