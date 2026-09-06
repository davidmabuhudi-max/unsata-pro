export function getSocialName(url) {
  if (!url) return "";

  try {
    const path = new URL(url).pathname
      .replace(/^\/+/, "")
      .replace(/\/$/, "");

    return path
      ? path.startsWith("@")
        ? path
        : `@${path}`
      : "";
  } catch {
    return "";
  }
}