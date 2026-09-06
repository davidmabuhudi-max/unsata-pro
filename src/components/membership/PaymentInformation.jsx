import { useState } from "react";
import membership from "../../data/membership";

export default function PaymentInformation() {

  const plan = membership.plans[0];

  const [receiptName, setReceiptName] = useState("");

  const handleReceipt = (e) => {

    const file = e.target.files[0];

    if (file) {
      setReceiptName(file.name);
    }

  };

  return (

    <>

      <h2 className="text-3xl font-bold text-[#0B3D91] mt-16 mb-6">

        Payment Information

      </h2>

      <div className="bg-slate-100 rounded-2xl p-8 mb-8">

        <h3 className="text-2xl font-bold">

          Membership Fee

        </h3>

        <p className="text-5xl font-black mt-4">

          {plan.currency} {plan.fee.toLocaleString()}

        </p>

      </div>

      {/* Payment Instructions */}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">

        <h3 className="text-xl font-bold text-[#0B3D91]">

          Payment Instructions

        </h3>

        <ul className="mt-4 space-y-2 text-gray-700">

          <li>• Pay the membership fee using one of the methods below.</li>

          <li>• Save your payment confirmation.</li>

          <li>• Upload the payment receipt or proof of payment.</li>

          <li>• Enter the payment reference number correctly.</li>

        </ul>

      </div>

      {/* Payment Method */}

      <select
        name="paymentMethod"
        required
        className="w-full border rounded-xl p-4"
      >

        <option value="">
          Payment Method *
        </option>

        {plan.paymentMethods.map((method) => (

          <option
            key={method}
            value={method}
          >

            {method}

          </option>

        ))}

      </select>

      {/* Reference */}

      <input
        type="text"
        name="paymentReference"
        placeholder="Payment Reference Number *"
        required
        className="w-full border rounded-xl p-4 mt-6"
      />

      {/* Receipt */}

      <div className="mt-8">

        <label className="block mb-3 font-semibold text-[#0B3D91]">

          Upload Payment Receipt / Proof of Payment *

        </label>

        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            min-h-[220px]
            border-2
            border-dashed
            border-green-600
            rounded-3xl
            cursor-pointer
            hover:bg-green-50
            transition
          "
        >

          {receiptName ? (

            <>

              <div className="text-6xl">

                ✅

              </div>

              <h3 className="mt-4 text-2xl font-bold text-green-700">

                Receipt Uploaded

              </h3>

              <p className="mt-3 text-gray-600">

                {receiptName}

              </p>

            </>

          ) : (

            <>

              <div className="text-6xl">

                💳

              </div>

              <h3 className="mt-4 text-2xl font-bold text-green-700">

                Upload Receipt or Payment Evidence

              </h3>

              <p className="mt-3 text-gray-500">

                JPG, PNG or PDF (Maximum 5MB)

              </p>

            </>

          )}

          <input
            type="file"
            name="paymentReceipt"
            accept=".jpg,.jpeg,.png,.pdf"
            
            onChange={handleReceipt}
            className="hidden"
          />

        </label>

      </div>

    </>

  );

}