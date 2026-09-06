import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToEvents } from "../../services/eventService";

export default function FeaturedEvent() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      if (data.length > 0) {
        // The first event is the nearest upcoming event because
        // subscribeToEvents already orders by eventDate.
        setFeatured(data[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!featured) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="bg-slate-100 rounded-3xl p-4 flex justify-center items-center">
            <img
              src={featured.banner}
              alt={featured.title}
              className="w-full max-h-[600px] object-contain rounded-2xl"
            />
          </div>

          <div>

            <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Featured Event
            </span>

            <h2 className="mt-6 text-5xl font-black text-[#0B3D91]">
              {featured.title}
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              {featured.description}
            </p>

            <div className="mt-8 space-y-3 text-lg">

              <p>
                <strong>Date:</strong> {featured.eventDate}
              </p>

              <p>
                <strong>Time:</strong> {featured.eventTime}
              </p>

              <p>
                <strong>Venue:</strong> {featured.venue}
              </p>

              <p>
                <strong>Category:</strong> {featured.category}
              </p>

            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              {featured.registrationLink && (
                <a
                  href={featured.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0B3D91] text-white px-8 py-4 rounded-xl hover:bg-[#1565C0] transition"
                >
                  Register Now
                </a>
              )}

              <Link
                to={`/events/${featured.id}`}
                className="border-2 border-[#0B3D91] text-[#0B3D91] px-8 py-4 rounded-xl hover:bg-[#0B3D91] hover:text-white transition"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}