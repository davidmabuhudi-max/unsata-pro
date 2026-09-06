import { useState } from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBullhorn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import useHeroSlides from "./useHeroSlides";
import HeroForm from "./HeroForm";
import HeroCardManagement from "./heroCard/HeroCardManagement";

export default function HeroManagement() {
  const {
    slides,
    loading,
    addSlide,
    editSlide,
    removeSlide,
  } = useHeroSlides();

  const [showForm, setShowForm] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);

  function handleAdd() {
    setSelectedSlide(null);
    setShowForm(true);
  }

  function handleEdit(slide) {
    setSelectedSlide(slide);
    setShowForm(true);
  }

  async function handleSave(formData) {
    if (selectedSlide) {
      await editSlide(
        selectedSlide.id,
        formData
      );
    } else {
      await addSlide(formData);
    }

    setShowForm(false);
    setSelectedSlide(null);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hero slide?"
    );

    if (!confirmed) return;

    await removeSlide(id);
  }

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-3xl bg-white shadow-lg">

        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#082B69]">

              <FaBullhorn className="text-3xl" />

            </div>

            <div>

              <h2 className="text-3xl font-black text-[#082B69]">
                Hero Management
              </h2>

              <p className="mt-2 text-slate-500">
                Manage homepage hero slides, images and text.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-3 rounded-xl bg-[#082B69] px-6 py-4 font-semibold text-white hover:bg-[#061d4a]"
          >

            <FaPlus />

            Add Hero Slide

          </button>

        </div>

      </div>


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#082B69]" />

          <p className="mt-4 text-slate-500">
            Loading hero slides...
          </p>

        </div>

      )}


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loading && slides.length === 0 && (

        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-16 text-center">

          <FaBullhorn className="mx-auto text-5xl text-slate-300" />

          <h3 className="mt-5 text-2xl font-bold text-[#082B69]">
            No Hero Slides
          </h3>

          <p className="mt-2 text-slate-500">
            You have not added any homepage hero slides yet.
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-6 rounded-xl bg-[#082B69] px-6 py-3 font-semibold text-white hover:bg-[#061d4a]"
          >

            <span className="flex items-center gap-2">

              <FaPlus />

              Add First Hero Slide

            </span>

          </button>

        </div>

      )}


      {/* =====================================================
          SLIDES
      ===================================================== */}

      {!loading && slides.length > 0 && (

        <div className="space-y-6">

          {slides.map((slide, index) => (

            <div
              key={slide.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >

              <div className="grid lg:grid-cols-[360px_1fr]">

                {/* IMAGE */}

                <div className="relative h-72 lg:h-full">

                  <img
                    src={slide.image}
                    alt={
                      slide.title ||
                      "Hero slide"
                    }
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-[#082B69] px-4 py-2 text-sm font-bold text-white">
                    Slide {index + 1}
                  </div>

                </div>


                {/* CONTENT */}

                <div className="p-8">

                  <div className="flex flex-col gap-6">

                    {/* STATUS */}

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        {slide.active ? (
                          <FaEye className="text-green-600" />
                        ) : (
                          <FaEyeSlash className="text-slate-400" />
                        )}

                        <span
                          className={`text-sm font-semibold ${
                            slide.active
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {slide.active
                            ? "Visible on homepage"
                            : "Hidden from homepage"}
                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(slide)
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#082B69] hover:bg-blue-200"
                          title="Edit slide"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              slide.id
                            )
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                          title="Delete slide"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </div>


                    {/* SUBTITLE */}

                    <div>

                      <p className="uppercase tracking-[3px] text-sm font-semibold text-[#1976D2] break-words">
                        {slide.subtitle}
                      </p>


                      {/* TITLE */}

                      <h3 className="mt-3 text-3xl font-black text-[#082B69] break-words">
                        {slide.title}
                      </h3>


                      {/* DESCRIPTION */}

                      <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-slate-600">
                        {slide.description}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          FORM MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6">

          <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl">

            <HeroForm
              initialData={selectedSlide}
              onSubmit={handleSave}
              onCancel={() => {
                setShowForm(false);
                setSelectedSlide(null);
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}