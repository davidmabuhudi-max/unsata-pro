import usePublicAbout from "../../hooks/usePublicAbout";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid() {

  const { about, loading } = usePublicAbout();

  if (loading) {

    return (
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          Loading Gallery...
        </div>
      </section>
    );

  }

  const gallery = about?.gallery || [];

  return (

    <section className="py-24 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black text-[#0B3D91]">

            Photo Gallery

          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

         {gallery
  .filter(photo => photo.active !== false)
  .map(photo => (

            <GalleryCard
              key={photo.id}
              photo={photo}
            />

          ))}

        </div>

      </div>

    </section>

  );

}