import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import {
  subscribeToLeaders,
} from "../../services/leadershipService";

export default function LeadershipPreview() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToLeaders((data) => {
      setLeaders(
        data
          .filter((leader) => leader.status === "Active")
          .slice(0, 4)
      );
    });

    return unsubscribe;
  }, []);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="uppercase tracking-[6px] text-blue-600 font-semibold">
            Our Leadership
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            UNSATA MUHAS Chapter Executive Leaders
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated student leaders committed to serving and
            empowering nursing students at Muhimbili University of Health
            and Allied Sciences.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {leaders.map((leader, index) => (

            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group rounded-3xl overflow-hidden shadow-xl bg-white"
            >

              <div className="relative overflow-hidden">

                <img
                  src={leader.photo}
                  alt={leader.fullName}
                  className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91] via-[#0B3D91]/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              </div>

            <div className="p-6">

  <h3 className="text-2xl font-bold text-[#0B3D91]">
    {leader.fullName}
  </h3>

  <p className="mt-2 text-cyan-600 font-semibold">
    {leader.position}
  </p>

  <p className="mt-2 text-gray-500">
    {leader.programme}
  </p>

  <div className="flex gap-3 mt-5">

    {leader.facebook && (
      <a
        href={leader.facebook}
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebook className="text-blue-600 text-xl hover:scale-110 transition" />
      </a>
    )}

    {leader.instagram && (
      <a
        href={leader.instagram}
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram className="text-pink-600 text-xl hover:scale-110 transition" />
      </a>
    )}

    {leader.linkedin && (
      <a
        href={leader.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className="text-sky-700 text-xl hover:scale-110 transition" />
      </a>
    )}

    {leader.twitter && (
      <a
        href={leader.twitter}
        target="_blank"
        rel="noreferrer"
      >
        <FaXTwitter className="text-black text-xl hover:scale-110 transition" />
      </a>
    )}

  </div>

  <Link
    to={`/leadership/${leader.id}`}
    className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-[#0B3D91] text-white py-3 font-semibold hover:bg-blue-700 transition"
  >
    View Profile
  </Link>

</div>
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}