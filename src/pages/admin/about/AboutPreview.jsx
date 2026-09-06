export default function AboutPreview({ data }) {

  const general = data.general || {};

  const blocks = data.blocks || [];

  const statistics = data.statistics || [];

  return (

    <div className="sticky top-6 overflow-hidden rounded-3xl bg-white shadow-xl">

      {/* Header */}

      <div className="bg-[#082B69] px-8 py-6">

        <h2 className="text-2xl font-bold text-white">
          Live Preview
        </h2>

        <p className="mt-2 text-blue-100">
          This is how visitors will see your About page.
        </p>

      </div>

      <div className="space-y-10 p-8">

        {/* Hero */}

        <div>

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-[#082B69]">

            {general.section || "ABOUT UNSATA"}

          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight text-[#082B69]">

            {general.title || "About Title"}

          </h1>

          <p className="mt-6 leading-8 text-slate-600">

            {general.description || "Description"}

          </p>

        </div>

        {/* Hero Image */}

        {general.image ? (

          <img
            src={general.image}
            alt=""
            className="h-72 w-full rounded-3xl object-cover"
          />

        ) : (

          <div className="flex h-72 items-center justify-center rounded-3xl border-2 border-dashed">

            No Image

          </div>

        )}

        {/* Blocks */}

        {blocks.length > 0 && (

          <div>

            <h2 className="mb-6 text-2xl font-bold text-[#082B69]">

              Content Blocks

            </h2>

            <div className="space-y-6">

              {blocks.map((block) => (

                <div
                  key={block.id}
                  className="rounded-2xl border p-6"
                >

                  <h3 className="text-xl font-bold text-[#082B69]">

                    {block.title || "Block Title"}

                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">

                    {block.description}

                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Statistics */}

        {statistics.length > 0 && (

          <div>

            <h2 className="mb-6 text-2xl font-bold text-[#082B69]">

              Statistics

            </h2>

            <div className="grid grid-cols-2 gap-5">

              {statistics.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl bg-slate-100 p-5 text-center"
                >

                  <div className="text-3xl font-black text-[#082B69]">

                    {item.value}
                    {item.suffix}

                  </div>

                  <p className="mt-2">

                    {item.title}

                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Button */}

        <button
          className="rounded-xl bg-[#082B69] px-8 py-4 font-semibold text-white"
        >

          {general.buttonText || "Learn More"}

        </button>

      </div>

    </div>

  );

}