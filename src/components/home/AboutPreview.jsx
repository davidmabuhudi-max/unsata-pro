import { motion } from "framer-motion";
import {
  FaEye,
  FaBullseye,
  FaStar,
  FaHandsHelping,
} from "react-icons/fa";

export default function AboutPreview({ about }) {

  const vision = about?.vision || {};

  const mission = about?.mission || {};

  const objectives = about?.objectives || [];

  const coreValues = about?.coreValues || [];

  const activities = about?.activities || [];

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#1976D2] font-semibold">

            About UNSATA MUHAS Chapter

          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">

            Empowering Future Nursing Leaders

          </h2>

          <p className="mt-8 max-w-4xl mx-auto text-lg text-gray-600 leading-9">

            {about?.general?.description}

          </p>

        </div>

        {/* Vision + Mission */}

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-blue-50 rounded-3xl p-10"
          >

            <FaEye className="text-5xl text-[#1565C0]" />

            <h3 className="mt-6 text-3xl font-bold text-[#0B3D91]">

              {vision.title}

            </h3>

            <p className="mt-5 break-words whitespace-pre-wrap leading-8 text-gray-600">

  {vision.description}

</p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-blue-50 rounded-3xl p-10"
          >

            <FaBullseye className="text-5xl text-[#1565C0]" />

            <h3 className="mt-6 text-3xl font-bold text-[#0B3D91]">

              {mission.title}

            </h3>

            <p className="mt-5 break-words whitespace-pre-wrap leading-8 text-gray-600">

  {mission.description}

</p>

          </motion.div>

        </div>

        {/* Objectives */}

        {objectives.length > 0 && (

          <div className="mt-24">

            <h3 className="text-center text-4xl font-black text-[#0B3D91]">

              Our Objectives

            </h3>

            <div className="grid md:grid-cols-2 gap-8 mt-12">

              {objectives.map((item, index) => (

                <div
                  key={item.id || index}
                  className="rounded-2xl bg-white border border-blue-100 shadow-lg p-8"
                >

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 rounded-full bg-[#1565C0] text-white flex items-center justify-center font-bold">

                      {index + 1}

                    </div>

                    <p className="leading-8 text-gray-700 break-all whitespace-pre-wrap overflow-hidden">
    {item.description}
</p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Core Values */}

        {coreValues.length > 0 && (

          <div className="mt-24">

            <h3 className="text-center text-4xl font-black text-[#0B3D91]">

              Our Core Values

            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

              {coreValues.map((value, index) => (

                <div
                  key={value.id || index}
                  className="rounded-3xl bg-white shadow-lg border border-blue-100 p-8 text-center"
                >

                  <FaStar className="mx-auto text-4xl text-[#1565C0]" />

                  <h4 className="mt-5 text-xl font-bold text-[#0B3D91]">

                    {value.title}

                  </h4>

                 <p className="mt-4 break-words whitespace-pre-wrap leading-7 text-gray-600">

  {value.description}

</p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Activities */}

        {activities.length > 0 && (

          <div className="mt-24">

            <h3 className="text-center text-4xl font-black text-[#0B3D91]">

              What We Do

            </h3>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

              {activities.map((activity, index) => (

                <div
                  key={activity.id || index}
                  className="bg-[#1565C0] rounded-3xl p-10 text-center text-white"
                >

                  <FaHandsHelping className="mx-auto text-5xl" />

                  <h4 className="mt-6 text-2xl font-bold">

                    {activity.title}

                  </h4>

                 <p className="mt-4 break-words whitespace-pre-wrap text-blue-100">

  {activity.description}

</p>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </section>

  );

}