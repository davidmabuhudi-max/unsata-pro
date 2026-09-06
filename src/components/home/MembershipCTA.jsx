import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import membershipImage from "../../assets/images/cta/membership.jpg";
import membershipVideo from "../../assets/videos/membership.mp4";

export default function MembershipCTA() {
  return (
    <section className="relative h-[700px] overflow-hidden">

      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={membershipVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Image Fallback */}
      <motion.img
        src={membershipImage}
        alt="UNSATA Members"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="absolute inset-0 bg-gradient-to-r
        from-[#021938]/90
        via-[#0B3D91]/70
        to-[#1976D2]/40"></div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >

          <p className="uppercase tracking-[8px] text-cyan-300 font-semibold">

           Join the UNSATA MUHAS Chapter

          </p>

          <h2 className="mt-6 text-5xl lg:text-7xl font-black text-white leading-tight">

            Become Part of the Future of Nursing

          </h2>

          <p className="mt-8 text-xl leading-9 text-blue-100">
  Become a member of the UNSATA MUHAS Chapter and grow through
  leadership development, academic excellence, research, professional
  networking, and community health initiatives while making a positive
  impact on society.
</p>

          <div className="flex flex-wrap gap-6 mt-12">

            <Link
              to="/membership"
              className="bg-cyan-400 text-[#0B3D91] px-8 py-4 rounded-xl font-bold hover:bg-cyan-300 transition"
            >
             Apply for Membership
            </Link>

            <Link
              to="/about"
              className="border border-white text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-white hover:text-[#0B3D91] transition"
            >
              Learn More
              <FaArrowRight />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}