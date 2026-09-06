import { useEffect, useMemo, useState } from "react";

import StatCard from "./StatCard";

import {
  FaUsers,
  FaUserPlus,
  FaShieldAlt,
  FaCalendarAlt,
  FaImages,
  FaNewspaper,
  FaUserSlash,
  FaUserCheck,
  FaGraduationCap,
} from "react-icons/fa";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

export default function DashboardHome() {

  const [members, setMembers] = useState([]);
  const [applications, setApplications] = useState([]);

  const [events, setEvents] = useState(0);
  const [gallery, setGallery] = useState(0);
  const [news, setNews] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribeMembers = onSnapshot(
      collection(db, "members"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMembers(data);

        setLoading(false);

      },
      console.error
    );

    const unsubscribeApplications = onSnapshot(
      collection(db, "applications"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(data);

      },
      console.error
    );

    const unsubscribeEvents = onSnapshot(
      collection(db, "events"),
      (snapshot) => {

        setEvents(snapshot.size);

      },
      () => setEvents(0)
    );

    const unsubscribeGallery = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {

        setGallery(snapshot.size);

      },
      () => setGallery(0)
    );

    const unsubscribeNews = onSnapshot(
      collection(db, "news"),
      (snapshot) => {

        setNews(snapshot.size);

      },
      () => setNews(0)
    );

    return () => {

      unsubscribeMembers();
      unsubscribeApplications();
      unsubscribeEvents();
      unsubscribeGallery();
      unsubscribeNews();

    };

  }, []);

  const stats = useMemo(() => {

    /*
      IMPORTANT

      Total Members only counts REAL MEMBERS.

      Deleted members are already removed from Firestore.

      Any record that is not Active or Suspended
      will NOT be counted.
    */

    const validMembers = members.filter(
      (member) =>
        member.status === "Active" ||
        member.status === "Suspended"
    );

    const activeMembers = validMembers.filter(
      (member) => member.status === "Active"
    );

    const suspendedMembers = validMembers.filter(
      (member) => member.status === "Suspended"
    );

    const pendingApplications = applications.filter(
      (application) =>
        application.status === "Pending"
    );

    const rejectedApplications = applications.filter(
      (application) =>
        application.status === "Rejected"
    );

  const academicYears = new Set(
  validMembers
    .map((member) => member.year)
    .filter(Boolean)
);
    const today = new Date();

    const todayMembers = validMembers.filter((member) => {

      if (!member.joinedAt?.toDate) return false;

      const joined = member.joinedAt.toDate();

      return (
        joined.getDate() === today.getDate() &&
        joined.getMonth() === today.getMonth() &&
        joined.getFullYear() === today.getFullYear()
      );

    });

    return {

      totalMembers: validMembers.length,

      activeMembers: activeMembers.length,

      suspendedMembers: suspendedMembers.length,

      pendingApplications:
        pendingApplications.length,

      rejectedApplications:
        rejectedApplications.length,

      academicYears: academicYears.size,

      todayMembers: todayMembers.length,

      events,

      gallery,

      news,

    };

  }, [
    members,
    applications,
    events,
    gallery,
    news,
  ]);

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="text-xl font-semibold text-slate-600">

          Loading Dashboard...

        </div>

      </div>

    );

  }

  return (     <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome to the UNSATA Membership Management Dashboard
          </p>

        </div>

        <div
          className="flex items-center gap-3 rounded-xl px-5 py-3 shadow-sm"
          style={{
            backgroundColor: "#ECFDF5",
          }}
        >

          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: "#16A34A",
            }}
          />

          <span className="font-semibold text-green-700">
            Live Database Connected
          </span>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<FaUsers />}
          color="#2563EB"
        />

        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          icon={<FaUserCheck />}
          color="#16A34A"
        />

        <StatCard
          title="Suspended Members"
          value={stats.suspendedMembers}
          icon={<FaUserSlash />}
          color="#DC2626"
        />

        <StatCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={<FaUserPlus />}
          color="#F59E0B"
        />

        <StatCard
          title="Rejected Applications"
          value={stats.rejectedApplications}
          icon={<FaShieldAlt />}
          color="#7C3AED"
        />

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Today's Registrations"
          value={stats.todayMembers}
          icon={<FaUserPlus />}
          color="#0891B2"
        />

        <StatCard
  title="Academic Years"
  value={stats.academicYears}
  icon={<FaGraduationCap />}
  color="#2563EB"
/>

        <StatCard
          title="Events"
          value={stats.events}
          icon={<FaCalendarAlt />}
          color="#EA580C"
        />

        <StatCard
          title="Gallery"
          value={stats.gallery}
          icon={<FaImages />}
          color="#DB2777"
        />

        <StatCard
          title="News"
          value={stats.news}
          icon={<FaNewspaper />}
          color="#0F766E"
        />

      </div>

      {/* Tables */}

      <div className="grid xl:grid-cols-2 gap-8">        {/* Recent Members */}

        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Members
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Member
                  </th>
