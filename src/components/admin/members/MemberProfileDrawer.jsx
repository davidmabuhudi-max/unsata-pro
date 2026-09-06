import { useRef, useState } from "react";
import Swal from "sweetalert2";

import EditMemberModal from "./EditMemberModal";
import MemberCard from "./MemberCard";

import {
  downloadCard,
  downloadCardPDF,
  printCard,
} from "../../../utils/downloadCard";

import {
  suspendMember,
  activateMember,
  deleteMember,
} from "../../../services/memberService";

export default function MemberProfileDrawer({
  member,
  refresh,
  onClose,
}) {

  const [editOpen, setEditOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef(null);

  async function handleDownloadPNG() {
    try {

      setDownloading(true);

      await downloadCard(
        cardRef.current,
        `UNSATA_Member_${member.memberId}.png`
      );

      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: "Membership card downloaded successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

    } finally {

      setDownloading(false);

    }
  }

  async function handleDownloadPDF() {

    try {

      setDownloading(true);

      await downloadCardPDF(
        cardRef.current,
        `UNSATA_Member_${member.memberId}.pdf`
      );

      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: "PDF downloaded successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

    } finally {

      setDownloading(false);

    }

  }

  function handlePrint() {

    printCard(cardRef.current);

  }

  async function handleSuspend() {

    const result = await Swal.fire({

      title:
        member.status === "Suspended"
          ? "Activate Member?"
          : "Suspend Member?",

      text:
        member.status === "Suspended"
          ? "This member account will be activated."
          : "This member account will be suspended.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor:
        member.status === "Suspended"
          ? "#16a34a"
          : "#ca8a04",

      confirmButtonText:
        member.status === "Suspended"
          ? "Activate"
          : "Suspend",

    });

    if (!result.isConfirmed) return;

    try {

      if (member.status === "Suspended") {

        await activateMember(member.id);

      } else {

        await suspendMember(member.id);

      }

      await refresh();

      onClose();

      Swal.fire({

        icon: "success",

        title: "Success",

        text:
          member.status === "Suspended"
            ? "Member activated successfully."
            : "Member suspended successfully.",

        timer: 1500,

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

  async function handleDelete() {

    const result = await Swal.fire({

      title: "Delete Member?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      confirmButtonText: "Delete",

    });

    if (!result.isConfirmed) return;

    try {

      await deleteMember(member.id);

      await refresh();

      onClose();

      Swal.fire({

        icon: "success",

        title: "Deleted",

        text: "Member deleted successfully.",

        timer: 1500,

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

  return (    <>
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

        <div className="bg-white w-[720px] h-full overflow-y-auto shadow-2xl">

          {/* Header */}

          <div className="p-8 border-b flex justify-between items-center sticky top-0 bg-white z-20">

            <div>

              <h2 className="text-2xl font-bold">
                Member Profile
              </h2>

              <p className="text-gray-500 mt-1">
                View member information and membership card
              </p>

            </div>

            <button
              onClick={onClose}
              className="text-3xl font-bold hover:text-red-600 transition"
            >
              ×
            </button>

          </div>

          <div className="p-8">

            {/* Profile */}

            <div className="flex items-center gap-6">

              <img
                src={member.passportPhoto || "/avatar.png"}
                alt={member.fullName}
                className="w-36 h-36 rounded-full border-4 border-blue-100 object-cover shadow"
              />

              <div className="flex-1">

                <h2 className="text-3xl font-bold text-slate-800">
                  {member.fullName}
                </h2>

                <p className="text-[#0B3D91] font-semibold mt-2">
                  {member.memberId}
                </p>

                <p className="text-gray-500 mt-1">
                  {member.email}
                </p>

                <div
                  className={`inline-flex mt-4 px-4 py-2 rounded-full font-semibold ${
                    member.status === "Suspended"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {member.status}
                </div>

              </div>

            </div>

            {/* Information */}

            <div className="grid grid-cols-2 gap-5 mt-10">

              <Info
                label="Gender"
                value={member.gender}
              />

              <Info
                label="Phone"
                value={member.phone}
              />

              <Info
                label="University"
                value={member.university}
              />

              <Info
                label="Programme"
                value={member.programme}
              />

              <Info
                label="Academic Year"
                value={member.year}
              />

              <Info
                label="Registration Number"
                value={member.registrationNumber}
              />

              <Info
                label="Membership Status"
                value={member.status}
              />

              <Info
                label="Joined"
                value={
                  member.joinedAt
                    ?.toDate?.()
                    ?.toLocaleDateString() ?? "-"
                }
              />

            </div>

            {/* Receipt */}

            <div className="mt-10">

              <h3 className="text-xl font-bold mb-4">
                Membership Payment Receipt
              </h3>

              {member.paymentReceipt ? (

                <img
                  src={member.paymentReceipt}
                  alt="Receipt"
                  className="rounded-xl border shadow-lg w-full"
                />

              ) : (

                <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">

                  No payment receipt uploaded.

                </div>

              )}

            </div>

            {/* Membership Card */}

            <div className="mt-12">

              <h2 className="text-2xl font-bold mb-6">
                Membership Card
              </h2>

              <div className="bg-slate-50 rounded-xl p-8">

                <div
                  ref={cardRef}
                  className="flex justify-center"
                >
                  <MemberCard member={member} />
                </div>

              </div>              <div className="grid grid-cols-3 gap-4 mt-6">

                <button
                  disabled={downloading}
                  onClick={handleDownloadPNG}
                  className="bg-[#0B3D91] hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {downloading
                    ? "Downloading..."
                    : "Download PNG"}
                </button>

                <button
                  disabled={downloading}
                  onClick={handleDownloadPDF}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {downloading
                    ? "Downloading..."
                    : "Download PDF"}
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  Print Card
                </button>

              </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-3 gap-4 mt-10">

              <button
                onClick={() => setEditOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Edit Member
              </button>

              <button
                onClick={handleSuspend}
                className={`py-3 rounded-xl text-white font-semibold ${
                  member.status === "Suspended"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {member.status === "Suspended"
                  ? "Activate"
                  : "Suspend"}
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
              >
                Delete Member
              </button>

            </div>

          </div>

        </div>

      </div>

      <EditMemberModal
        open={editOpen}
        member={member}
        refresh={refresh}
        onClose={() => setEditOpen(false)}
      />

    </>
  );

}

function Info({ label, value }) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-slate-800 break-words">
        {value || "-"}
      </p>

    </div>

  );

}