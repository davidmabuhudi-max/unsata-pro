import { useEffect, useState } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import {
  subscribeToLeaders,
} from "../../services/leadershipService";

export default function LeadershipSection() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToLeaders((data) => {
        setLeaders(
          data.filter(
            (leader) =>
              leader.status === "Active"
          )
        );
      });

    return unsubscribe;
  }, []);

  return (
    <section
      id="leadership"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-slate-900">

            Leadership Team

          </h2>

          <p className="mt-5 text-slate-600 max-w-3xl mx-auto">

            Meet the elected leaders of the
            University Nursing Students
            Association of Tanzania (UNSATA)
            MUHAS Chapter.

          </p>

        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {leaders.map((leader) => (

            <div
              key={leader.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              <div className="relative">

                <img
                  src={
                    leader.photo ||
                    "https://via.placeholder.com/400x400"
                  }
                  alt={leader.fullName}
                  className="w-full h-80 object-cover"
                />

                <div className="absolute top-5 right-5">

                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">

                    {leader.position}

                  </span>

                </div>

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-slate-800">

                  {leader.fullName}

                </h3>

                <p className="text-blue-600 font-medium mt-2">

                  {leader.programme}

                </p>

                <p className="text-slate-500 mt-1">

                  Academic Year {leader.academicYear}

                </p>

                <p className="mt-6 text-slate-600 leading-relaxed">

                  {leader.bio}

                </p>

               <div className="flex gap-4 mt-8">

  {leader.facebook?.trim() && (
    <a
      href={leader.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
    >
      <FaFacebook />
    </a>
  )}

  {leader.instagram?.trim() && (
    <a
      href={leader.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white transition flex items-center justify-center"
    >
      <FaInstagram />
    </a>
  )}

  {leader.linkedin?.trim() && (
    <a
      href={leader.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-700 hover:text-white transition flex items-center justify-center"
    >
      <FaLinkedin />
    </a>
  )}

  {leader.twitter?.trim() && (
    <a
      href={leader.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition flex items-center justify-center"
    >
      <FaXTwitter />
    </a>
  )}

</div>

              </div>

            </div>

          ))}

          {leaders.length === 0 && (

            <div className="col-span-full text-center py-20">

              <h3 className="text-2xl font-semibold text-slate-700">

                No Leadership Records

              </h3>

              <p className="text-slate-500 mt-3">

                Leadership information will appear here after
                administrators add leaders from the CMS.

              </p>

            </div>

          )}

        </div>

      </div>

    </section>

  );
}