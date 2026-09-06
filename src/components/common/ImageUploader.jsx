import { useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import { uploadImage } from "../../services/cloudinary";

export default function ImageUploader({
  value,
  onChange,
  folder = "unsata",
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const image = await uploadImage(file, folder);

      onChange(image.url);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    onChange("");

    toast.success("Image removed");
  }

  return (
    <div className="space-y-4">

      {value ? (

        <div className="relative">

          <img
            src={value}
            alt="Preview"
            className="h-64 w-full rounded-2xl object-cover border"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-3 text-white hover:bg-red-700"
          >
            <FaTrash />
          </button>

        </div>

      ) : (

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-12 hover:border-[#082B69]">

          <FaCloudUploadAlt className="text-6xl text-[#082B69]" />

          <p className="mt-5 font-semibold">

            {uploading
              ? "Uploading..."
              : "Choose Image"}

          </p>

          <p className="mt-2 text-sm text-slate-500">
            PNG • JPG • JPEG • WEBP
          </p>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />

        </label>

      )}

    </div>
  );
}