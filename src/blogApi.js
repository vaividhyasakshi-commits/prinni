export async function blogApi(action, { params = {}, body, csrf } = {}) {
  const query = new URLSearchParams({ action, ...params });
  const form = body instanceof FormData;
  const r = await fetch(`/api/blog.php?${query}`, {
    credentials: "same-origin",
    method: body === undefined ? "GET" : "POST",
    headers: {
      ...(body !== undefined && !form
        ? { "Content-Type": "application/json" }
        : {}),
      ...(csrf ? { "X-CSRF-Token": csrf } : {}),
    },
    body: body === undefined ? undefined : form ? body : JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Request failed");
  return data;
}
export const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      })
    : "—";
