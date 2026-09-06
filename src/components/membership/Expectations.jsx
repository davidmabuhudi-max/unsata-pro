export default function Expectations() {
  return (
    <>
      <h2 className="text-3xl font-bold text-[#0B3D91] mt-16 mb-6">
        Expectations, Skills & Hobbies
      </h2>

      {/* Expectations */}

      <div>

        <label className="block mb-2 font-semibold text-[#0B3D91]">

          What are your expectations from UNSATA? *

        </label>

        <textarea
          name="expectations"
          rows="5"
          required
          placeholder="Write your expectations..."
          className="w-full border rounded-xl p-4"
        />

      </div>

      {/* Skills */}

      <div className="mt-10">

        <label className="block mb-4 font-semibold text-[#0B3D91]">

          Skills

        </label>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Leadership",
            "Research",
            "Programming",
            "Graphic Design",
            "Public Speaking",
            "Photography",
            "Videography",
            "Community Outreach",
          ].map((skill) => (

            <label
              key={skill}
              className="flex items-center gap-3"
            >

              <input
                type="checkbox"
                name="skills"
                value={skill}
              />

              {skill}

            </label>

          ))}

        </div>

      </div>

      {/* Hobbies */}

      <div className="mt-10">

        <label className="block mb-2 font-semibold text-[#0B3D91]">

          Hobbies

        </label>

        <input
          type="text"
          name="hobbies"
          placeholder="Example: Reading, Football, Music..."
          className="w-full border rounded-xl p-4"
        />

      </div>

    </>
  );
}