import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import AboutPreview from "../components/home/AboutPreview";
import Statistics from "../components/home/Statistics";
import MembershipCTA from "../components/home/MembershipCTA";

import usePublicAbout from "../hooks/usePublicAbout";

export default function About() {

  const { about, loading } = usePublicAbout();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading About Page...
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        About information not found.
      </div>
    );
  }

  const general = about.general || {};
  const statistics = about.statistics || [];
  const timeline = about.timeline || [];
  const partners = about.partners || [];
  const gallery = about.gallery || [];

  return (
    <>

      {/* ================= HERO ================= */}

      <section className="relative h-[450px] overflow-hidden">

        {general.image ? (
          <img
            src={general.image}
            alt={general.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D91] via-[#1565C0] to-[#1976D2]" />
        )}

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 flex h-full items-center justify-center">

          <div className="max-w-5xl px-6 text-center text-white">

            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8 }}
              className="uppercase tracking-[6px] text-cyan-300 font-semibold"
            >
              {general.section}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: .8 }}
              className="mt-5 text-5xl md:text-6xl font-black"
            >
              {general.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5 }}
              className="mt-8 mx-auto max-w-3xl text-xl leading-9 text-blue-100"
            >
              {general.description}
            </motion.p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">

              <Link
                to="/membership"
                className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-[#0B3D91] transition hover:bg-cyan-300"
              >
                {general.buttonText || "Become a Member"}
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-3 rounded-xl border border-white px-8 py-4 transition hover:bg-white hover:text-[#0B3D91]"
              >
                Contact Us
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= ABOUT PREVIEW ================= */}

      <AboutPreview about={about} />

      {/* ================= STATISTICS ================= */}

      <Statistics statistics={statistics} />
            {/* ================= TIMELINE ================= */}

      {timeline.length > 0 && (

        <section className="bg-white py-24">

          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center">

              <h2 className="text-5xl font-black text-[#0B3D91]">
                Our Journey
              </h2>

              <p className="mt-5 text-lg text-slate-600">
                Important milestones in the growth of UNSATA MUHAS Chapter.
              </p>

            </div>

            <div className="relative mx-auto mt-20 max-w-5xl">

              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-100"></div>

              {timeline.map((item, index) => (

                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * .15 }}
                  className={`relative mb-16 flex ${
                    index % 2 === 0
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >

                  <div className="w-full md:w-5/12 rounded-3xl bg-white shadow-lg border border-blue-100 p-8">

                    <span className="font-black text-[#1565C0]">

                      {item.year}

                    </span>

                    <h3 className="mt-3 text-2xl font-bold text-[#0B3D91]">

                      {item.title}

                    </h3>

   <p className="leading-8 break-all whitespace-pre-wrap overflow-hidden">
    {item.description}
</p>
                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* ================= PARTNERS ================= */}

      {partners.length > 0 && (

        <section className="bg-slate-50 py-24">

          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center">

              <h2 className="text-5xl font-black text-[#0B3D91]">

                Our Partners

              </h2>

              <p className="mt-5 text-lg text-slate-600">

                Organizations working together with UNSATA.

              </p>

            </div>

            <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

              {partners.map((partner, index) => (

                <motion.div
                  key={partner.id || index}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-3xl bg-white p-8 shadow-lg"
                >

                  {partner.logo ? (

                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="mx-auto h-24 object-contain"
                    />

                  ) : (

                    <div className="flex h-24 items-center justify-center rounded-xl bg-slate-100">

                      Logo

                    </div>

                  )}

                  <p className="mt-4 text-center break-all whitespace-pre-wrap overflow-hidden">
    {partner.name}
</p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* ================= GALLERY ================= */}

      {gallery.length > 0 && (

        <section className="bg-white py-24">

          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center">

              <h2 className="text-5xl font-black text-[#0B3D91]">

                Gallery

              </h2>

            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {gallery.map((image, index) => (

                <motion.img
                  key={image.id || index}
                  whileHover={{ scale: 1.03 }}
                  src={image.image}
                  alt=""
                  className="h-80 w-full rounded-3xl object-cover shadow-lg"
                />

              ))}

            </div>

          </div>

        </section>

      )}

      {/* ================= QUOTE ================= */}

      <section className="bg-[#0B3D91] py-24 text-center text-white">

        <div className="mx-auto max-w-4xl px-6">

          <FaQuoteLeft className="mx-auto text-5xl text-cyan-300" />

          <h2 className="mt-8 text-4xl font-black">

            Empowering Future Nursing Leaders

          </h2>

          <p className="mt-8 text-xl leading-9 text-blue-100">

            Through leadership, professionalism, innovation,
            research and community engagement we prepare nursing
            students to become transformational healthcare leaders.

          </p>

        </div>

      </section>

      {/* ================= MEMBERSHIP CTA ================= */}

      <MembershipCTA />

    </>

  );

}