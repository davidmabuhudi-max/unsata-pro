import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
import {
  FaUsers,
  FaUniversity,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

const icons = [
  <FaUsers />,
  <FaUniversity />,
  <FaCalendarAlt />,
  <FaAward />,
];

export default function Statistics({ statistics = [] }) {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="uppercase tracking-[5px] text-[#1976D2] font-semibold">
            UNSATA MUHAS CHAPTER
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            Our Impact at MUHAS
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-lg">
            Building future nursing leaders through academic excellence,
            leadership, research, innovation, and community engagement.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {statistics.map((item, index) => (

            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.04,
              }}
              className="bg-white rounded-3xl shadow-lg border border-blue-100 p-10 text-center"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 text-[#1565C0] flex items-center justify-center text-3xl">

                {icons[index % icons.length]}

              </div>

              <h3 className="mt-8 text-5xl font-black text-[#0B3D91]">

                <AnimatedCounter
                  end={Number(item.value || item.number || 0)}
                />

                {item.suffix || "+"}

              </h3>

              <p className="mt-4 text-center text-lg text-gray-600 break-all whitespace-pre-wrap overflow-hidden">
    {item.title}
</p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}