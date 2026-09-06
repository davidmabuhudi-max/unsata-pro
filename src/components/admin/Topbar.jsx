import { useEffect, useState } from "react";

import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase/firebase";


export default function Topbar() {

  const navigate = useNavigate();


  /* ==========================================================
     CLOCK
  ========================================================== */

  const [time, setTime] = useState(new Date());


  /* ==========================================================
     NOTIFICATIONS
  ========================================================== */

  const [messages, setMessages] = useState([]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);


  /* ==========================================================
     LOGOUT
  ========================================================== */

  const [loggingOut, setLoggingOut] =
    useState(false);


  /* ==========================================================
     CLOCK
  ========================================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);


    return () => {
      clearInterval(timer);
    };

  }, []);


  /* ==========================================================
     LOAD MESSAGES FROM FIREBASE
  ========================================================== */

  useEffect(() => {

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(20)
    );


    const unsubscribe = onSnapshot(
      messagesQuery,

      (snapshot) => {

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));


        setMessages(data);

      },

      (error) => {

        console.error(
          "Failed to load messages:",
          error
        );

      }
    );


    return () => {
      unsubscribe();
    };

  }, []);


  /* ==========================================================
     DATE
  ========================================================== */

  const date = time.toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );


  /* ==========================================================
     TIME
  ========================================================== */

  const clock = time.toLocaleTimeString(
    "en-GB"
  );


  /* ==========================================================
     CURRENT FIREBASE USER
  ========================================================== */

  const currentUser = auth.currentUser;


  /* ==========================================================
     ADMIN NAME
  ========================================================== */

  const adminName =
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "Administrator";


  /* ==========================================================
     UNREAD MESSAGES
  ========================================================== */

  const unreadMessages = messages.filter(
    (message) =>
      message.status !== "read"
  );


  const unreadCount =
    unreadMessages.length;


  /* ==========================================================
     RECENT NOTIFICATIONS
  ========================================================== */

  const recentNotifications =
    unreadMessages.slice(0, 5);


  /* ==========================================================
     OPEN MESSAGES
  ========================================================== */

  function openMessages() {

    setNotificationOpen(false);

    navigate(
      "/admin/dashboard/messages"
    );

  }


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

      setLoggingOut(true);


      await signOut(auth);


      setNotificationOpen(false);


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


      setLoggingOut(false);

    }

  }


  return (

    <header
      className="
        relative
        z-40
        flex
        flex-col
        gap-4
        border-b
        border-slate-200
        bg-white
        px-6
        py-5
        shadow-md
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >


      {/* ======================================================
          LEFT SIDE
      ====================================================== */}

      <div>

        <h1 className="text-3xl font-bold text-[#0B3D91]">
          Dashboard
        </h1>


        <p className="mt-1 text-gray-500">
          Welcome back to the UNSATA Administration Panel
        </p>

      </div>


      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-end
          gap-3
        "
      >


        {/* ====================================================
            DATE
        ==================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-3
            lg:flex
          "
        >

          <FaCalendarAlt
            className="text-[#0B3D91]"
          />

          <span className="text-sm font-medium">
            {date}
          </span>

        </div>


        {/* ====================================================
            CLOCK
        ==================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-3
            lg:flex
          "
        >

          <FaClock
            className="text-[#0B3D91]"
          />

          <span className="font-semibold">
            {clock}
          </span>

        </div>


        {/* ====================================================
            NOTIFICATION
        ==================================================== */}

        <div className="relative">


          <button
            type="button"
            onClick={() =>
              setNotificationOpen(
                (previous) =>
                  !previous
              )
            }
            className="
              relative
              rounded-xl
              bg-slate-100
              p-3
              transition
              hover:bg-slate-200
            "
          >

            <FaBell
              size={20}
              className={
                unreadCount > 0
                  ? "text-[#0B3D91]"
                  : "text-slate-500"
              }
            />


            {/* RED UNREAD NUMBER */}

            {unreadCount > 0 && (

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-600
                  px-1
                  text-xs
                  font-bold
                  text-white
                "
              >

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

          </button>


          {/* ==================================================
              NOTIFICATION DROPDOWN
          ================================================== */}

          {notificationOpen && (

            <div
              className="
                absolute
                right-0
                top-14
                w-[360px]
                max-w-[calc(100vw-32px)]
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
              "
            >


              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  px-5
                  py-4
                "
              >

                <div>

                  <h3
                    className="
                      font-bold
                      text-[#082B69]
                    "
                  >
                    Notifications
                  </h3>


                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >

                    {unreadCount === 0
                      ? "No new messages"
                      : `${unreadCount} unread message${
                          unreadCount === 1
                            ? ""
                            : "s"
                        }`}

                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setNotificationOpen(
                      false
                    )
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                >

                  <FaTimes />

                </button>

              </div>


              {/* =================================================
                  NO NOTIFICATIONS
              ================================================= */}

              {recentNotifications.length === 0 ? (

                <div
                  className="
                    px-6
                    py-10
                    text-center
                  "
                >

                  <FaBell
                    className="
                      mx-auto
                      text-3xl
                      text-slate-200
                    "
                  />


                  <p
                    className="
                      mt-3
                      text-sm
                      text-slate-500
                    "
                  >
                    You're all caught up.
                  </p>

                </div>

              ) : (

                /* =================================================
                   NOTIFICATION LIST
                ================================================= */

                <div
                  className="
                    max-h-[350px]
                    overflow-y-auto
                  "
                >

                  {recentNotifications.map(
                    (message) => (

                      <button
                        key={message.id}
                        type="button"
                        onClick={() => {

                          setNotificationOpen(
                            false
                          );

                          navigate(
                            "/admin/dashboard/messages"
                          );

                        }}
                        className="
                          flex
                          w-full
                          gap-4
                          border-b
                          px-5
                          py-4
                          text-left
                          transition
                          hover:bg-blue-50
                        "
                      >


                        {/* MESSAGE ICON */}

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-100
                            text-[#082B69]
                          "
                        >

                          <FaEnvelope />

                        </div>


                        {/* MESSAGE INFORMATION */}

                        <div
                          className="
                            min-w-0
                          "
                        >

                          <p
                            className="
                              truncate
                              font-bold
                              text-[#082B69]
                            "
                          >

                            {message.name ||
                              "New visitor"}

                          </p>


                          <p
                            className="
                              mt-1
                              truncate
                              text-sm
                              font-semibold
                              text-slate-700
                            "
                          >

                            {message.subject ||
                              "New message"}

                          </p>


                          <p
                            className="
                              mt-1
                              line-clamp-2
                              text-xs
                              text-slate-500
                            "
                          >

                            {message.message ||
                              ""}

                          </p>

                        </div>

                      </button>

                    )
                  )}

                </div>

              )}


              {/* =================================================
                  VIEW ALL
              ================================================= */}

              <div
                className="
                  border-t
                  p-3
                "
              >

                <button
                  type="button"
                  onClick={openMessages}
                  className="
                    w-full
                    rounded-xl
                    bg-[#082B69]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#061d4a]
                  "
                >

                  View All Messages

                </button>

              </div>

            </div>

          )}

        </div>


        {/* ====================================================
            ADMIN PROFILE
        ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-2
          "
        >

          <FaUserCircle
            size={46}
            className="text-[#0B3D91]"
          />


          <div className="hidden sm:block">

            <h3 className="font-bold">
              {adminName}
            </h3>


            <p className="text-sm text-gray-500">
              UNSATA CMS
            </p>

          </div>

        </div>


        {/* ====================================================
            LOGOUT BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-100
            px-4
            py-3
            font-semibold
            text-red-600
            transition
            hover:bg-red-200
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <FaSignOutAlt />

          <span className="hidden md:inline">

            {loggingOut
              ? "Logging out..."
              : "Logout"}

          </span>

        </button>

      </div>

    </header>
  );
}