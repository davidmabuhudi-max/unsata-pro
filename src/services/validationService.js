export function validateApplication(formData) {
  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "registrationNumber",
    "university",
  ];

  for (const field of requiredFields) {
    if (!formData.get(field)) {
      throw new Error(`${field} is required.`);
    }
  }

  return true;
}