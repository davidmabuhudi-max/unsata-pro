import { useEffect, useMemo, useState } from "react";
import { subscribeToEvents } from "../../services/eventService";
import EventCard from "./EventCard";

export default function EventsGrid({
  search,
  category,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        event.title?.toLowerCase().includes(searchText) ||
        event.description?.toLowerCase().includes(searchText) ||
        event.venue?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" ||
        event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#1565C0] font-semibold">
            Upcoming Events
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            Explore Our Events
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-8">
            Participate in conferences, workshops, seminars,
            outreach programmes and professional development activities.
          </p>

        </div>

        {filteredEvents.length === 0 ? (

          <div className="text-center py-20">

            <h3 className="text-2xl font-semibold text-gray-600">
              No events found.
            </h3>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
}