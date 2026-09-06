import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NewsManagement from "./pages/admin/news/NewsManagement";
import EventRegistration from "./pages/EventRegistration";
import EventDetails from "./pages/EventDetails";
import HomepageManagement from "./pages/admin/homepage/HomepageManagement";
import MembershipApplication from "./pages/MembershipApplication";
import MembershipSuccess from "./pages/MembershipSuccess";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import DashboardHome from "./components/admin/DashboardHome";
import ContactManagement from "./pages/admin/contact/ContactManagement";
import Applications from "./pages/Applications";
import Members from "./pages/admin/Members";
import MessagesManagement from "./pages/admin/messages/MessagesManagement";
import LeadershipAdmin from "./pages/admin/leadership/Leadership";
import EventsDashboard from "./pages/admin/events/EventsDashboard";
import EventRegistrations from "./pages/admin/events/EventRegistrations";

import AboutManagement from "./pages/admin/about/AboutManagement";

import AdminRoute from "./routes/AdminRoute";

import TestUpload from "./pages/TestUpload";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}

      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="leadership" element={<Leadership />} />

        <Route path="events" element={<Events />} />

        <Route path="membership" element={<Membership />} />

        <Route path="gallery" element={<Gallery />} />
        <Route path="news" element={<News />} />

<Route
    path="news/:id"
    element={<NewsDetails />}
/>

        <Route path="contact" element={<Contact />} />

        

        <Route
          path="events/:id"
          element={<EventDetails />}
        />

        <Route
          path="events/register"
          element={<EventRegistration />}
        />

      </Route>

      {/* ================= MEMBERSHIP ================= */}

      <Route
        path="/membership/apply"
        element={<MembershipApplication />}
      />

      <Route
        path="/membership/success"
        element={<MembershipSuccess />}
      />

      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin"
        element={<AdminLogin />}
      />

      {/* ================= ADMIN DASHBOARD ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      >

        <Route
          index
          element={<DashboardHome />}
        />
         <Route
  path="homepage"
  element={<HomepageManagement />}
/>
        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="members"
          element={<Members />}
        />

        <Route
          path="about"
          element={<AboutManagement />}
        />
        <Route
  path="news"
  element={<NewsManagement />}
/><Route
  path="contact"
  element={<ContactManagement />}
/>
         <Route
  path="messages"
  element={<MessagesManagement />}
/>

        <Route
          path="leadership"
          element={<LeadershipAdmin />}
        />

        <Route
          path="events"
          element={<EventsDashboard />}
        />

        <Route
          path="events/:id/registrations"
          element={<EventRegistrations />}
        />

      </Route>

      {/* ================= TEST ================= */}

      <Route
        path="/test-upload"
        element={<TestUpload />}
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;