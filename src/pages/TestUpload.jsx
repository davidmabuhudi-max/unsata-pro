import { useState } from "react";
import { uploadImage } from "../services/cloudinary";

export default function TestUpload() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const imageUrl = await uploadImage(image);

      setUrl(imageUrl);

      alert("Upload Successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-10">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded mt-5"
      >
        Upload
      </button>

      {url && (
        <div className="mt-10">
          <img
            src={url}
            alt="Uploaded"
            className="w-60 rounded-lg"
          />
        </div>
      )}
    </div>
  );
}