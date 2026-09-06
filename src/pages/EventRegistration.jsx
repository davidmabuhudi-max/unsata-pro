import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { getEventById } from "../services/eventService";
import {
  registerForEvent,
  getEventRegistrations,
  hasAlreadyRegistered,
} from "../services/registrationService";

export default function EventRegistration() {
  const [searchParams] = useSearchParams();

  const eventId = searchParams.get("id");

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

 const [registered, setRegistered] = useState(false);

const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    programme: "",
    yearOfStudy: "",
    specialRequirements: "",
  });

  useEffect(() => {
    async function load() {
      if (!eventId) {
        setLoading(false);
        return;
      }

      const data = await getEventById(eventId);

      setEvent(data);

      setLoading(false);
    }

    load();
  }, [eventId]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!event) return;

    if (!form.fullName.trim())
      return alert("Full Name is required.");

    if (!form.email.trim())
      return alert("Email is required.");

    const today = new Date();

    if (event.registrationOpens) {
      const open = new Date(event.registrationOpens);

      if (today < open) {
        return alert(
          "Registration has not opened yet."
        );
      }
    }

    if (event.registrationCloses) {
      const close = new Date(event.registrationCloses);

      close.setHours(23,59,59);

      if (today > close) {
        return alert(
          "Registration is closed."
        );
      }
    }

    const registrations =
      await getEventRegistrations(event.id);

    const approved = registrations.filter(
      (r) =>
        r.status === "Approved" ||
        r.status === "Pending"
    );

    let status = "Approved";

    if (event.requireApproval)
      status = "Pending";

    if (
      event.maxParticipants &&
      approved.length >=
        Number(event.maxParticipants)
    ) {
      if (event.allowWaitlist) {
        status = "Waitlist";
      } else {
        return alert(
          "This event is already full."
        );
      }
    }

   try {
  setSaving(true);

  const alreadyRegistered =
    await hasAlreadyRegistered(
      event.id,
      form.email
    );

  if (alreadyRegistered) {
    alert(
      "This email has already been used to register for this event."
    );

    setSaving(false);

    return;
  }

  await registerForEvent({
  eventId: event.id,
  eventTitle: event.title,

  ...form,

  email: form.email
    .trim()
    .toLowerCase(),

  status,
});

      setRegistered(true);

      setMessage(status);

    } catch (error) {
      console.error(error);

      alert(error.message);

    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-32 text-center">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-32 text-center">
        Event not found.
      </div>
    );
  }

  if (registered) {
    return (
      <section className="py-24 bg-slate-100">

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
    <h3 className="text-sm opacity-80">
      Total Registered
    </h3>

    <p className="text-4xl font-bold mt-2">
      {total}
    </p>
  </div>

  <div className="bg-green-600 text-white rounded-xl p-6 shadow">
    <h3 className="text-sm opacity-80">
      Approved
    </h3>

    <p className="text-4xl font-bold mt-2">
      {approved}
    </p>
  </div>

  <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
    <h3 className="text-sm opacity-80">
      Pending
    </h3>

    <p className="text-4xl font-bold mt-2">
      {pending}
    </p>
  </div>

  <div className="bg-red-600 text-white rounded-xl p-6 shadow">
    <h3 className="text-sm opacity-80">
      Rejected
    </h3>

    <p className="text-4xl font-bold mt-2">
      {rejected}
    </p>
  </div>

</div>
          <p className="mt-6 text-xl">

            Thank you for registering.

          </p>

          <p className="mt-4">

            Status:

            <strong>

              {" "}

              {message}

            </strong>

          </p>

          <Link
            to={`/events/${event.id}`}
            className="inline-block mt-10 bg-[#0B3D91] text-white px-8 py-4 rounded-xl"
          >
            Back to Event
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-10">

            <h1 className="text-4xl font-black text-[#0B3D91]">

              {event.title}

            </h1>

            <p className="mt-3 text-gray-600">

              {event.eventDate}

              {" • "}

              {event.eventTime}

            </p>

            <p className="mt-2">

              {event.venue}

            </p>

            <hr className="my-8" />

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                name="university"
                placeholder="University"
                value={form.university}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                name="programme"
                placeholder="Programme"
                value={form.programme}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                name="yearOfStudy"
                placeholder="Year of Study"
                value={form.yearOfStudy}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <textarea
                name="specialRequirements"
                rows={5}
                placeholder="Special Requirements"
                value={form.specialRequirements}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <button
                disabled={saving}
                className="w-full bg-[#0B3D91] hover:bg-blue-700 text-white py-4 rounded-xl"
              >
                {saving
                  ? "Submitting..."
                  : "Submit Registration"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}