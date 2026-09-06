import { useMemo, useState } from "react";

import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaSearch,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaPhone,
} from "react-icons/fa";

import useMessages from "./useMessages";


export default function MessagesManagement() {

  const {
    messages,
    loading,
    markAsRead,
    markAsUnread,
    removeMessage,
  } = useMessages();


  const [search, setSearch] =
    useState("");

  const [selectedMessage, setSelectedMessage] =
    useState(null);


  /* ==========================================================
     FILTER MESSAGES
  ========================================================== */

  const filteredMessages = useMemo(() => {

    const searchValue =
      search.toLowerCase().trim();

    if (!searchValue) {
      return messages;
    }

    return messages.filter(
      (message) => {

        const name =
          message.name || "";

        const email =
          message.email || "";

        const subject =
          message.subject || "";

        const messageText =
          message.message || "";

        return (
          name
            .toLowerCase()
            .includes(searchValue) ||

          email
            .toLowerCase()
            .includes(searchValue) ||

          subject
            .toLowerCase()
            .includes(searchValue) ||

          messageText
            .toLowerCase()
            .includes(searchValue)
        );
      }
    );

  }, [messages, search]);


  /* ==========================================================
     OPEN MESSAGE
  ========================================================== */

  async function openMessage(message) {

    setSelectedMessage(message);

    if (message.status !== "read") {
      await markAsRead(message.id);

      setSelectedMessage({
        ...message,
        status: "read",
      });
    }
  }


  /* ==========================================================
     DELETE
  ========================================================== */

  async function handleDelete(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this message?"
      );

    if (!confirmed) {
      return;
    }

    await removeMessage(id);

    if (
      selectedMessage &&
      selectedMessage.id === id
    ) {
      setSelectedMessage(null);
    }
  }


  /* ==========================================================
     FORMAT DATE
  ========================================================== */

  function formatDate(timestamp) {

    if (!timestamp) {
      return "No date";
    }

    try {

      const date =
        timestamp.toDate
          ? timestamp.toDate()
          : new Date(timestamp);

      return date.toLocaleString();

    } catch {
      return "Unknown date";
    }
  }


  const unreadCount =
    messages.filter(
      (message) =>
        message.status !== "read"
    ).length;


  return (
    <div className="space-y-8">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

              <FaEnvelope className="text-3xl" />

            </div>

            <div>

              <h1 className="text-3xl font-black text-[#082B69]">
                Messages
              </h1>

              <p className="mt-2 text-slate-500">
                View and manage messages submitted by website visitors.
              </p>

            </div>

          </div>


          {/* Unread count */}

          <div className="rounded-2xl bg-blue-50 px-6 py-4">

            <p className="text-sm text-slate-500">
              Unread Messages
            </p>

            <p className="mt-1 text-3xl font-black text-[#082B69]">
              {unreadCount}
            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="relative">

          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name, email, subject or message..."
            className="w-full rounded-xl border py-4 pl-14 pr-4 outline-none focus:border-[#082B69]"
          />

        </div>

      </div>


      {/* ======================================================
          MESSAGES
      ====================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

              <p className="mt-4 text-slate-500">
                Loading messages...
              </p>

            </div>

          </div>

        ) : filteredMessages.length === 0 ? (

          <div className="p-16 text-center">

            <FaEnvelope className="mx-auto text-5xl text-slate-200" />

            <h2 className="mt-5 text-2xl font-bold text-[#082B69]">
              No messages found
            </h2>

            <p className="mt-2 text-slate-500">
              Messages submitted through the public contact form will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y">

            {filteredMessages.map(
              (message) => {

                const unread =
                  message.status !== "read";

                return (

                  <div
                    key={message.id}
                    className={`p-6 transition hover:bg-slate-50 ${
                      unread
                        ? "bg-blue-50/40"
                        : ""
                    }`}
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


                      {/* LEFT */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start gap-4">

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                              unread
                                ? "bg-blue-100 text-[#082B69]"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >

                            {unread ? (
                              <FaEnvelope />
                            ) : (
                              <FaEnvelopeOpen />
                            )}

                          </div>


                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-3">

                              <h3 className="break-words font-bold text-[#082B69]">
                                {message.name ||
                                  "Unknown sender"}
                              </h3>


                              {unread && (

                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#082B69]">
                                  NEW
                                </span>

                              )}

                            </div>


                            <p className="mt-1 break-all text-sm text-slate-500">
                              {message.email}
                            </p>


                            <h4 className="mt-3 break-words text-lg font-semibold text-slate-800">
                              {message.subject ||
                                "No subject"}
                            </h4>


                            <p className="mt-2 line-clamp-2 break-words text-slate-500">
                              {message.message}
                            </p>


                            <p className="mt-3 text-xs text-slate-400">
                              {formatDate(
                                message.createdAt
                              )}
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            openMessage(message)
                          }
                          className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-3 font-semibold text-[#082B69] hover:bg-blue-200"
                        >

                          <FaEye />

                          View

                        </button>


                        {unread ? (

                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(
                                message.id
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-3 font-semibold text-green-700 hover:bg-green-200"
                          >

                            <FaCheck />

                            Read

                          </button>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              markAsUnread(
                                message.id
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-yellow-100 px-4 py-3 font-semibold text-yellow-700 hover:bg-yellow-200"
                          >

                            <FaEnvelope />

                            Unread

                          </button>

                        )}


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              message.id
                            )
                          }
                          className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-3 font-semibold text-red-600 hover:bg-red-200"
                        >

                          <FaTrash />

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>


      {/* ======================================================
          MESSAGE DETAILS MODAL
      ====================================================== */}

      {selectedMessage && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b p-8">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Message
                </p>

                <h2 className="mt-2 break-words text-3xl font-black text-[#082B69]">
                  {selectedMessage.subject ||
                    "No subject"}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >

                <FaTimes />

              </button>

            </div>


            {/* Modal Content */}

            <div className="space-y-6 p-8">


              {/* Sender */}

              <div className="rounded-2xl bg-slate-50 p-6">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sender
                </p>

                <h3 className="mt-2 break-words text-xl font-bold text-[#082B69]">
                  {selectedMessage.name ||
                    "Unknown sender"}
                </h3>

                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="mt-1 block break-all text-[#1565C0] hover:underline"
                >
                  {selectedMessage.email}
                </a>


                {selectedMessage.phone && (

                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="mt-2 flex items-center gap-2 text-slate-600 hover:text-[#1565C0]"
                  >

                    <FaPhone />

                    {selectedMessage.phone}

                  </a>

                )}

              </div>


              {/* Date */}

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Received
                </p>

                <p className="mt-2 text-slate-600">
                  {formatDate(
                    selectedMessage.createdAt
                  )}
                </p>

              </div>


              {/* Message */}

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Message
                </p>

                <div className="mt-3 whitespace-pre-wrap break-words rounded-2xl bg-slate-50 p-6 leading-8 text-slate-700">
                  {selectedMessage.message}
                </div>

              </div>


              {/* Footer */}

              <div className="flex flex-wrap justify-end gap-3 border-t pt-6">

                {selectedMessage.email && (

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || ""
                    )}`}
                    className="flex items-center gap-2 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
                  >

                    <FaEnvelope />

                    Reply by Email

                  </a>

                )}


                <button
                  type="button"
                  onClick={() =>
                    setSelectedMessage(null)
                  }
                  className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-50"
                >

                  Close

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}