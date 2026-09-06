import { useState } from "react";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaPaperPlane,
} from "react-icons/fa";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import usePublicContact from "../hooks/usePublicContact";

export default function Contact() {

  const {
    contact,
    loading,
  } = usePublicContact();


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  async function handleSubmit(e) {
    e.preventDefault();

    setSuccess("");
    setError("");


    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setError(
        "Please complete all required fields."
      );

      return;
    }


    try {

      setSending(true);


      await addDoc(
        collection(db, "messages"),
        {
          name: form.name.trim(),

          email: form.email.trim(),

          phone: form.phone.trim(),

          subject: form.subject.trim(),

          message: form.message.trim(),

          status: "unread",

          createdAt:
            serverTimestamp(),
        }
      );


      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });


      setSuccess(
        "Your message has been sent successfully. We will get back to you soon."
      );

    } catch (err) {

      console.error(
        "Failed to send message:",
        err
      );

      setError(
        "Failed to send your message. Please try again."
      );

    } finally {

      setSending(false);

    }
  }


  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

            <p className="mt-4 text-slate-500">
              Loading contact information...
            </p>

          </div>

        </div>

      </main>
    );
  }


  return (
    <main className="bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#082B69] py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="uppercase tracking-[5px] text-blue-200 font-semibold">
            {contact.subtitle}
          </p>

          <h1 className="mt-5 break-words text-5xl font-black">
            {contact.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl break-words text-lg leading-8 text-blue-100">
            {contact.description}
          </p>

        </div>

      </section>


      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="space-y-6">

            <div>

              <p className="uppercase tracking-[4px] text-[#1976D2] font-semibold">
                Contact Information
              </p>

              <h2 className="mt-4 break-words text-3xl font-black text-[#0B3D91]">
                We Would Love to Hear From You
              </h2>

            </div>


            {/* EMAILS */}

            {contact.emails?.map(
              (email, index) => (

                <ContactItem
                  key={`email-${index}`}
                  icon={<FaEnvelope />}
                  title="Email"
                  value={email}
                />

              )
            )}


            {/* PHONES */}

            {contact.phones?.map(
              (phone, index) => (

                <ContactItem
                  key={`phone-${index}`}
                  icon={<FaPhone />}
                  title="Phone"
                  value={phone}
                />

              )
            )}


            {/* ADDRESSES */}

            {contact.addresses?.map(
              (address, index) => (

                <ContactItem
                  key={`address-${index}`}
                  icon={<FaMapMarkerAlt />}
                  title="Location"
                  value={address}
                />

              )
            )}


            {/* OFFICE HOURS */}

            {contact.officeHours?.map(
              (hours, index) => (

                <ContactItem
                  key={`hours-${index}`}
                  icon={<FaClock />}
                  title="Office Hours"
                  value={hours}
                />

              )
            )}


            {/* WEBSITES */}

            {contact.websites?.map(
              (website, index) => (

                <ContactItem
                  key={`website-${index}`}
                  icon={<FaGlobe />}
                  title="Website / Social"
                  value={website}
                  link
                />

              )
            )}


          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          {contact.formEnabled && (

            <div className="lg:col-span-2">

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white p-8 shadow-xl md:p-10"
              >

                <h2 className="text-3xl font-black text-[#0B3D91]">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-gray-500">
                  Fields marked with * are required.
                </p>


                {/* SUCCESS */}

                {success && (

                  <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
                    {success}
                  </div>

                )}


                {/* ERROR */}

                {error && (

                  <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
                    {error}
                  </div>

                )}


                <div className="mt-8 grid gap-6 md:grid-cols-2">


                  {/* NAME */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your full name"
                    />

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your email"
                    />

                  </div>


                  {/* PHONE */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your phone number"
                    />

                  </div>


                  {/* SUBJECT */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                      Subject *
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-100"
                      placeholder="What is your message about?"
                    />

                  </div>

                </div>


                {/* MESSAGE */}

                <div className="mt-6">

                  <label className="mb-2 block font-semibold text-gray-700">
                    Message *
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    maxLength={3000}
                    className="w-full resize-y rounded-xl border border-gray-200 p-4 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-100"
                    placeholder="Write your message..."
                  />

                  <p className="mt-2 text-right text-xs text-gray-400">
                    {form.message.length}/3000
                  </p>

                </div>


                {/* SUBMIT */}

                <div className="mt-8 flex justify-end">

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center gap-3 rounded-xl bg-[#082B69] px-8 py-4 font-semibold text-white hover:bg-[#061d4a] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <FaPaperPlane />

                    {sending
                      ? "Sending..."
                      : "Send Message"}

                  </button>

                </div>

              </form>

            </div>

          )}


          {/* FORM DISABLED */}

          {!contact.formEnabled && (

            <div className="lg:col-span-2">

              <div className="rounded-3xl bg-white p-12 text-center shadow-xl">

                <FaEnvelope className="mx-auto text-5xl text-blue-200" />

                <h2 className="mt-5 text-2xl font-black text-[#0B3D91]">
                  Contact Form Unavailable
                </h2>

                <p className="mt-3 text-gray-500">
                  Please use the contact information provided to reach UNSATA MUHAS.
                </p>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   CONTACT ITEM
============================================================ */

function ContactItem({
  icon,
  title,
  value,
  link = false,
}) {

  if (!value) {
    return null;
  }


  return (
    <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#1565C0]">
        {icon}
      </div>

      <div className="min-w-0">

        <h3 className="font-bold text-[#0B3D91]">
          {title}
        </h3>

        {link ? (

          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-[#1565C0] hover:underline"
          >
            {value}
          </a>

        ) : (

          <p className="mt-1 break-words text-gray-600">
            {value}
          </p>

        )}

      </div>

    </div>
  );
}