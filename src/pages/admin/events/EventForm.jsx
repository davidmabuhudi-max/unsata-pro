import { useEffect, useState } from "react";
import { uploadImage } from "../../../services/cloudinaryService";

import {
  addEvent,
  updateEvent,
} from "../../../services/eventService";

const CATEGORIES = [
  "Conference",
  "Workshop",
  "Training",
  "Seminar",
  "Meeting",
  "Research",
  "Community Outreach",
  "Sports",
  "Career Development",
  "Other",
];

const STATUS = [
  "Upcoming",
  "Ongoing",
  "Completed",
  "Cancelled",
];

const initialForm = {
  title: "",
  description: "",
  banner: "",
  venue: "",
  eventDate: "",
  eventTime: "",
  category: "",

  // Registration
  registrationRequired: false,
  registrationType: "",
  registrationLink: "",
  registrationOpens: "",
  registrationCloses: "",
  maxParticipants: "",
  requireApproval: false,
  registrationFee: "",
  allowWaitlist: false,

  status: "Upcoming",
};

export default function EventForm({
  onClose,
  event = null,
}) {
  const [form, setForm] = useState(initialForm);

  const [saving, setSaving] = useState(false);

  const [preview, setPreview] = useState("");

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    
    if (event) {
      setForm({
        ...initialForm,
        ...event,
      });

      setPreview(event.banner || "");
    } else {
      setForm(initialForm);
      setPreview("");
      setImageFile(null);
    }
  }, [event]);

 

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

    if (!form.title.trim()) {
      return alert("Event title is required.");
    }

    if (!form.eventDate) {
      return alert("Select event date.");
    }

    if (!form.venue.trim()) {
      return alert("Venue is required.");
    }

    try {
      setSaving(true);

      let banner = form.banner;

      if (imageFile) {
        banner = await uploadImage(imageFile);
      }
      console.log("FORM BEFORE SAVE:", form);
      if (event) {
        await updateEvent(event.id, {
          ...form,
          banner,
        });
      } else {
        await addEvent({
          ...form,
          banner,
        });
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto p-6">

      <div className="w-full flex justify-center">

       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-800">

              {event ? "Edit Event" : "Add New Event"}

            </h2>

            <p className="text-slate-500 mt-1">

              Events Management

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
          >

            <div>

              <label className="block mb-2 font-medium">

                Event Title

              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Description

              </label>

              <textarea
                rows={6}
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 font-medium">

                  Venue

                </label>

                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Category

                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >

                  <option value="">

                    Select Category

                  </option>

                  {CATEGORIES.map((category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 font-medium">

                  Event Date

                </label>

                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Event Time

                </label>

                <input
                  type="time"
                  name="eventTime"
                  value={form.eventTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>

            </div>

           <div className="border rounded-2xl p-6 bg-slate-50">

<h3 className="text-xl font-bold mb-6">
Registration Settings
</h3>

<div className="flex items-center gap-3">

<input
type="checkbox"
name="registrationRequired"
checked={form.registrationRequired}
onChange={(e) => {
  const checked = e.target.checked;

  setForm((prev) => ({
    ...prev,
    registrationRequired: checked,

    registrationType: checked ? prev.registrationType : "",
    registrationLink: checked ? prev.registrationLink : "",

    registrationOpens: checked ? prev.registrationOpens : "",
    registrationCloses: checked ? prev.registrationCloses : "",

    maxParticipants: checked ? prev.maxParticipants : "",

    requireApproval: checked ? prev.requireApproval : false,

    registrationFee: checked ? prev.registrationFee : "",

    allowWaitlist: checked ? prev.allowWaitlist : false,
  }));
}}
/>

<label className="font-medium">

Registration Required

</label>

</div>

{form.registrationRequired && (

<>

<div className="mt-6">

<label className="block mb-2 font-medium">

Registration Type

</label>

<select
name="registrationType"
value={form.registrationType}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
>

<option value="">

Select Registration Type

</option>

<option value="external">

External Registration

</option>

<option value="internal">

Internal Registration (UNSATA Website)

</option>

</select>

</div>

{form.registrationType==="external" && (

<div className="mt-6">

<label className="block mb-2 font-medium">

External Registration Link

</label>

<input
type="url"
name="registrationLink"
value={form.registrationLink}
onChange={handleChange}
placeholder="https://..."
className="w-full border rounded-xl px-4 py-3"
/>

</div>

)}

{form.registrationType==="internal" && (

<div className="grid md:grid-cols-2 gap-6 mt-6">

<div>

<label className="block mb-2 font-medium">

Registration Opens

</label>

<input
type="date"
name="registrationOpens"
value={form.registrationOpens}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Registration Closes

</label>

<input
type="date"
name="registrationCloses"
value={form.registrationCloses}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Maximum Participants

</label>

<input
type="number"
name="maxParticipants"
value={form.maxParticipants}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Registration Fee

</label>

<input
type="number"
name="registrationFee"
value={form.registrationFee}
onChange={handleChange}
placeholder="0"
className="w-full border rounded-xl px-4 py-3"
/>

</div>

<div className="flex items-center gap-3">

<input
type="checkbox"
checked={form.requireApproval}
onChange={(e)=>
setForm(prev=>({
...prev,
requireApproval:e.target.checked,
}))
}
/>

<label>

Require Admin Approval

</label>

</div>

<div className="flex items-center gap-3">

<input
type="checkbox"
checked={form.allowWaitlist}
onChange={(e)=>
setForm(prev=>({
...prev,
allowWaitlist:e.target.checked,
}))
}
/>

<label>

Allow Waitlist

</label>

</div>

</div>

)}

</>

)}

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

                  {STATUS.map((status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="block mb-2 font-medium">

                  Event Banner

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full border rounded-xl p-3"
                />

              </div>

            </div>

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="w-full h-72 rounded-xl object-cover border"
              />

            )}

            <div className="flex justify-end gap-4 pt-6 border-t">

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border rounded-xl"
              >

                Cancel

              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >

                {saving
                  ? "Saving..."
                  : event
                  ? "Update Event"
                  : "Add Event"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}