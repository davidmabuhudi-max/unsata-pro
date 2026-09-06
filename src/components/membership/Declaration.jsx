export default function Declaration() {
  return (
    <>
      <div className="mt-16 border-t pt-10">

        <label className="flex items-start gap-4">

          <input
            type="checkbox"
            required
            className="mt-2"
          />

          <span className="leading-7 text-gray-700">

            I declare that all information provided in this
            application is true and correct. I understand
            that providing false information may lead to
            rejection or cancellation of my membership.

          </span>

        </label>

        <button
          type="submit"
          className="
            w-full
            mt-10
            bg-[#0B3D91]
            hover:bg-[#1565C0]
            text-white
            py-4
            rounded-xl
            text-lg
            font-semibold
            transition
          "
        >
          Submit Membership Application
        </button>

      </div>
    </>
  );
}