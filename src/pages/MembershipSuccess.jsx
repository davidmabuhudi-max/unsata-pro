import { Link } from "react-router-dom";

export default function MembershipSuccess() {

  const applicationId =
    localStorage.getItem("membershipApplicationId");

  return (

    <section className="py-32 bg-slate-100">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center">

        <div className="text-7xl">

          ✅

        </div>

        <h1 className="mt-6 text-5xl font-black text-[#0B3D91]">

          Application Submitted successfully

        </h1>

        <p className="mt-8 text-gray-600">

          Your application has been received successfully.

        </p>

        <div className="mt-10 bg-slate-100 rounded-2xl p-8">

          <h3 className="text-xl font-bold">

            Application ID

          </h3>

          <p className="mt-3 text-3xl font-black text-[#1565C0]">

            {applicationId}

          </p>

          <p className="mt-6 text-gray-500">

            Your application has been received successfully.

You will receive an email after your application has been reviewed by the UNSATA Membership Committee.

          </p>

        </div>

        <Link
          to="/"
          className="
          inline-block
          mt-10
          bg-[#0B3D91]
          text-white
          px-10
          py-4
          rounded-xl
          "
        >

          Return Home

        </Link>

      </div>

    </section>

  );

}