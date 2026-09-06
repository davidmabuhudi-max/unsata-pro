import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import usePublicNews from "../../hooks/usePublicNews";

export default function NewsPreview() {
  const { news, loading } = usePublicNews();

  if (loading) return null;

  const publishedNews = news
    .filter((item) => item.status === "published")
    .slice(0, 3);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#1976D2] font-semibold">
            Latest News
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            News & Updates
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Stay updated with the latest announcements, leadership activities,
            academic events, research initiatives, and community outreach
            organized by the UNSATA MUHAS Chapter.
          </p>

        </div>

        {/* News Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {publishedNews.length === 0 ? (

            <div className="col-span-full text-center py-16">

              <h3 className="text-2xl font-bold text-[#0B3D91]">
                No News Available
              </h3>

              <p className="mt-4 text-gray-500">
                Published news will appear here.
              </p>

            </div>

          ) : (

            publishedNews.map((item) => (

              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg"
              >

                <img
                  src={item.image || ""}
                  alt={item.title || "News"}
                  className="h-60 w-full object-cover"
                />

                <div className="p-8">

                  {item.category && (
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm text-[#1565C0]">
                      {item.category}
                    </span>
                  )}

                  <h3 className="mt-5 break-words text-2xl font-bold text-[#0B3D91]">
                    {item.title}
                  </h3>

                  {item.createdAt && (
                    <p className="mt-3 text-gray-500">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleDateString()
                        : ""}
                    </p>
                  )}

                  <p className="mt-5 line-clamp-4 break-words whitespace-pre-wrap leading-7 text-gray-600">
                    {item.description}
                  </p>

                 <Link
    to={`/news/${item.id}`}
    className="mt-6 inline-block font-semibold text-[#1565C0] hover:underline"
>
    Read More →
</Link>

                </div>

              </motion.div>

            ))

          )}

        </div>

      </div>
    </section>
  );
}