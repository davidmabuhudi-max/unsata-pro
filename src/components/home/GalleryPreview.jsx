import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import usePublicAbout from "../../hooks/usePublicAbout";

export default function GalleryPreview() {

  const { about, loading } = usePublicAbout();

  if (loading) return null;

  const gallery = about?.gallery || [];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-blue-600 font-semibold">
            Our Gallery
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            Capturing Life at UNSATA MUHAS 
          </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
  Explore memorable moments from leadership activities, academic events,
  community outreach, workshops, and student life at the UNSATA MUHAS
  Chapter.
</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {gallery
  .filter(item => item.active !== false)
  .map((item) => (

            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
            >

              <img
    src={item.image || item.url}
               alt={item.title || "Gallery Image"}
                className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
              />

              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-[#0B3D91]/90
                via-[#0B3D91]/40
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition duration-500
                flex flex-col justify-end
                p-6
                "
              >

               <h3 className="text-white text-2xl font-bold break-words">

    {item.title}

</h3>

                <p className="mt-3 text-blue-100 leading-7 break-words whitespace-pre-wrap">

    {item.description}

</p>

                <Link
                  to="/gallery"
                  className="mt-5 inline-block text-cyan-300 font-semibold"
                >
                  View Gallery →
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}