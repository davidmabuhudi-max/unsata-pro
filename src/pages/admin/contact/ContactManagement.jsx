import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const defaultContact = {
  subtitle: "GET IN TOUCH",
  title: "Contact UNSATA MUHAS",
  description:
    "Have a question, suggestion, or need more information about UNSATA MUHAS Chapter? Send us a message and our team will get back to you.",

  emails: [],
  phones: [],
  addresses: [],
  officeHours: [],
  websites: [],

  formEnabled: true,
};

export default function ContactManagement() {
  const [contact, setContact] =
    useState(defaultContact);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");


  useEffect(() => {
    loadContact();
  }, []);


  async function loadContact() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "contactSettings")
      );

      if (!snapshot.empty) {
        const data =
          snapshot.docs[0].data();

        setContact({
          ...defaultContact,
          ...data,
        });
      }

    } catch (error) {
      console.error(
        "Failed to load contact settings:",
        error
      );
    } finally {
      setLoading(false);
    }
  }


  function updateField(name, value) {
    setContact((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  function addItem(field) {
    setContact((previous) => ({
      ...previous,

      [field]: [
        ...(previous[field] || []),
        "",
      ],
    }));
  }


  function updateItem(
    field,
    index,
    value
  ) {
    setContact((previous) => {

      const items = [
        ...(previous[field] || []),
      ];

      items[index] = value;

      return {
        ...previous,
        [field]: items,
      };
    });
  }


  function removeItem(field, index) {
    setContact((previous) => {

      const items = [
        ...(previous[field] || []),
      ];

      items.splice(index, 1);

      return {
        ...previous,
        [field]: items,
      };
    });
  }


  async function handleSave(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      await setDoc(
        doc(
          db,
          "contactSettings",
          "main"
        ),
        {
          ...contact,
          updatedAt: new Date(),
        }
      );

      setMessage(
        "Contact information saved successfully."
      );

    } catch (error) {
      console.error(error);

      setMessage(
        "Failed to save contact information."
      );
    } finally {
      setSaving(false);
    }
  }


  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

          <p className="mt-4 text-slate-500">
            Loading contact settings...
          </p>

        </div>

      </div>
    );
  }


  return (
    <form
      onSubmit={handleSave}
      className="space-y-8"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

              <FaEnvelope className="text-3xl" />

            </div>

            <div>

              <h1 className="text-3xl font-black text-[#082B69]">
                Contact Management
              </h1>

              <p className="mt-2 text-slate-500">
                Manage all contact information displayed on the public website.
              </p>

            </div>

          </div>


          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-3 rounded-xl bg-[#082B69] px-7 py-4 font-semibold text-white hover:bg-[#061d4a] disabled:opacity-60"
          >

            <FaSave />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>


      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message && (

        <div className="rounded-2xl bg-green-50 p-5 font-semibold text-green-700">
          {message}
        </div>

      )}


      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="mb-8">

          <h2 className="text-2xl font-black text-[#082B69]">
            Contact Page Content
          </h2>

          <p className="mt-2 text-slate-500">
            Control the heading and introductory text shown to website visitors.
          </p>

        </div>


        <div className="space-y-6">

          {/* Subtitle */}

          <div>

            <label className="mb-2 block font-semibold">
              Subtitle
            </label>

            <input
              type="text"
              value={contact.subtitle}
              onChange={(e) =>
                updateField(
                  "subtitle",
                  e.target.value
                )
              }
              maxLength={100}
              className="w-full rounded-xl border p-4 outline-none focus:border-[#1976D2]"
            />

          </div>


          {/* Title */}

          <div>

            <label className="mb-2 block font-semibold">
              Page Title
            </label>

            <input
              type="text"
              value={contact.title}
              onChange={(e) =>
                updateField(
                  "title",
                  e.target.value
                )
              }
              maxLength={150}
              className="w-full rounded-xl border p-4 outline-none focus:border-[#1976D2]"
            />

          </div>


          {/* Description */}

          <div>

            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              value={contact.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              maxLength={1000}
              className="w-full resize-y rounded-xl border p-4 outline-none focus:border-[#1976D2]"
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          EMAILS
      ===================================================== */}

      <ContactList
        title="Email Addresses"
        icon={<FaEnvelope />}
        field="emails"
        items={contact.emails}
        placeholder="example@muhas.ac.tz"
        onAdd={addItem}
        onChange={updateItem}
        onRemove={removeItem}
      />


      {/* =====================================================
          PHONE NUMBERS
      ===================================================== */}

      <ContactList
        title="Phone Numbers"
        icon={<FaPhone />}
        field="phones"
        items={contact.phones}
        placeholder="+255 XXX XXX XXX"
        onAdd={addItem}
        onChange={updateItem}
        onRemove={removeItem}
      />


      {/* =====================================================
          ADDRESSES
      ===================================================== */}

      <ContactList
        title="Addresses / Locations"
        icon={<FaMapMarkerAlt />}
        field="addresses"
        items={contact.addresses}
        placeholder="Enter physical address"
        onAdd={addItem}
        onChange={updateItem}
        onRemove={removeItem}
      />


      {/* =====================================================
          OFFICE HOURS
      ===================================================== */}

      <ContactList
        title="Office Hours"
        icon={<FaClock />}
        field="officeHours"
        items={contact.officeHours}
        placeholder="Monday - Friday: 8:00 AM - 5:00 PM"
        onAdd={addItem}
        onChange={updateItem}
        onRemove={removeItem}
      />


      {/* =====================================================
          WEBSITE / SOCIAL LINKS
      ===================================================== */}

      <ContactList
        title="Website / Social Links"
        icon={<FaGlobe />}
        field="websites"
        items={contact.websites}
        placeholder="https://..."
        onAdd={addItem}
        onChange={updateItem}
        onRemove={removeItem}
      />


      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-black text-[#082B69]">
              Public Contact Form
            </h2>

            <p className="mt-2 text-slate-500">
              Allow visitors to send messages through the website.
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              updateField(
                "formEnabled",
                !contact.formEnabled
              )
            }
            className={`relative h-7 w-14 rounded-full transition ${
              contact.formEnabled
                ? "bg-[#082B69]"
                : "bg-slate-300"
            }`}
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                contact.formEnabled
                  ? "left-8"
                  : "left-1"
              }`}
            />

          </button>

        </div>

        <p className="mt-4 text-sm text-slate-500">
          {contact.formEnabled
            ? "The contact form is currently visible to visitors."
            : "The contact form is currently hidden from visitors."}
        </p>

      </div>


      {/* =====================================================
          BOTTOM SAVE
      ===================================================== */}

      <div className="flex justify-end pb-8">

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-3 rounded-xl bg-[#082B69] px-8 py-4 font-semibold text-white shadow-lg hover:bg-[#061d4a] disabled:opacity-60"
        >

          <FaSave />

          {saving
            ? "Saving..."
            : "Save Contact Settings"}

        </button>

      </div>

    </form>
  );
}


/* ============================================================
   REUSABLE CONTACT LIST
============================================================ */

function ContactList({
  title,
  icon,
  field,
  items = [],
  placeholder,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#1565C0]">
            {icon}
          </div>

          <div>

            <h2 className="text-2xl font-black text-[#082B69]">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add, edit or remove information.
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={() => onAdd(field)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-100 px-5 py-3 font-semibold text-[#082B69] hover:bg-blue-200"
        >

          <FaPlus />

          Add

        </button>

      </div>


      <div className="mt-6 space-y-4">

        {items.length === 0 && (

          <div className="rounded-xl border border-dashed p-6 text-center text-slate-400">
            No information added yet.
          </div>

        )}


        {items.map((item, index) => (

          <div
            key={index}
            className="flex gap-3"
          >

            <input
              type="text"
              value={item}
              onChange={(e) =>
                onChange(
                  field,
                  index,
                  e.target.value
                )
              }
              placeholder={placeholder}
              className="flex-1 rounded-xl border p-4 outline-none focus:border-[#1976D2]"
            />

            <button
              type="button"
              onClick={() =>
                onRemove(
                  field,
                  index
                )
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
              title="Delete"
            >

              <FaTrash />

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}