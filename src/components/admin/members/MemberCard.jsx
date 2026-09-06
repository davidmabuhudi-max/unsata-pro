import QRCode from "react-qr-code";

export default function MemberCard({ member }) {
const verifyUrl = `${window.location.origin}/verify/${
  member.membershipNumber || member.memberId
}`;

<img
  src="/logo.png"
  alt="UNSATA Logo"
  className="w-16 h-16 object-contain"
/>
  return (
    <div
      className="w-[520px] overflow-hidden rounded-3xl shadow-2xl"
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#ffffff",
        border: "1px solid #d1d5db",
      }}
    >
      {/* Header */}

      <div
        className="p-6"
        style={{
          background:
            "linear-gradient(90deg,#0B3D91 0%, #1357C8 50%, #0B3D91 100%)",
          color: "#ffffff",
        }}
      >
        <div className="flex justify-between items-center">

          <div>

            <h1
              className="text-3xl font-bold tracking-wide"
              style={{ color: "#ffffff" }}
            >
              UNSATA
            </h1>

            <p
              className="text-sm mt-1"
              style={{ color: "#e5e7eb" }}
            >
              University Nursing Students Association of Tanzania at Muhas
            </p>

            <p
              className="text-xs mt-2"
              style={{ color: "#dbeafe" }}
            >
              OFFICIAL DIGITAL MEMBERSHIP CARD
            </p>

          </div>

          <div
            className="rounded-full px-4 py-2 font-bold"
            style={{
              backgroundColor:
                member.status === "Active"
                  ? "#ffffff"
                  : "#FEE2E2",
              color:
                member.status === "Active"
                  ? "#0B3D91"
                  : "#B91C1C",
            }}
          >
            {member.status === "Active"
              ? "ACTIVE"
              : "SUSPENDED"}
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-7">

        <div className="flex gap-6">

          <img
            src={member.passportPhoto || "/avatar.png"}
            alt={member.fullName}
            crossOrigin="anonymous"
            className="w-36 h-36 rounded-2xl object-cover"
            style={{
              border: "4px solid #DBEAFE",
              backgroundColor: "#F8FAFC",
            }}
          />

          <div className="flex-1">

            <h2
              className="text-2xl font-bold"
              style={{ color: "#1E293B" }}
            >
              {member.fullName}
            </h2>

            <p
              className="mt-1"
              style={{ color: "#6B7280" }}
            >
              {member.memberId}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">

              <Info
                title="University"
                value={member.university}
              />

              <Info
                title="Programme"
                value={member.programme}
              />

              <Info
                title="Academic Year"
                value={member.year}
              />

              <Info
                title="Registration No."
                value={member.registrationNumber}
              />

              <Info
                title="Gender"
                value={member.gender}
              />

              <Info
                title="Member Status"
                value={member.status}
              />

            </div>

          </div>

        </div>

        {/* Divider */}

        <div
          className="my-7"
          style={{
            borderTop: "1px solid #E5E7EB",
          }}
        />

        {/* Bottom */}

        <div className="flex justify-between items-center">

          <div>

            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "#6B7280" }}
            >
              Scan To Verify Membership
            </p>

            <div
              className="mt-4 p-2 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #D1D5DB",
              }}
            >
              <QRCode
                value={verifyUrl}
                size={110}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

          </div>

          <div className="text-right">

            <p
              className="text-sm"
              style={{ color: "#6B7280" }}
            >
              Member ID
            </p>

            <h2
              className="text-xl font-bold"
              style={{ color: "#0B3D91" }}
            >
              {member.memberId}
            </h2>

            <p
              className="mt-5 text-sm"
              style={{ color: "#6B7280" }}
            >
              Joined
            </p>

            <p
              className="font-semibold"
              style={{ color: "#1E293B" }}
            >
              {member.joinedAt?.toDate?.().toLocaleDateString() ?? "-"}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 border border-green-300">
  <span className="text-green-700 text-lg">✔</span>

  <span className="font-bold text-green-700">
    VERIFIED MEMBER
  </span>
</div>

          </div>

        </div>

      </div>   
      
      <Info
  title="Issue Date"
  value={
    member.joinedAt?.toDate?.().toLocaleDateString() ?? "-"
  }
/>

<Info
  title="Expiry Date"
  value={
    member.expiryDate?.toDate?.().toLocaleDateString() ??
    "31 Dec 2027"
  }
/>   {/* Footer */}

      <div
        className="px-6 py-5"
        style={{
          backgroundColor: "#F8FAFC",
          borderTop: "1px solid #D1D5DB",
        }}
      >
        <div className="flex justify-between items-end">

          <div className="max-w-[65%]">

            <p
              className="text-[11px] uppercase tracking-widest"
              style={{ color: "#6B7280" }}
            >
              Important
            </p>

            <p
              className="text-xs leading-5 mt-2"
              style={{ color: "#374151" }}
            >
          This card remains the property of the
University Nursing Students Association
of Tanzania (UNSATA) - MUHAS Chapter.

Scan the QR code to verify the authenticity
of this membership card.
            </p>

            <p
              className="mt-4 text-[11px]"
              style={{ color: "#484f5d" }}
            >
              www.unsatamuhas.or.tz
            </p>

          </div>

          <div className="text-center">

            <div
              className="w-36 mb-2"
              style={{
                borderBottom: "1px solid #6B7280",
              }}
            />

            <p
              className="text-xs font-semibold"
              style={{ color: "#1E293B" }}
            >
              Secretary General
            </p>

            <p
              className="text-[11px]"
              style={{ color: "#6B7280" }}
            >
              University Nursing Students
              Association of Tanzania at Muhas
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>

      <p
        className="text-[11px] uppercase tracking-wider"
        style={{
          color: "#6B7280",
          fontWeight: 600,
        }}
      >
        {title}
      </p>

      <p
        className="mt-1"
        style={{
          color: "#1E293B",
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </p>

    </div>
  );
}
<img
  src="/signature.png"
  alt="Secretary General"
  className="h-12 object-contain"
/>