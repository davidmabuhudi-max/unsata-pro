import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

import { cleanupRejectedApplications } from "../services/cleanupService";

export default function AdminDashboard() {
  useEffect(() => {
    cleanupRejectedApplications().catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-auto p-6 min-w-0">

          <Outlet />

        </main>

      </div>

    </div>
  );
}