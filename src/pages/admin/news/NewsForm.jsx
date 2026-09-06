import { useState } from "react";
import ImageUploader from "../../../components/common/ImageUploader";

export default function NewsForm({

  initialData,

  onSubmit,

  onCancel,

}) {

  const [form, setForm] = useState(

    initialData || {

      title: "",

      description: "",

      category: "",

      author: "",

      image: "",

      featured: false,

      status: "published",

    }

  );

  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setForm({

      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  }

 function submit(e) {

  e.preventDefault();

  if (!form.title.trim()) {

    alert("Please enter the news title.");

    return;

  }

  if (!form.category) {

    alert("Please select a category.");

    return;

  }

  if (!form.description.trim()) {

    alert("Please enter the news description.");

    return;

  }

  if (!form.image) {

    alert("Please upload a featured image.");

    return;

  }

  onSubmit(form);

}

  return (

    <form
      onSubmit={submit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-lg"
    >

      <div>

        <h2 className="text-3xl font-black text-[#082B69]">

          News Article

        </h2>

        <p className="mt-2 text-slate-500">

          Create or edit a news article.

        </p>

      </div>

      {/* Title */}

      <div>

        <label className="mb-2 block font-semibold">

          Title

        </label>

        <input

          type="text"

          name="title"

          value={form.title}

          onChange={handleChange}

          maxLength={150}

          className="w-full rounded-xl border p-4"

        />

        <p className="mt-2 text-xs text-slate-500">

          {form.title.length}/150

        </p>

      </div>

      {/* Category */}

      <div>

        <label className="mb-2 block font-semibold">

          Category

        </label>

        <select

          name="category"

          value={form.category}

          onChange={handleChange}

          className="w-full rounded-xl border p-4"

        >

          <option value="">Select Category</option>

          <option>Announcement</option>

          <option>Academic</option>

          <option>Leadership</option>

          <option>Research</option>

          <option>Workshop</option>

          <option>Community Outreach</option>

          <option>Sports</option>

          <option>Other</option>

        </select>

      </div>

      {/* Author */}

      <div>

        <label className="mb-2 block font-semibold">

          Author

        </label>

        <input

          type="text"

          name="author"

          value={form.author}

          onChange={handleChange}

          className="w-full rounded-xl border p-4"

        />

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block font-semibold">

          Description

        </label>

        <textarea

          rows={8}

          name="description"

          value={form.description}

          onChange={handleChange}

          maxLength={3000}

          className="w-full rounded-xl border p-4"

        />

        <p className="mt-2 text-xs text-slate-500">

          {form.description.length}/3000

        </p>

      </div>

      {/* Image */}

      <div>

        <label className="mb-4 block font-semibold">

          Featured Image

        </label>

        <ImageUploader

          value={form.image}

          folder="news"

          onChange={(image) =>
            setForm({
              ...form,
              image,
            })
          }

        />

      </div>

      {/* Status */}

      <div className="grid gap-8 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold">

            Status

          </label>

          <select

            name="status"

            value={form.status}

            onChange={handleChange}

            className="w-full rounded-xl border p-4"

          >

            <option value="published">

              Published

            </option>

            <option value="draft">

              Draft

            </option>

          </select>

        </div>

        <div className="flex items-center gap-4 pt-9">

          <input

            id="featured"

            type="checkbox"

            name="featured"

            checked={form.featured}

            onChange={handleChange}

          />

          <label htmlFor="featured">

            Featured News

          </label>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <button

          type="button"

          onClick={onCancel}

          className="rounded-xl border px-8 py-3"

        >

          Cancel

        </button>

        <button

          type="submit"

          className="rounded-xl bg-[#082B69] px-8 py-3 font-semibold text-white"

        >

          Save News

        </button>

      </div>

    </form>

  );

}