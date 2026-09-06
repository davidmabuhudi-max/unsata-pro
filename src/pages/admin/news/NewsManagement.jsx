import { useState } from "react";
import { FaPlus, FaNewspaper, FaSearch } from "react-icons/fa";

import useNews from "./useNews";
import NewsForm from "./NewsForm";
import NewsTable from "./NewsTable";

export default function NewsManagement() {

  const {
    news,
    loading,
    addNews,
    editNews,
    removeNews,
  } = useNews();

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedNews, setSelectedNews] = useState(null);

  const filteredNews = news.filter((item) => {

    const title = item.title || "";

    const category = item.category || "";

    return (

      title.toLowerCase().includes(search.toLowerCase()) ||

      category.toLowerCase().includes(search.toLowerCase())

    );

  });

  async function handleSave(formData) {

    if (selectedNews) {

      await editNews(selectedNews.id, formData);

    } else {

      await addNews(formData);

    }

    setShowForm(false);

    setSelectedNews(null);

  }

  function handleEdit(item) {

    setSelectedNews(item);

    setShowForm(true);

  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this article?"

    );

    if (!confirmDelete) return;

    await removeNews(id);

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

              <FaNewspaper className="text-3xl" />

            </div>

            <div>

              <h1 className="text-3xl font-black text-[#082B69]">

                News Management

              </h1>

              <p className="mt-2 text-slate-500">

                Manage all website news articles.

              </p>

            </div>

          </div>

          <button

            onClick={() => {

              setSelectedNews(null);

              setShowForm(true);

            }}

            className="flex items-center gap-3 rounded-xl bg-[#082B69] px-6 py-4 font-semibold text-white hover:bg-[#061d4a]"

          >

            <FaPlus />

            Add News

          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="relative">

          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

          <input

            type="text"

            placeholder="Search news..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="w-full rounded-xl border py-4 pl-14 pr-4 outline-none focus:border-[#082B69]"

          />

        </div>

      </div>

      {/* Table */}

      <NewsTable

        news={filteredNews}

        loading={loading}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {/* Modal */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

          <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl">

            <NewsForm

              initialData={selectedNews}

              onSubmit={handleSave}

              onCancel={() => {

                setShowForm(false);

                setSelectedNews(null);

              }}

            />

          </div>

        </div>

      )}

    </div>

  );

}