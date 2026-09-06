import { uploadImage } from "./cloudinary";

export async function uploadApplicationFiles(formData) {
  let passport = {};
  let receipt = {};

  const passportFile = formData.get("passportPhoto");
  const receiptFile = formData.get("paymentReceipt");

  if (passportFile?.size) {
    passport = await uploadImage(
      passportFile,
      "unsata/applications/passports"
    );
  }

  if (receiptFile?.size) {
    receipt = await uploadImage(
      receiptFile,
      "unsata/applications/receipts"
    );
  }

  return {
    passport,
    receipt,
  };
}