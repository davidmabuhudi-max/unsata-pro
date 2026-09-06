import { motion } from "framer-motion";
import usePublicAbout from "../../hooks/usePublicAbout";

export default function PartnersSection() {

  const { about, loading } = usePublicAbout();

  if (loading) return null;

  const partners = about?.partners || [];

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-blue-600 font-semibold">
            Our Partners & Collaborators
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            Building Strong Partnerships
          </h2>
        
        </div>
         <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
  We collaborate with universities, healthcare institutions,
  professional organizations, and development partners to
  strengthen nursing education, leadership, research, and
  community service.
</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {partners.map((partner) => (

            <motion.a
              key={partner.id}
              href={partner.website || "#"}
              target="_blank"
              rel="noreferrer"

              whileHover={{
                scale: 1.08,
              }}

            className="
bg-white
rounded-3xl
shadow-lg
p-8
transition
hover:-translate-y-2
hover:shadow-xl
text-center
overflow-hidden
min-w-0
h-full
"
            >

   <div className="flex flex-col items-center text-center">

  <img
    src={partner.image || partner.logo}
    alt={partner.name}
    className="h-20 object-contain"
  />

  <h3 className="mt-6 text-xl font-bold text-[#0B3D91]">
    {partner.name}
  </h3>

  {partner.description && (
    <p className="mt-3 text-gray-600 leading-7 break-words">
      {partner.description}
    </p>
  )}

</div>

            </motion.a>

          ))}

        </div>

      </div>

    </section>
  );
}