import { useEffect, useMemo, useState } from "react";

import EventCard from "./EventCard";

import { subscribeToEvents } from "../../services/eventService";

export default function EventsGrid({
  search,
  category,
}) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
  console.log("Events:", events);
}, [events]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents(setEvents);

    return unsubscribe;
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        event.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  if (!filteredEvents.length) {
    return (
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow p-16 text-center">

            <h2 className="text-3xl font-bold text-slate-700">

              No Events Found

            </h2>

            <p className="text-slate-500 mt-4">

              Try another search or category.

            </p>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="pb-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}

        </div>

      </div>

    </section>
  );
}