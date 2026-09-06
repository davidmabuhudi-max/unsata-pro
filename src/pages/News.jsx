import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import usePublicNews from "../hooks/usePublicNews";

export default function News() {

  const { news, loading } = usePublicNews();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading news...
      </div>
    );
  }

  const publishedNews = news.filter(
    item => item.status === "published"
  );

  return (
    <>

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#082B69] via-[#0B3D91] to-[#1976D2] py-28">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-white"
          >
            News & Updates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-blue-100"
          >
            Stay informed with the latest news, leadership activities,
            academic events, research initiatives, and community
            outreach from the UNSATA MUHAS Chapter.
          </motion.p>

        </div>

      </section>

      {/* News */}

      <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          {publishedNews.length === 0 ? (

            <div className="rounded-3xl bg-white p-20 text-center shadow-lg">

              <h2 className="text-4xl font-black text-[#082B69]">

                No News Available

              </h2>

              <p className="mt-5 text-slate-500">

                News articles published from the dashboard
                will appear here automatically.

              </p>

            </div>

          ) : (

            <div className="grid gap-10 lg:grid-cols-3">

              {publishedNews.map((item) => (

                <motion.div
                  key={item.id}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-8">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-[#1565C0]">

                      {item.category}

                    </span>

                    <h2 className="mt-6 text-2xl font-black text-[#082B69] break-words">

                      {item.title}

                    </h2>

                    <p className="mt-4 text-slate-500">

                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleDateString()
                        : ""}

                    </p>

                    <p className="mt-6 line-clamp-4 break-words whitespace-pre-wrap leading-8 text-slate-600">

                      {item.description}

                    </p>

                    <Link
                      to={`/news/${item.id}`}
                      className="mt-8 inline-block rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
                    >
                      Read Full Article →
                    </Link>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </section>

    </>
  );

}