import banner from "../../assets/images/gallery/gallery1.jpg";

export default function GalleryHero() {

  return (

    <section className="relative h-[500px]">

      <img
        src={banner}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#0B3D91]/70" />

      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center text-white">

          <p className="uppercase tracking-[6px] text-cyan-300">

            Gallery

          </p>

          <h1 className="text-6xl font-black mt-6">

            Our Moments

          </h1>

          <p className="mt-8 max-w-3xl">

            Explore conferences, workshops,
            outreach programmes and memorable
            moments from UNSATA.

          </p>

        </div>

      </div>

    </section>

  );

}