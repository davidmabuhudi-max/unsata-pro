import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import usePublicNews from "../hooks/usePublicNews";

export default function NewsDetails() {

  const { id } = useParams();

  const { news, loading } = usePublicNews();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  const article = news.find(item => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h1 className="text-4xl font-black text-[#0B3D91]">

          Article Not Found

        </h1>

        <Link
          to="/news"
          className="mt-8 rounded-xl bg-[#082B69] px-8 py-4 text-white"
        >
          Back to News
        </Link>

      </div>
    );
  }

  return (

    <section className="py-20 bg-slate-50">

      <div className="max-w-5xl mx-auto px-6">

        <motion.img

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          src={article.image}

          alt={article.title}

          className="w-full h-[500px] rounded-3xl object-cover"

        />

        <div className="mt-10">

          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-[#1565C0]">

            {article.category}

          </span>

          <h1 className="mt-6 text-5xl font-black text-[#082B69]">

            {article.title}

          </h1>

          <div className="mt-5 flex flex-wrap gap-6 text-slate-500">

            <span>

              Author:
              <strong className="ml-2">

                {article.author || "UNSATA"}

              </strong>

            </span>

            <span>

              {article.createdAt?.toDate
                ? article.createdAt.toDate().toLocaleDateString()
                : ""}

            </span>

          </div>

          <div className="mt-12 leading-9 text-lg text-slate-700 whitespace-pre-wrap break-words">

            {article.description}

          </div>

          <div className="mt-16">

            <Link

              to="/news"

              className="rounded-xl bg-[#082B69] px-8 py-4 text-white"

            >

              ← Back to News

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}