import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";

import EventForm from "./EventForm";
import EventTable from "./EventTable";

import {
  subscribeToEvents,
  deleteEvent,
} from "../../../services/eventService";

export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

 useEffect(() => {
  console.log("EventsDashboard mounted");

  const unsubscribe = subscribeToEvents((data) => {
    console.log("Firestore returned:", data);
    setEvents(data);
  });

  return () => unsubscribe();
}, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const title = event.title || "";
      const venue = event.venue || "";

      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        venue.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [events, search]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete event.");
    }
  }

  return (
    <div
  className="space-y-6"
  style={{
    position: "relative",
    zIndex: 9999,
    overflow: "visible",
  }}
>

    <div className="bg-white rounded-xl shadow p-6">

  <h1 className="text-3xl font-bold flex items-center gap-3">
    <FaCalendarAlt className="text-blue-600" />
    Events Management
  </h1>

  <p className="text-gray-500 mt-2 mb-6">
    Create, edit and manage UNSATA events.
  </p>

  <button
    type="button"
    onClick={() => {
      setEditingEvent(null);
      setShowForm(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
  >
    <FaPlus />
    Add Event
  </button>

</div>



      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Events</h3>

          <p className="text-4xl font-bold mt-2">
            {events.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Upcoming</h3>

          <p className="text-4xl font-bold mt-2">
            {
              events.filter(
                (e) => e.status === "Upcoming"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Completed</h3>

          <p className="text-4xl font-bold mt-2">
            {
              events.filter(
                (e) => e.status === "Completed"
              ).length
            }
          </p>
        </div>

      </div>

      {/* Search */}
      
      <div className="bg-white rounded-xl shadow p-6">

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

      {/* Table */}

      <EventTable
        events={filteredEvents}
        onEdit={(event) => {
          setEditingEvent(event);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

    {showForm && (
 <EventForm
  event={editingEvent}
  onClose={() => {
    setShowForm(false);
    setEditingEvent(null);
  }}
/>
)}

    </div>
  );
}