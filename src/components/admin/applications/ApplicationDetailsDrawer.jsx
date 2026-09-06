import {
  approveApplication,
  rejectApplication,
  deleteApplication,
  REJECTION_REASONS,
  buildRejectionReason,
} from "../../../services/applicationService";

import {
  sendApprovalEmail,
  sendRejectionEmail,
} from "../../../services/emailService";

import { useAuth } from "../../../contexts/AuthContext";

import Swal from "sweetalert2";

export default function ApplicationDetailsDrawer({
  application,
  refresh,
  onClose,
}) {
  const { currentUser } = useAuth();

  async function approve() {
    const result = await Swal.fire({
      title: "Approve Application?",
      html: `
        <p>This applicant will become an official UNSATA member.</p>
        <br/>
        <b>${application.fullName}</b>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // Approve application and create member
      await approveApplication(
        application.id,
        currentUser.uid
      );

      // Send approval email
      try {
        await sendApprovalEmail({
          email: application.email,
          name: application.fullName,
          membershipNumber:
            application.membershipNumber ||
            application.applicationId ||
            "Pending Assignment",
        });

        console.log(
          "Approval email sent successfully."
        );
      } catch (emailError) {
        console.error(
          "Failed to send approval email:",
          emailError
        );
      }

      await refresh();

      onClose();

      Swal.fire({
        icon: "success",
        title: "Approved",
        text:
          "Membership has been created successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: err.message,
      });
    }
  }

    async function reject() {
    const { value: formValues } = await Swal.fire({
      title: "Reject Application",

      html: `
        <div style="text-align:left">

          <label style="font-weight:bold">
            Reason
          </label>

          <select
            id="reason"
            class="swal2-input"
          >

            ${REJECTION_REASONS.map(
              (reason) => `
                <option value="${reason}">
                  ${reason}
                </option>
              `
            ).join("")}

          </select>

          <textarea
            id="customReason"
            class="swal2-textarea"
            placeholder="Enter reason if Other is selected..."
          ></textarea>

        </div>
      `,

      focusConfirm: false,

      showCancelButton: true,

      confirmButtonColor: "#f59e0b",

      confirmButtonText: "Reject",

      preConfirm: () => {
        const reason =
          document.getElementById("reason").value;

        const custom =
          document.getElementById("customReason").value;

        const finalReason =
          buildRejectionReason(reason, custom);

        if (!finalReason) {
          Swal.showValidationMessage(
            "Please provide a rejection reason."
          );

          return false;
        }

        return {
          finalReason,
        };
      },
    });

    if (!formValues) return;

    try {
      await rejectApplication(
        application.id,
        currentUser.uid,
        formValues.finalReason
      );

      // Send rejection email
      try {
        await sendRejectionEmail({
          email: application.email,
          name: application.fullName,
          reason: formValues.finalReason,
        });

        console.log(
          "Rejection email sent successfully."
        );
      } catch (emailError) {
        console.error(
          "Failed to send rejection email:",
          emailError
        );
      }

      await refresh();

      onClose();

      Swal.fire({
        icon: "success",
        title: "Application Rejected",
        text:
          "The application has been rejected successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  }

  async function deleteNow() {
    const result = await Swal.fire({
      title: "Delete Application?",
      text:
        "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteApplication(
        application.id,
        currentUser.uid
      );

      await refresh();

      onClose();

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1600,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message,
      });
    }
  }

    return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-[700px] h-full overflow-y-auto p-8">

        <div className="flex justify-between items-center border-b pb-4">

          <h2 className="text-2xl font-bold">
            Application Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="mt-8 space-y-8">

          {/* Passport Photo */}

          <div>

            <h3 className="font-bold text-lg mb-3">
              Passport Photo
            </h3>

            {application.passportPhoto ? (

              <img
                src={application.passportPhoto}
                alt="Passport"
                onClick={() =>
                  window.open(
                    application.passportPhoto,
                    "_blank"
                  )
                }
                className="w-44 rounded-xl border shadow cursor-pointer hover:scale-105 transition"
              />

            ) : (

              <div className="bg-gray-100 rounded-xl p-6">
                No passport photo uploaded.
              </div>

            )}

          </div>

          {/* Payment Receipt */}

          <div>

            <h3 className="font-bold text-lg mb-3">
              Payment Receipt
            </h3>

            {application.paymentReceipt ? (

              <img
                src={application.paymentReceipt}
                alt="Receipt"
                onClick={() =>
                  window.open(
                    application.paymentReceipt,
                    "_blank"
                  )
                }
                className="rounded-xl border max-h-96 cursor-pointer hover:shadow-lg transition"
              />

            ) : (

              <div className="bg-gray-100 rounded-xl p-6">
                No payment receipt uploaded.
              </div>

            )}

          </div>

          {/* Applicant Information */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-6">

              {[
                ["Full Name", application.fullName],
                ["Gender", application.gender],
                ["Date of Birth", application.dateOfBirth],
                ["National ID", application.nationalId],
                ["University", application.university],
                ["Campus", application.campus],
                ["Programme", application.programme],
                ["Registration Number", application.registrationNumber],
                ["Academic Year", application.year],
                ["Email", application.email],
                ["Phone", application.phone],
                ["Region", application.region],
                ["District", application.district],
                ["Payment Method", application.paymentMethod],
                ["Payment Reference", application.paymentReference],
                ["Current Status", application.status],
              ].map(([label, value]) => (

                <div key={label}>

                  <p className="text-sm text-gray-500">
                    {label}
                  </p>

                  <p className="font-semibold break-words">
                    {value || "-"}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Skills */}

          <div>

            <h3 className="font-bold mb-3">
              Skills
            </h3>

            {application.skills?.length ? (

              <div className="flex flex-wrap gap-2">

                {application.skills.map((skill) => (

                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            ) : (

              <p>No skills provided.</p>

            )}

          </div>

          {/* Hobbies */}

          <div>

            <h3 className="font-bold mb-2">
              Hobbies
            </h3>

            <p>
              {application.hobbies || "-"}
            </p>

          </div>

          {/* Expectations */}

          <div>

            <h3 className="font-bold mb-2">
              Expectations
            </h3>

            <p className="leading-7 whitespace-pre-wrap">
              {application.expectations || "-"}
            </p>

          </div>

          {/* Rejection Reason */}

          {application.status === "Rejected" &&
            application.rejectionReason && (

              <div className="rounded-xl bg-red-50 border border-red-200 p-5">

                <h3 className="font-bold text-red-700 mb-2">
                  Rejection Reason
                </h3>

                <p className="text-red-600">
                  {application.rejectionReason}
                </p>

              </div>

            )}

          {/* Action Buttons */}

          <div className="grid grid-cols-3 gap-4 pt-6">

            <button
              onClick={approve}
              disabled={
                application.status !== "Pending"
              }
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition"
            >
              Approve
            </button>

            <button
              onClick={reject}
              disabled={
                application.status !== "Pending"
              }
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition"
            >
              Reject
            </button>

            <button
              onClick={deleteNow}
              className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}