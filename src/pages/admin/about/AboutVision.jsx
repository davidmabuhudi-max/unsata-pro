import { FaEye } from "react-icons/fa";

export default function AboutVision({ data, setData }) {

  const vision = data.vision || {
    title: "",
    description: "",
  };

  function handleChange(e) {

    setData({

      ...data,

      vision: {

        ...vision,

        [e.target.name]: e.target.value,

      },

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="border-b p-8 flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0B3D91] flex items-center justify-center">

          <FaEye className="text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#082B69]">

            Vision

          </h2>

          <p className="text-slate-500 mt-1">

            Edit the organization's vision statement.

          </p>

        </div>

      </div>

      <div className="space-y-8 p-8">

        <div>

          <label className="block mb-2 font-semibold">

            Vision Title

          </label>

          <input

            type="text"

            name="title"

            value={vision.title}

            onChange={handleChange}

            className="w-full rounded-xl border p-4"

          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Vision Description

          </label>

          <textarea

            rows={6}

            name="description"

            value={vision.description}

            onChange={handleChange}

            className="w-full rounded-xl border p-4"

          />

        </div>

      </div>

    </div>

  );

}