import universities from "../../data/universities";

export default function AcademicInformation() {
  return (
    <>
      <h2 className="text-3xl font-bold text-[#0B3D91] mt-16 mb-6">
        Academic Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* University */}
        <select
          name="university"
          required
          className="border rounded-xl p-4"
        >
          <option value="">
            Select University *
          </option>

          {universities.map((university) => (
            <option
              key={university}
              value={university}
            >
              {university}
            </option>
          ))}
        </select>

        {/* Campus */}
        <input
          type="text"
          name="campus"
          placeholder="Campus *"
          required
          className="border rounded-xl p-4"
        />

        {/* Programme */}
        <input
          type="text"
          name="programme"
          placeholder="Programme * (e.g. Bachelor of Nursing)"
          required
          className="border rounded-xl p-4"
        />

        {/* Registration Number */}
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number *"
          required
          className="border rounded-xl p-4"
        />

        {/* Year of Study */}
        <select
          name="year"
          required
          className="border rounded-xl p-4"
        >
          <option value="">Year of Study *</option>
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4</option>
                </select>

      </div>
    </>
  );
}