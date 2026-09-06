import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { getLeaderById } from "../services/leadershipService";

export default function LeaderProfile() {
  const { id } = useParams();

  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeader() {
      const data = await getLeaderById(id);

      setLeader(data);
      setLoading(false);
    }

    loadLeader();
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold">
          Leader Not Found
        </h2>

        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-20">

      <div className="max-w-6xl mx-auto px-6">

        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">

          <div className="grid lg:grid-cols-3">

            <div className="bg-slate-100">

              <img
                src={leader.photo}
                alt={leader.fullName}
                className="w-full h-full object-cover"
              />

            </div>

            <div className="lg:col-span-2 p-10">

              <h1 className="text-4xl font-bold text-slate-900">
                {leader.fullName}
              </h1>

              <p className="text-blue-600 text-xl mt-2 font-semibold">
                {leader.position}
              </p>

              <hr className="my-8" />

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <h4 className="font-bold">
                    Programme
                  </h4>

                  <p>{leader.programme}</p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Academic Year
                  </h4>

                  <p>{leader.academicYear}</p>
                </div>

            
                <div>
                  <h4 className="font-bold">
                    Email
                  </h4>

                  <p className="flex items-center gap-2">
                    <FaEnvelope />
                    {leader.email}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Phone
                  </h4>

                  <p className="flex items-center gap-2">
                    <FaPhone />
                    {leader.phone}
                  </p>
                </div>

              </div>

              <hr className="my-8" />

              <h3 className="text-2xl font-bold">
                Biography
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {leader.bio}
              </p>

             {/* Social Media */}

<hr className="my-8" />

<h3 className="text-2xl font-bold mb-6">
  Social Media
</h3>

<div className="space-y-4">

  {leader.facebook && (
    <a
      href={leader.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border hover:bg-blue-50 transition"
    >
      <FaFacebook className="text-blue-600 text-2xl" />

      <div>
        <p className="font-semibold">
          Facebook
        </p>

        <p className="text-slate-500 text-sm break-all">
          {leader.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, "")}
        </p>
      </div>
    </a>
  )}

  {leader.instagram && (
    <a
      href={leader.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border hover:bg-pink-50 transition"
    >
      <FaInstagram className="text-pink-600 text-2xl" />

      <div>
        <p className="font-semibold">
          Instagram
        </p>

        <p className="text-slate-500 text-sm break-all">
          @{leader.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace("/", "")}
        </p>
      </div>
    </a>
  )}

  {leader.linkedin && (
    <a
      href={leader.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border hover:bg-sky-50 transition"
    >
      <FaLinkedin className="text-sky-700 text-2xl" />

      <div>
        <p className="font-semibold">
          LinkedIn
        </p>

        <p className="text-slate-500 text-sm break-all">
          {leader.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
        </p>
      </div>
    </a>
  )}

  {leader.twitter && (
    <a
      href={leader.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border hover:bg-slate-100 transition"
    >
      <FaXTwitter className="text-black text-2xl" />

      <div>
        <p className="font-semibold">
          X (Twitter)
        </p>

        <p className="text-slate-500 text-sm break-all">
          @{leader.twitter.replace(/^https?:\/\/(www\.)?x\.com\//, "").replace("/", "")}
        </p>
      </div>
    </a>
  )}

</div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}