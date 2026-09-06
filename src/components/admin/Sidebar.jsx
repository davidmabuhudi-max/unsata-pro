import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaImages,
  FaNewspaper,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase";


export default function Sidebar() {

  const navigate = useNavigate();


  /* ==========================================================
     MENU
  ========================================================== */

  const menu = [

    {
      title: "About",
      icon: <FaInfoCircle />,
      path: "/admin/dashboard/about",
    },

    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },

    {
      title: "Homepage",
      icon: <FaHome />,
      path: "/admin/dashboard/homepage",
    },

    {
      title: "Applications",
      icon: <FaClipboardList />,
      path: "/admin/dashboard/applications",
    },

    {
      title: "Members",
      icon: <FaUsers />,
      path: "/admin/dashboard/members",
    },

    {
      title: "Leadership",
      icon: <FaUserTie />,
      path: "/admin/dashboard/leadership",
    },

    {
      title: "Events",
      icon: <FaCalendarAlt />,
      path: "/admin/dashboard/events",
    },

    {
      title: "Gallery",
      icon: <FaImages />,
      path: "/admin/dashboard/gallery",
    },

    {
      title: "News",
      icon: <FaNewspaper />,
      path: "/admin/dashboard/news",
    },

    {
      title: "Contact",
      icon: <FaEnvelope />,
      path: "/admin/dashboard/contact",
    },

    {
      title: "Messages",
      icon: <FaEnvelope />,
      path: "/admin/dashboard/messages",
    },

    {
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/dashboard/settings",
    },

  ];


  /* ==========================================================
     LOGOUT
  ========================================================== */

  async function handleLogout() {

    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );


    if (!confirmed) {
      return;
    }


    try {

      await signOut(auth);


      navigate("/admin", {
        replace: true,
      });


    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );


      alert(
        "Logout failed. Please try again."
      );

    }

  }


  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-gradient-to-b
        from-[#0B3D91]
        to-[#082B67]
        text-white
        flex
        flex-col
        shadow-2xl
      "
    >


      {/* ======================================================
          LOGO / HEADER
      ====================================================== */}

      <div
        className="
          border-b
          border-blue-600
          p-8
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-white
            text-3xl
            font-black
            text-[#0B3D91]
          "
        >
          U
        </div>


        <h1
          className="
            mt-5
            text-3xl
            font-extrabold
          "
        >
          UNSATA CMS
        </h1>


        <p className="mt-2 text-blue-200">
          Administration Panel
        </p>

      </div>


      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          py-6
        "
      >

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={
              item.path ===
              "/admin/dashboard"
            }
            className={({ isActive }) =>
              `
                group
                flex
                items-center
                justify-between
                px-7
                py-4
                transition
                ${
                  isActive
                    ? `
                      bg-white
                      text-[#0B3D91]
                      border-r-4
                      border-yellow-400
                      shadow-lg
                    `
                    : `
                      hover:bg-blue-700
                    `
                }
              `
            }
          >

            {({ isActive }) => (

              <>

                {/* ICON + TITLE */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className={
                      isActive
                        ? "text-[#0B3D91] text-xl"
                        : "text-blue-200 text-xl"
                    }
                  >
                    {item.icon}
                  </span>


                  <span className="font-semibold">
                    {item.title}
                  </span>

                </div>


                {/* ARROW */}

                <FaChevronRight
                  className={
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                />

              </>

            )}

          </NavLink>

        ))}

      </div>


      {/* ======================================================
          USER + LOGOUT
      ====================================================== */}

      <div
        className="
          border-t
          border-blue-700
          p-6
        "
      >


        {/* LOGGED IN USER */}

        <div
          className="
            mb-5
            rounded-xl
            bg-blue-800
            p-4
          "
        >

          <p
            className="
              text-xs
              text-blue-200
            "
          >
            Logged in as
          </p>


          <h3 className="mt-1 font-bold">
            Administrator
          </h3>

        </div>


        {/* ==================================================
            LOGOUT BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-red-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
            active:scale-[0.98]
          "
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>

  );

}