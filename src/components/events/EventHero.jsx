import banner from "../../assets/images/events/conference.jpg";

export default function EventHero() {
  return (
    <section className="relative h-[500px] overflow-hidden">

      <img
        src={banner}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#0B3D91]/70"></div>

      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">

        <div>

          <p className="uppercase tracking-[6px] text-cyan-300">
            Events
          </p>
          <div className="mt-10 flex justify-center gap-4">

  <button
    className="
      bg-white
      text-[#0B3D91]
      px-8
      py-4
      rounded-xl
      font-semibold
    "
  >
    Upcoming Events
  </button>

  <button
    className="
      border-2
      border-white
      px-8
      py-4
      rounded-xl
      font-semibold
    "
  >
    Past Events
  </button>

</div>

          <h1 className="text-6xl font-black mt-6">
            Events & Conferences
          </h1>

          <p className="mt-8 text-xl max-w-3xl">
            Discover conferences, workshops, seminars,
            outreach programmes and training organized by UNSATA.
          </p>

        </div>

      </div>

    </section>
  );
}