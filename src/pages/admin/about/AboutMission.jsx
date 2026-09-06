import { FaBullseye } from "react-icons/fa";

export default function AboutMission({
  data,
  setData,
}) {

  const mission = data.mission || {
    title: "",
    description: "",
  };

  function handleChange(e) {

    setData({

      ...data,

      mission: {

        ...mission,

        [e.target.name]: e.target.value,

      },

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="flex items-center gap-4 border-b p-8">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

          <FaBullseye className="text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            Mission

          </h2>

          <p className="mt-1 text-slate-500">

            Edit the organization's mission statement.

          </p>

        </div>

      </div>

      <div className="space-y-8 p-8">

        <div>

          <label className="mb-2 block font-semibold">

            Mission Title

          </label>

          <input
            type="text"
            name="title"
            value={mission.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Mission Description

          </label>

          <textarea
            rows={6}
            name="description"
            value={mission.description}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 focus:border-[#082B69] focus:outline-none"
          />

        </div>

      </div>

    </div>

  );

}