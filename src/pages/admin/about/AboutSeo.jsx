import ImageUploader from "../../../components/common/ImageUploader";

export default function AboutSeo({
  data,
  setData,
}) {

  const seo = data.seo || {};

  function handleChange(e) {

    setData({

      ...data,

      seo: {

        ...seo,

        [e.target.name]: e.target.value,

      },

    });

  }

  return (

    <div className="rounded-3xl bg-white shadow-lg">

      <div className="border-b p-8">

        <h2 className="text-2xl font-bold text-[#082B69]">

          SEO & Social Media

        </h2>

        <p className="mt-2 text-slate-500">

          Configure how the About page appears in Google,
          Facebook, LinkedIn and X (Twitter).

        </p>

      </div>

      <div className="space-y-8 p-8">

        {/* Meta Title */}

        <div>

          <label className="mb-2 block font-semibold">

            Meta Title

          </label>

          <input
            type="text"
            name="metaTitle"
            value={seo.metaTitle || ""}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Meta Description */}

        <div>

          <label className="mb-2 block font-semibold">

            Meta Description

          </label>

          <textarea
            rows="5"
            name="metaDescription"
            value={seo.metaDescription || ""}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Keywords */}

        <div>

          <label className="mb-2 block font-semibold">

            Keywords

          </label>

          <input
            type="text"
            name="keywords"
            value={seo.keywords || ""}
            onChange={handleChange}
            placeholder="nursing,muhas,unsata,tanzania"
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Canonical URL */}

        <div>

          <label className="mb-2 block font-semibold">

            Canonical URL

          </label>

          <input
            type="url"
            name="canonical"
            value={seo.canonical || ""}
            onChange={handleChange}
            placeholder="https://unsata.or.tz/about"
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Open Graph Title */}

        <div>

          <label className="mb-2 block font-semibold">

            Open Graph Title

          </label>

          <input
            type="text"
            name="ogTitle"
            value={seo.ogTitle || ""}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Open Graph Description */}

        <div>

          <label className="mb-2 block font-semibold">

            Open Graph Description

          </label>

          <textarea
            rows="4"
            name="ogDescription"
            value={seo.ogDescription || ""}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Social Preview Image */}

        <div>

          <label className="mb-3 block font-semibold">

            Social Preview Image

          </label>

          <ImageUploader
            value={seo.ogImage || ""}
            folder="seo"
            onChange={(image)=>
              setData({

                ...data,

                seo:{

                  ...seo,

                  ogImage:image

                }

              })
            }
          />

        </div>

        {/* Robots */}

        <div className="rounded-2xl border p-6">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={seo.index ?? true}
              onChange={(e)=>

                setData({

                  ...data,

                  seo:{

                    ...seo,

                    index:e.target.checked

                  }

                })

              }
            />

            <span className="font-semibold">

              Allow Search Engines to Index this page

            </span>

          </label>

        </div>

      </div>

    </div>

  );

}