import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { verifyMember } from "../services/memberVerificationService";

export default function VerifyMember() {
  const { membershipNumber } = useParams();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMember() {
      setLoading(true);

      const result = await verifyMember(
        membershipNumber
      );

      if (result.success) {
        setMember(result.member);
      } else {
        setError(result.message);
      }

      setLoading(false);
    }

    loadMember();
  }, [membershipNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">

          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>

          <p className="mt-5 text-gray-600">
            Verifying Membership...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">

        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

          <div className="text-7xl">
            ❌
          </div>

          <h1 className="text-3xl font-black text-red-600 mt-6">
            Member Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-5">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-green-600 text-white text-center py-6">

            <h1 className="text-4xl font-black">
              VERIFIED MEMBER
            </h1>

            <p className="mt-2">
              University Nursing Students Association of Tanzania
            </p>

          </div>

          <div className="p-10">

            <div className="flex flex-col items-center">

              <img
                src={
                  member.passportPhoto ||
                  "/default-avatar.png"
                }
                alt={member.fullName}
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-600"
              />

              <h2 className="mt-6 text-3xl font-bold text-center">
                {member.fullName}
              </h2>

              <p className="text-green-600 font-semibold mt-2">
                ACTIVE MEMBER
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <InfoCard
                label="Membership Number"
                value={member.membershipNumber}
              />

              <InfoCard
                label="University"
                value={member.university}
              />

              <InfoCard
                label="Programme"
                value={member.programme}
              />

              <InfoCard
                label="Academic Year"
                value={member.year}
              />

              <InfoCard
                label="Email"
                value={member.email}
              />

              <InfoCard
                label="Phone"
                value={member.phone}
              />

              <InfoCard
                label="Region"
                value={member.region}
              />

              <InfoCard
                label="Status"
                value={member.status}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-5 border">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-bold text-lg break-words">
        {value || "-"}
      </p>

    </div>
  );
}