import { useEffect, useState } from "react";
import { uploadImage } from "../../../services/cloudinaryService";

import {
  addLeader,
  updateLeader,
} from "../../../services/leadershipService";

const POSITIONS = [
  "President",
  "Vice President",
  "Secretary General",
  "Assistant Secretary General",
  "Treasurer",
  "Academic Affairs Coordinator",
  "Research Coordinator",
  "Projects Coordinator",
  "Publicity & Communications",
  "ICT Coordinator",
  "Sports & Welfare Coordinator",
  "Committee Chairperson",
];

const YEARS = [
  "I",
  "II",
  "III",
  "IV",
  "Intern",
];

const initialForm = {
  fullName: "",
  position: "",
  programme: "Bachelor of Nursing",
  academicYear: "",
  registrationNumber: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  status: "Active",
  displayOrder: 1,
};

export default function LeaderForm({
  open,
  onClose,
  leader = null,
}) {
    
  const [form, setForm] =
    useState(initialForm);

  const [saving, setSaving] =
    useState(false);

  const [preview, setPreview] =
    useState("");
    
  const [imageFile, setImageFile] =
  useState(null);


  useEffect(() => {
    if (leader) {
      setForm({
        ...initialForm,
        ...leader,
      });

      setPreview(leader.photo || "");
    } else {
      setForm(initialForm);
      setPreview("");
    }
  }, [leader]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

function handleImage(e) {
  const file = e.target.files[0];

  if (!file) return;

  setImageFile(file);

  setPreview(URL.createObjectURL(file));
}

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName.trim()) {
      return alert("Full name is required.");
    }

    if (!form.position) {
      return alert("Select leadership position.");
    }

    if (!form.registrationNumber.trim()) {
      return alert(
        "Registration number is required."
      );
    }

    try {
      setSaving(true);
    let photo = form.photo;

if (imageFile) {
  photo = await uploadImage(imageFile);
}
      if (leader) {
        await updateLeader(
  leader.id,
  {
    ...form,
    photo,
  }
);
      } else {
        await addLeader({
  ...form,
  photo,
});
      }

      onClose();
    } catch (error) {
  console.error(error);

  alert(error.message);
}
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">

     <div className="min-h-screen flex items-start justify-center py-8 px-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">

        <div className="px-8 py-6 border-b">

          <h2 className="text-2xl font-bold text-slate-800">

            {leader
              ? "Edit Leader"
              : "Add New Leader"}

          </h2>

          <p className="text-slate-500 mt-1">

            Leadership Management

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                Full Name

              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Position

              </label>

              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Position
                </option>

                {POSITIONS.map((position) => (

                  <option
                    key={position}
                    value={position}
                  >
                    {position}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                Programme

              </label>

              <input
                type="text"
                name="programme"
                value={form.programme}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Academic Year

              </label>

              <select
                name="academicYear"
                value={form.academicYear}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Year
                </option>

                {YEARS.map((year) => (

                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Registration Number

              </label>

              <input
                type="text"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>
                    <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Phone Number

              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Biography

            </label>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 resize-none"
              placeholder="Write a short biography..."
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                Facebook

              </label>

              <input
                type="text"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Instagram

              </label>

              <input
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                LinkedIn

              </label>

              <input
                type="text"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                X (Twitter)

              </label>

              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">

                Status

              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Display Order

              </label>

              <input
                type="number"
                min="1"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Passport Photo

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-xl p-3"
            />

            {preview && (

              <div className="mt-5">

                <img
                  src={preview}
                  alt="Leader Preview"
                  className="w-40 h-40 rounded-xl object-cover border shadow"
                />

              </div>

            )}

          </div>
                    <div className="flex justify-end gap-4 pt-6 border-t">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : leader
                ? "Update Leader"
                : "Add Leader"}
            </button>

          </div>

        </form>
      </div>
    </div>

  </div>

  );
}