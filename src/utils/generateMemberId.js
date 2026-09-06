export default function generateMemberId(number) {
  const year = new Date().getFullYear();

  return `UMC-${year}-${String(number).padStart(4, "0")}`;
}