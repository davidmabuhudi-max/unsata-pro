import { useState } from "react";
import { motion } from "framer-motion";

import leaders from "../data/leaders";
import positions from "../data/positions";
import LeaderModal from "../components/common/LeaderModal";
import banner from "../assets/images/leadership/banner.jpg";
import {
  FaUsers,
  FaUniversity,
  FaLayerGroup,
  FaAward,
} from "react-icons/fa";

export default function Leadership() {
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedLeader, setSelectedLeader] = useState(null);

  const filteredLeaders = leaders.filter((leader) => {
    const matchesPosition =
      selectedPosition === "All" ||
      leader.position === selectedPosition;

    const matchesSearch =
      leader.name.toLowerCase().includes(search.toLowerCase()) ||
      leader.position.toLowerCase().includes(search.toLowerCase()) ||
      leader.university.toLowerCase().includes(search.toLowerCase());

    return matchesPosition && matchesSearch;
  });

  return (
    <>
     {/* ================= HERO ================= */}

<section className="relative h-[600px] overflow-hidden">

  {/* Background Image */}

  <img
    src={banner}
    alt="Leadership"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}

  <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D91]/90 via-[#0B3D91]/70 to-black/40" />

  {/* Content */}

  <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex items-center">

    <div className="max-w-3xl text-white">

      <p className="uppercase tracking-[6px] text-cyan-300 font-semibold">

        Leadership

      </p>

      <h1 className="mt-6 text-6xl font-black leading-tight">

        Meet the Leaders
        <br />
        Behind UNSATA

      </h1>

      <p className="mt-8 text-xl leading-9 text-blue-100">

        Our leaders are committed to empowering nursing students,
        strengthening leadership, promoting research and
        advancing professional excellence across Tanzania.

      </p>

      {/* Breadcrumb */}

      <div className="mt-10 flex items-center gap-3 text-white/80">

        <span>Home</span>

        <span>/</span>

        <span className="text-cyan-300">

          Leadership

        </span>

      </div>

    </div>

  </div>

</section>
<section className="relative -mt-16 z-30">

  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="text-center">

        <FaUsers className="mx-auto text-4xl text-[#0B3D91]" />

        <h3 className="mt-4 text-4xl font-black text-[#0B3D91]">

          12

        </h3>

        <p className="mt-2 text-gray-600">

          Executive Leaders

        </p>

      </div>

      <div className="text-center">

        <FaUniversity className="mx-auto text-4xl text-[#0B3D91]" />

        <h3 className="mt-4 text-4xl font-black text-[#0B3D91]">

          18

        </h3>

        <p className="mt-2 text-gray-600">

          Universities

        </p>

      </div>

      <div className="text-center">

        <FaLayerGroup className="mx-auto text-4xl text-[#0B3D91]" />

        <h3 className="mt-4 text-4xl font-black text-[#0B3D91]">

          6

        </h3>

        <p className="mt-2 text-gray-600">

          Committees

        </p>

      </div>

      <div className="text-center">

        <FaAward className="mx-auto text-4xl text-[#0B3D91]" />

        <h3 className="mt-4 text-4xl font-black text-[#0B3D91]">

          15+

        </h3>

        <p className="mt-2 text-gray-600">

          Years of Service

        </p>

      </div>

    </div>

  </div>

</section>
{/* ================= LEADERSHIP INTRO ================= */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
bg-white
rounded-[28px]
overflow-hidden
shadow-md
hover:shadow-2xl
transition-all
duration-500
border
border-slate-200
flex
flex-col
h-full
"
    >

      <p className="uppercase tracking-[6px] text-[#1565C0] font-semibold">

        National Executive Council

      </p>

      <h2 className="mt-5 text-5xl font-black text-[#0B3D91]">

        Guiding the Future of Nursing Students

      </h2>

      <p className="mt-8 text-lg leading-9 text-gray-600">

        The National Executive Council provides strategic direction,
        promotes academic excellence, strengthens leadership,
        advocates for nursing students and coordinates activities
        that contribute to the growth of the nursing profession
        throughout Tanzania.

      </p>

    </motion.div>

  </div>

</section>

     <section className="pb-20 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-slate-50 rounded-3xl shadow-lg p-10">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Search */}

        <div>

          <label className="block mb-3 font-semibold text-[#0B3D91]">

            Search Leader

          </label>

          <input
            type="text"
            placeholder="Search by name, university or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              px-6
              py-4
              focus:ring-2
              focus:ring-[#1565C0]
              outline-none
            "
          />

        </div>
        {filteredLeaders.length > 0 ? (

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

    {/* Leader cards */}

  </div>

) : (

  <div className="text-center py-20">

    <h3 className="text-3xl font-bold text-[#0B3D91]">

      No Leaders Found

    </h3>

    <p className="mt-4 text-gray-600">

      Try a different search term or choose another position.

    </p>

  </div>

)}

        {/* Position */}

        <div>

          <label className="block mb-3 font-semibold text-[#0B3D91]">

            Filter Position

          </label>

          <select
            value={selectedPosition}
            onChange={(e) =>
              setSelectedPosition(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              px-6
              py-4
              focus:ring-2
              focus:ring-[#1565C0]
              outline-none
            "
          >

            {positions.map((position) => (

              <option
                key={position}
                value={position}
              >

                {position}

              </option>

            ))}

          </select>

        </div>

      </div>

    </div>

  </div>

</section>

     {/* Leaders */}

<section className="py-24 bg-[#F8FAFC]">

  <div className="max-w-7xl mx-auto px-6">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >

    <p className="uppercase tracking-[6px] text-[#1565C0] font-semibold">

      Leadership Team

    </p>

    <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">

      National Executive Council

    </h2>

    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8">

      Meet the dedicated leaders entrusted with advancing
      the mission and vision of the University Nursing Students
      Association of Tanzania through service, innovation,
      collaboration and professional excellence.

    </p>
    <div className="mt-8 flex justify-center">

  <span
    className="
      bg-[#0B3D91]
      text-white
      px-6
      py-3
      rounded-full
      font-semibold
    "
  >

    {filteredLeaders.length} Executive Leaders

  </span>

</div>

  </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
     {filteredLeaders.map((leader) => (

  <motion.div
    key={leader.id}
   whileHover={{
  y: -12,
}}
    transition={{ duration: 0.3 }}
    className="
      bg-white
      rounded-[28px]
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-500
      border
      border-slate-200
      flex
      flex-col
    "
  >

    {/* Image */}

<div className="overflow-hidden">

  <img
    src={leader.image}
    alt={leader.name}
    className="
      w-full
      h-[330px]
      object-cover
      transition-transform
      duration-700
      hover:scale-105
    "
  />

</div>

{/* Content */}

<div className="p-7 flex flex-col flex-1">

  {/* Name */}

  <h3 className="text-[28px] font-black text-[#0B3D91] leading-tight">

    {leader.name}

  </h3>

  {/* Position */}

 <p className="mt-2 uppercase tracking-wide text-sm font-bold text-[#1976D2]"></p> <p className="mt-2 text-lg font-semibold text-[#1565C0]">

    {leader.position}

  </p>

  {/* University */}

  <p className="mt-5 text-gray-700 leading-7">

    {leader.university}

  </p>

  {/* Year */}

  <p className="mt-2 text-gray-500">

    {leader.year}

  </p>

  {/* Divider */}

  <div className="mt-6 border-t border-slate-200"></div>

  {/* Button */}

  <button
    onClick={() => setSelectedLeader(leader)}
    className="
mt-auto
w-full
py-3
rounded-xl
bg-[#0B3D91]
text-white
font-semibold
hover:bg-[#1565C0]
transition-all
duration-300
"
  >

    View Profile

  </button>
  

</div>

  </motion.div>

))}

    </div>

  </div>

</section>
     <LeaderModal
  leader={selectedLeader}
  onClose={() => setSelectedLeader(null)}
/>
    </>
  );
}