<th>
Academic Year
</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {members
                  .filter(
                    (member) =>
                      member.status === "Active" ||
                      member.status === "Suspended"
                  )
                  .sort((a, b) => {

                    const dateA = a.joinedAt?.toDate
                      ? a.joinedAt.toDate()
                      : new Date(0);

                    const dateB = b.joinedAt?.toDate
                      ? b.joinedAt.toDate()
                      : new Date(0);

                    return dateB - dateA;

                  })
                  .slice(0, 5)
                  .map((member) => (

                    <tr
                      key={member.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-semibold text-slate-800">
                            {member.fullName}
                          </p>

                          <p className="text-sm text-slate-500">
                            {member.registrationNumber}
                          </p>

                        </div>

                      </td>

                     <td className="px-6 py-4 text-slate-600">
  {member.year}
</td>
                      <td className="px-6 py-4">

                        <span
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{
                            backgroundColor:
                              member.status === "Active"
                                ? "#DCFCE7"
                                : "#FEE2E2",

                            color:
                              member.status === "Active"
                                ? "#15803D"
                                : "#B91C1C",
                          }}
                        >
                          {member.status}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Applications */}

        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Applications
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Applicant
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    University
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {applications
                  .sort((a, b) => {

                    const dateA = a.createdAt?.toDate
                      ? a.createdAt.toDate()
                      : new Date(0);

                    const dateB = b.createdAt?.toDate
                      ? b.createdAt.toDate()
                      : new Date(0);

                    return dateB - dateA;

                  })
                  .slice(0, 5)
                  .map((application) => (

                    <tr
                      key={application.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-semibold text-slate-800">
                            {application.fullName}
                          </p>

                          <p className="text-sm text-slate-500">
                            {application.registrationNumber}
                          </p>

                        </div>

                      </td>

                     <td className="px-6 py-4 text-slate-600">
  {application.year}
</td>
                      <td className="px-6 py-4">

                        <span
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{
                            backgroundColor:
                              application.status === "Approved"
                                ? "#DCFCE7"
                                : application.status === "Rejected"
                                ? "#FEE2E2"
                                : "#FEF3C7",

                            color:
                              application.status === "Approved"
                                ? "#15803D"
                                : application.status === "Rejected"
                                ? "#B91C1C"
                                : "#B45309",
                          }}
                        >
                          {application.status}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">        {/* Membership Overview */}

        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Membership Overview
          </h2>

          <div className="space-y-5">

            <ProgressRow
              title="Active Members"
              value={stats.activeMembers}
              total={stats.totalMembers}
              color="#16A34A"
            />

            <ProgressRow
              title="Suspended Members"
              value={stats.suspendedMembers}
              total={stats.totalMembers}
              color="#DC2626"
            />

            <ProgressRow
              title="Pending Applications"
              value={stats.pendingApplications}
              total={
                stats.pendingApplications +
                stats.rejectedApplications +
                stats.totalMembers
              }
              color="#F59E0B"
            />

          </div>

        </div>

        {/* Quick Summary */}

        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Quick Summary
          </h2>

          <div className="space-y-4">

           <SummaryItem
  label="Academic Years"
  value={stats.academicYears}
/>
            <SummaryItem
              label="Universities"
              value={stats.universities}
            />

            <SummaryItem
              label="Events"
              value={stats.events}
            />

            <SummaryItem
              label="Gallery Images"
              value={stats.gallery}
            />

            <SummaryItem
              label="News Posts"
              value={stats.news}
            />

          </div>

        </div>

        {/* System Status */}

        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            System Status
          </h2>

          <div className="space-y-4">

            <StatusRow
              title="Firestore"
              status="Online"
              color="#16A34A"
            />

            <StatusRow
              title="Membership"
              status="Running"
              color="#2563EB"
            />

            <StatusRow
              title="Applications"
              status="Monitoring"
              color="#F59E0B"
            />

            <StatusRow
              title="Dashboard"
              status="Live"
              color="#9333EA"
            />

          </div>

        </div>

      </div>

    </div>

  );

}

/* ===========================
   Progress Row
=========================== */

function ProgressRow({
  title,
  value,
  total,
  color,
}) {

  const percent =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (

    <div>

      <div className="flex justify-between mb-2">

        <span className="font-medium text-slate-700">
          {title}
        </span>

        <span className="font-bold">
          {value}
        </span>

      </div>

      <div
        className="w-full h-3 rounded-full overflow-hidden bg-slate-200"
      >

        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />

      </div>

      <p className="text-xs text-slate-500 mt-1">
        {percent}% of total
      </p>

    </div>

  );

}

/* ===========================
   Summary Item
=========================== */

function SummaryItem({
  label,
  value,
}) {

  return (

    <div className="flex justify-between items-center py-2 border-b border-slate-100">

      <span className="text-slate-600">
        {label}
      </span>

      <span className="font-bold text-slate-800">
        {value}
      </span>

    </div>

  );

}

/* ===========================
   Status Row
=========================== */

function StatusRow({
  title,
  status,
  color,
}) {

  return (

    <div className="flex justify-between items-center">

      <span className="text-slate-600">
        {title}
      </span>

      <span
        className="px-3 py-1 rounded-full text-sm font-semibold"
        style={{
          backgroundColor: `${color}20`,
          color,
        }}
      >
        ● {status}
      </span>

    </div>

  );

}