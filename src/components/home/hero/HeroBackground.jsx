import { AnimatePresence, motion } from "framer-motion";

export default function HeroBackground({
  slide,
  currentSlide,
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Hero Image */}
      <AnimatePresence mode="sync">

        <motion.img
          key={slide.id || currentSlide}
          src={slide.image}
          alt=""
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1.10,
          }}
          exit={{
            opacity: 0,
            scale: 1.15,
          }}
          transition={{
            opacity: {
              duration: 1.2,
            },
            scale: {
              duration: 8,
              ease: "linear",
            },
          }}
        />

      </AnimatePresence>

      {/* Transparent Blue Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-[#0B3D91]/35
        "
      />

      {/* Blue Gradient Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#021F4F]/75
          via-[#0B3D91]/45
          to-[#1976D2]/20
        "
      />

      {/* Transparent Sky-Blue Glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#1976D2]/25
          via-transparent
          to-[#00AEEF]/20
        "
      />

      {/* Bottom Blue Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#021F4F]/70
          via-[#0B3D91]/20
          to-transparent
        "
      />

      {/* Soft Blue Decorative Glow - Top Left */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-[#1976D2]/15
          blur-[140px]
          rounded-full
        "
      />

      {/* Soft Cyan Decorative Glow - Bottom Right */}
      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-[#00AEEF]/15
          blur-[140px]
          rounded-full
        "
      />

    </div>
  );
}