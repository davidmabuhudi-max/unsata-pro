import {
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

export default function NewsTable({

  news,

  loading,

  onEdit,

  onDelete,

}) {

  if (loading) {

    return (

      <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

        Loading news...

      </div>

    );

  }

  if (news.length === 0) {

    return (

      <div className="rounded-3xl bg-white p-12 text-center shadow-lg text-slate-500">

        No news articles found.

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">Image</th>

              <th className="px-6 py-4 text-left">Title</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Featured</th>

              <th className="px-6 py-4 text-left">Author</th>

              <th className="px-6 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {news.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <img

                    src={item.image}

                    alt={item.title}

                    className="h-16 w-24 rounded-lg object-cover"

                  />

                </td>

                <td className="px-6 py-4">

                  <div className="font-bold text-[#082B69] break-words">

                    {item.title}

                  </div>

                </td>

                <td className="px-6 py-4">

                  {item.category}

                </td>

                <td className="px-6 py-4">

                  <span
                    className={`
                      rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        item.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >

                    {item.status}

                  </span>

                </td>

                <td className="px-6 py-4">

                  {item.featured ? (

                    <FaStar className="text-yellow-500" />

                  ) : (

                    "-"

                  )}

                </td>

                <td className="px-6 py-4">

                  {item.author}

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button

                      onClick={() => onEdit(item)}

                      className="rounded-lg bg-blue-100 p-3 text-blue-700 hover:bg-blue-200"

                    >

                      <FaEdit />

                    </button>

                    <button

                      onClick={() => onDelete(item.id)}

                      className="rounded-lg bg-red-100 p-3 text-red-600 hover:bg-red-200"

                    >

                      <FaTrash />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}