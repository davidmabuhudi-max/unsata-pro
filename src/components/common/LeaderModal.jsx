import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaEnvelope, FaPhone } from "react-icons/fa";

export default function LeaderModal({ leader, onClose }) {
  return (
    <AnimatePresence>
      {leader && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: .8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: .8, opacity: 0 }}
            transition={{ duration: .3 }}
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl"
          >
            <div className="flex justify-end p-4">

              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>

            </div>

            <div className="grid lg:grid-cols-2">

              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
              />

              <div className="p-10">

                <p className="text-cyan-600 font-semibold">
                  {leader.position}
                </p>

                <h2 className="text-4xl font-black text-[#0B3D91] mt-3">
                  {leader.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  {leader.university}
                </p>

                <p className="text-gray-600">
                  {leader.year}
                </p>

                <div className="mt-8">

                  <h3 className="font-bold text-xl text-[#0B3D91]">
                    Biography
                  </h3>

                  <p className="mt-3 text-gray-600 leading-8">
                    {leader.bio}
                  </p>

                </div>

                <div className="mt-8">

                  <h3 className="font-bold text-xl text-[#0B3D91]">
                    Responsibilities
                  </h3>

                  <ul className="mt-4 space-y-3">

                    {leader.responsibilities.map((item, index) => (

                      <li key={index}>
                        ✓ {item}
                      </li>

                    ))}

                  </ul>

                </div>

                <div className="mt-8 space-y-3">

                  <div className="flex items-center gap-3">

                    <FaEnvelope />

                    {leader.email}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaPhone />

                    {leader.phone}

                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}