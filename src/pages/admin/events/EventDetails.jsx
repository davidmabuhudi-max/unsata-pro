import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  getEventById,
  subscribeToEvents,
} from "../services/eventService";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      const data = await getEventById(id);

      console.log("Event loaded:", data);

setEvent(data);
      setLoading(false);
    }

    loadEvent();

    const unsubscribe = subscribeToEvents(setEvents);

    return unsubscribe;
  }, [id]);

  const relatedEvents = useMemo(() => {
    return events
      .filter(
        (e) =>
          e.id !== id &&
          e.category === event?.category
      )
      .slice(0, 3);
  }, [events, event, id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-xl">
        Loading Event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-4xl font-bold">
          Event Not Found
        </h2>

        <Link
          to="/events"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  function countdown() {
    const now = new Date();
    const target = new Date(
      `${event.eventDate} ${event.eventTime}`
    );

    const diff = target - now;

    if (diff <= 0)
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      };

    return {
      days: Math.floor(
        diff / (1000 * 60 * 60 * 24)
      ),
      hours: Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (diff / (1000 * 60)) % 60
      ),
    };
  }

  const timer = countdown();

  return (
    <section className="bg-slate-50 min-h-screen">

      <img
        src={event.banner}
        alt={event.title}
        className="w-full h-[500px] object-cover"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold"
        >
          <FaArrowLeft />

          Back to Events
        </Link>

        <div className="grid lg:grid-cols-3 gap-12 mt-8">

          {/* Main Content */}

          <div className="lg:col-span-2">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

              {event.category}

            </span>

            <h1 className="text-5xl font-bold mt-6">

              {event.title}

            </h1>

            <div className="mt-8 space-y-4 text-lg">

              <div className="flex items-center gap-3">

                <FaCalendarAlt />

                {event.eventDate}

              </div>

              <div className="flex items-center gap-3">

                <FaClock />

                {event.eventTime}

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt />

                {event.venue}

              </div>

            </div>

            <hr className="my-10" />

            <h2 className="text-3xl font-bold">

              About this Event

            </h2>

            <p className="mt-6 leading-8 text-slate-600 whitespace-pre-line">

              {event.description}

            </p>

          </div>

          {/* Sidebar */}

          <aside className="space-y-8">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h3 className="text-2xl font-bold">

                Countdown

              </h3>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <TimeCard
                  value={timer.days}
                  label="Days"
                />

                <TimeCard
                  value={timer.hours}
                  label="Hours"
                />

                <TimeCard
                  value={timer.minutes}
                  label="Minutes"
                />

              </div>

            </div>

           {event.registrationRequired && (
  <>
    {event.registrationType === "external" ? (
      <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-semibold"
      >
        Register Now
        <FaExternalLinkAlt className="inline ml-2" />
      </a>
    ) : (
      <Link
        to={`/events/register?id=${event.id}`}
        className="block bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-semibold"
      >
        Register Now
      </Link>
    )}
  </>
)}

          </aside>

        </div>

        {/* Related Events */}

        {relatedEvents.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mt-20 mb-8">

              Related Events

            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {relatedEvents.map((item) => (

                <Link
                  key={item.id}
                  to={`/events/${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <img
                    src={item.banner}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-6">

                    <h3 className="font-bold text-xl">

                      {item.title}

                    </h3>

                    <p className="text-slate-500 mt-3">

                      {item.eventDate}

                    </p>

                  </div>

                </Link>

              ))}

            </div>
          </>
        )}

      </div>

    </section>
  );
}

function TimeCard({ value, label }) {
  return (
    <div className="bg-blue-50 rounded-xl p-5 text-center">
      <h2 className="text-3xl font-bold text-blue-700">
        {value}
      </h2>

      <p className="text-slate-600 mt-2">
        {label}
      </p>
    </div>
  );
}