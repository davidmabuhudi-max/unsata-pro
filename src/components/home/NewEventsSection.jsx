import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import news from "../../data/news";
import events from "../../data/events";

export default function NewsEventsSection() {

  const featuredNews = news[0];

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Latest Updates
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            News & Events
          </h2>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Featured News */}

          <motion.div
            whileHover={{ y: -8 }}
            className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-xl"
          >
<div className="relative overflow-hidden">

    <img
        src={featuredNews.image}
        alt={featuredNews.title}
        className="w-full h-96 object-cover transition duration-700 hover:scale-110"
    />

    <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#0B3D91]/70
        to-transparent
        "
    ></div>

    <span
        className="
        absolute
        top-6
        left-6
        bg-cyan-500
        text-white
        px-4
        py-2
        rounded-full
        text-sm
        "
    >
        {featuredNews.category}
    </span>

</div>
            <div className="p-8">

              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">

                {featuredNews.category}

              </span>

              <h3 className="mt-5 text-3xl font-bold text-[#0B3D91]">

                {featuredNews.title}

              </h3>

              <p className="mt-4 text-gray-600">

                {featuredNews.description}

              </p>

              <Link
                to="/news"
                className="inline-block mt-6 text-blue-700 font-semibold hover:text-cyan-500"
              >
                Read More →
              </Link>

            </div>

          </motion.div>

          {/* Events */}

          <div className="space-y-6">

            {events.slice(0,3).map((event) => (

              <motion.div
                key={event.id}
                whileHover={{ x: 8 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex gap-5"
              >

                <div className="w-16 h-16 rounded-xl bg-[#0B3D91] text-white flex flex-col items-center justify-center">

                  <span className="text-xs">
                    {event.month}
                  </span>

                  <span className="text-xl font-bold">
                    {event.day}
                  </span>

                </div>

                <div>

                  <h4 className="font-bold text-[#0B3D91]">

                    {event.title}

                  </h4>

                  <p className="text-gray-500 mt-2">

                    {event.location}

                  </p>

                </div>

              </motion.div>

            ))}

            <Link
              to="/events"
              className="block text-center bg-[#0B3D91] text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              View All Events
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}