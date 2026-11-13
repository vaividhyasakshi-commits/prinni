export async function blogApi(
  action,
  { params = {}, body, csrf } = {}
) {
  // PUBLIC BLOGS — NO PHP BACKEND REQUIRED

  if (action === "list" || action === "post") {
    const response = await fetch("/data/blogs.json", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        "Published blogs could not be loaded"
      );
    }

    const posts = await response.json();

    if (!Array.isArray(posts)) {
      throw new Error("Invalid blog data");
    }

    if (action === "list") {
      return posts.map(({ content, ...summary }) => summary);
    }

    const post = posts.find(
      (p) => p.slug === params.slug
    );

    if (!post) {
      throw new Error("Article not found");
    }

    return post;
  }

  // ADMIN PANEL — PHP BACKEND REQUIRED

  const query = new URLSearchParams({
    action,
    ...params,
  });

  const form = body instanceof FormData;

  const response = await fetch(
    `/api/blog.php?${query}`,
    {
      credentials: "same-origin",

      method: body === undefined ? "GET" : "POST",

      headers: {
        ...(body !== undefined && !form
          ? { "Content-Type": "application/json" }
          : {}),

        ...(csrf
          ? { "X-CSRF-Token": csrf }
          : {}),
      },

      body:
        body === undefined
          ? undefined
          : form
          ? body
          : JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

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