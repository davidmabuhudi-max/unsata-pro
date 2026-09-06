export default function ContactInformation() {
  return (
    <>
      <h2 className="text-3xl font-bold text-[#0B3D91] mt-16 mb-6">
        Contact Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          required
          className="border rounded-xl p-4"
        />

        {/* Phone */}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          required
          className="border rounded-xl p-4"
        />

        {/* Region */}

        <input
          type="text"
          name="region"
          placeholder="Region *"
          required
          className="border rounded-xl p-4"
        />

        {/* District */}

        <input
          type="text"
          name="district"
          placeholder="District *"
          required
          className="border rounded-xl p-4"
        />

      </div>
    </>
  );
}