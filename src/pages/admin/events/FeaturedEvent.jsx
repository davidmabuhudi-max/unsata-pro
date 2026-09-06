import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import { subscribeToEvents } from "../../services/eventService";

export default function FeaturedEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents(setEvents);
    return unsubscribe;
  }, []);

  const featuredEvent = useMemo(() => {
    return events.find(
      (event) => event.status === "Upcoming"
    );
  }, [events]);

  if (!featuredEvent) return null;

  function daysRemaining(date) {
    const today = new Date();
    const eventDate = new Date(date);

    const diff = eventDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <img
              src={featuredEvent.banner}
              alt={featuredEvent.title}
              className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
            />

          </div>

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

              Next Upcoming Event

            </span>

            <h2 className="text-4xl font-bold mt-6">

              {featuredEvent.title}

            </h2>

            <p className="text-slate-600 mt-6 leading-8">

              {featuredEvent.description}

            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <FaCalendarAlt className="text-blue-600" />

                {featuredEvent.eventDate}

              </div>

              <div className="flex items-center gap-3">

                <FaClock className="text-green-600" />

                {featuredEvent.eventTime}

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-red-500" />

                {featuredEvent.venue}

              </div>

            </div>

            <div className="mt-10 p-6 bg-blue-50 rounded-2xl">

              <h3 className="text-lg font-bold text-blue-700">

                {daysRemaining(featuredEvent.eventDate)} Days Remaining

              </h3>

            </div>

            <div className="flex gap-4 mt-8">

              <Link
                to={`/events/${featuredEvent.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                Read More

                <FaArrowRight />
              </Link>

              {featuredEvent.registrationLink && (
                <a
                  href={featuredEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl"
                >
                  Register Now
                </a>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}