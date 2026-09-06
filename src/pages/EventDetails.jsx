import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold">
          Loading event...
        </h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-5xl font-black">
          Event Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-100">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

       <div className="w-full bg-slate-100 flex justify-center items-center p-4">
  <img
    src={event.banner}
    alt={event.title}
    className="max-w-full max-h-[700px] object-contain rounded-lg"
  />
</div>

        <div className="p-10">

          <span className="bg-[#0B3D91] text-white px-4 py-2 rounded-full">
            {event.category}
          </span>

          <h1 className="mt-6 text-5xl font-black text-[#0B3D91]">
            {event.title}
          </h1>

          <p className="mt-8 text-gray-600 leading-9">
            {event.description}
          </p>

          <div className="mt-10 space-y-4">
            <p><strong>Date:</strong> {event.eventDate}</p>

            <p><strong>Time:</strong> {event.eventTime}</p>

            <p><strong>Venue:</strong> {event.venue}</p>

            <p><strong>Status:</strong> {event.status}</p>
          </div>

         {event.registrationRequired ? (
  event.registrationType === "external" ? (
    <a
      href={event.registrationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-10 bg-[#0B3D91] text-white px-8 py-4 rounded-xl"
    >
      Register Now
    </a>
  ) : (
    <Link
      to={`/events/register?id=${event.id}`}
      className="inline-block mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
    >
      Register Now
    </Link>
  )
) : (
  <Link
    to="/events"
    className="inline-block mt-10 bg-[#0B3D91] text-white px-8 py-4 rounded-xl"
  >
    Back to Events
  </Link>
)}
        </div>

      </div>

    </section>
  );
}