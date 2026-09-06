import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroCard from "./HeroCard";
import ScrollIndicator from "./ScrollIndicator";

import usePublicHero from "../../../hooks/usePublicHero";

export default function Hero() {
  const {
    slides,
    loading,
  } = usePublicHero();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * Keep current slide valid when Firebase
   * data changes.
   */
  useEffect(() => {
    if (
      slides.length > 0 &&
      currentSlide >= slides.length
    ) {
      setCurrentSlide(0);
    }
  }, [slides, currentSlide]);

  /*
   * Automatic slider
   * Changes every 8 seconds.
   */
  useEffect(() => {
    if (
      paused ||
      slides.length <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1
          ? 0
          : previous + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, [paused, slides.length]);

  function nextSlide() {
    if (slides.length <= 1) return;

    setCurrentSlide((previous) =>
      previous === slides.length - 1
        ? 0
        : previous + 1
    );
  }

  function previousSlide() {
    if (slides.length <= 1) return;

    setCurrentSlide((previous) =>
      previous === 0
        ? slides.length - 1
        : previous - 1
    );
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <section className="relative min-h-screen bg-[#021938]" />
    );
  }

  /*
   * No active hero slides
   */
  if (!slides.length) {
    return (
      <section className="relative min-h-screen bg-[#021938] flex items-center justify-center px-6">
        <div className="text-center text-white">
          <h1 className="text-4xl font-black">
            UNSATA MUHAS
          </h1>

          <p className="mt-4 text-blue-200">
            No active hero slides available.
          </p>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* Background image */}
      <HeroBackground
        slide={slide}
        currentSlide={currentSlide}
      />

      {/* Main hero content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 min-h-[calc(100vh-80px)] grid lg:grid-cols-2 items-center">

        <HeroContent
          slide={slide}
        />

        <HeroCard />

      </div>

      {/* Left Arrow */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white/10
            backdrop-blur-md
            text-white
            hover:bg-cyan-500
            transition-all
            duration-300
            z-30
            flex
            items-center
            justify-center
          "
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Right Arrow */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-6
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white/10
            backdrop-blur-md
            text-white
            hover:bg-cyan-500
            transition-all
            duration-300
            z-30
            flex
            items-center
            justify-center
          "
        >
          <FaChevronRight />
        </button>
      )}

      {/* Navigation dots */}
      {slides.length > 1 && (
        <div
          className="
            absolute
            bottom-12
            left-1/2
            -translate-x-1/2
            flex
            gap-3
            z-30
          "
        >
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() =>
                setCurrentSlide(index)
              }
              aria-label={`Go to slide ${index + 1}`}
              className={`
                transition-all
                duration-500
                rounded-full
                ${
                  currentSlide === index
                    ? "w-10 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/60"
                    : "w-3 h-3 bg-white/40 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      )}

      <ScrollIndicator />

    </section>
  );
}