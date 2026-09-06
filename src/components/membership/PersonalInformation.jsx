import { useState } from "react";

export default function PersonalInformation() {
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-[#0B3D91] mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          required
          className="border rounded-xl p-4"
        />

        <select
          name="gender"
          required
          className="border rounded-xl p-4"
        >
          <option value="">Gender *</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          required
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="nationalId"
          placeholder="National ID (Optional)"
          className="border rounded-xl p-4"
        />

        <div className="md:col-span-2">

          <label className="block mb-3 font-semibold text-[#0B3D91]">
            Passport Photo *
          </label>

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              min-h-[250px]
              border-2
              border-dashed
              border-[#1565C0]
              rounded-3xl
              cursor-pointer
              hover:bg-blue-50
              transition
            "
          >

            {preview ? (
              <img
                src={preview}
                alt="Passport Preview"
                className="w-48 h-48 object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <>
                <div className="text-6xl">👤</div>

                <h3 className="mt-4 text-2xl font-bold text-[#0B3D91]">
                  Upload Passport Image
                </h3>

                <p className="mt-2 text-gray-500">
                  JPG, PNG or JPEG
                </p>
              </>
            )}

 <input
  type="file"
  name="passportPhoto"
  accept="image/*"
  required
  onChange={handleImage}
  className="hidden"
/>

          </label>

        </div>

      </div>
    </>
  );
}