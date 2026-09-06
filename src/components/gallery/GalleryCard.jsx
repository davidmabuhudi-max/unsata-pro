import { motion } from "framer-motion";

export default function GalleryCard({ photo }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition"
    >
      <div className="relative overflow-hidden">

        <img
          src={photo.image || photo.url}
          alt={photo.title || "Gallery"}
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
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

          {photo.title && (
            <h3 className="text-2xl font-bold text-white break-words">
              {photo.title}
            </h3>
          )}

          {photo.description && (
            <p className="mt-3 text-blue-100 leading-7 break-words whitespace-pre-wrap">
              {photo.description}
            </p>
          )}

        </div>

      </div>
    </motion.div>
  );
}