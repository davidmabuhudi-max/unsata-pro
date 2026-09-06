import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

import PersonalInformation from "../components/membership/PersonalInformation";
import AcademicInformation from "../components/membership/AcademicInformation";
import ContactInformation from "../components/membership/ContactInformation";
import PaymentInformation from "../components/membership/PaymentInformation";
import Expectations from "../components/membership/Expectations";
import Declaration from "../components/membership/Declaration";

import { uploadImage } from "../services/cloudinary";
import { submitApplication } from "../services/applicationService";

import {
  sendApplicationReceivedEmail,
} from "../services/emailService";

export default function MembershipApplication() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(form);

      const applicationId = `UNSATA-${new Date().getFullYear()}-${Date.now()
        .toString()
        .slice(-6)}`;

      const passportFile = formData.get("passportPhoto");
      const receiptFile = formData.get("paymentReceipt");

      // Upload both images simultaneously
      const [passportUpload, receiptUpload] = await Promise.all([
        passportFile && passportFile.size > 0
          ? uploadImage(passportFile, "members/passports")
          : Promise.resolve(null),

        receiptFile && receiptFile.size > 0
          ? uploadImage(receiptFile, "members/receipts")
          : Promise.resolve(null),
      ]);

      await submitApplication({
        applicationId,

        // Personal Information
        fullName: formData.get("fullName"),
        gender: formData.get("gender"),
        dateOfBirth: formData.get("dateOfBirth"),
        nationalId: formData.get("nationalId"),

        // Academic Information
        university: formData.get("university"),
        campus: formData.get("campus"),
        programme: formData.get("programme"),
        registrationNumber: formData.get("registrationNumber"),
        year: formData.get("year"),

        // Contact Information
        email: formData.get("email"),
        phone: formData.get("phone"),
        region: formData.get("region"),
        district: formData.get("district"),

        // Payment
        paymentMethod: formData.get("paymentMethod"),
        paymentReference: formData.get("paymentReference"),

        // Expectations
        expectations: formData.get("expectations"),
        hobbies: formData.get("hobbies"),
        skills: formData.getAll("skills"),

        // Passport
        passportPhoto: passportUpload?.url || "",
        passportPhotoId: passportUpload?.publicId || "",

        // Receipt
        paymentReceipt: receiptUpload?.url || "",
        paymentReceiptId: receiptUpload?.publicId || "",

        status: "Pending",
        createdAt: serverTimestamp(),
      });
     // Send confirmation email (does not stop submission if email fails)
try {
  await sendApplicationReceivedEmail({
    email: formData.get("email"),
    name: formData.get("fullName"),
  });

  console.log("Confirmation email sent successfully.");
} catch (emailError) {
  console.error("Failed to send confirmation email:", emailError);
}

// Application was saved successfully
alert("Application submitted successfully.");

navigate("/membership/success");
    } catch (error) {
      console.error(error);
      alert(error.message || "Application submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12">
        <div className="text-center">
          <h1 className="text-5xl font-black text-[#0B3D91]">
            Membership Application
          </h1>

          <p className="mt-6 text-gray-600">
            Complete all required information below to apply for membership
            in the University Nursing Students Association of Tanzania
            (UNSATA).
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-16 space-y-16"
        >
          <PersonalInformation />
          <AcademicInformation />
          <ContactInformation />
          <PaymentInformation />
          <Expectations />
          <Declaration />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0B3D91] hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}