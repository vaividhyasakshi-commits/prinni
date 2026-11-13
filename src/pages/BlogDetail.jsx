import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { blogApi, dateLabel } from "../blogApi";
import "quill/dist/quill.core.css";
export default function BlogDetail() {
  const { slug } = useParams();
  const [result, R] = useState(null);
  useEffect(() => {
    let active = true;
    R(null);
    blogApi("post", { params: { slug } })
      .then((p) => {
        if (active) R({ p });
      })
      .catch((e) => {
        if (active) R({ error: e.message });
      });
    return () => {
      active = false;
    };
  }, [slug]);
  const p = result?.p;
  useEffect(() => {
    if (!p) return;
    const title = p.seoTitle || `${p.title} | Prnni’s Diary`;
    const description = p.seoDescription || p.description;
    document.title = title;
    const tags = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[property="og:image"]', new URL(p.image, location.origin).href],
    ];
    const old = tags.map(([s, v]) => {
      const el = document.querySelector(s);
      const prev = el?.getAttribute("content");
      el?.setAttribute("content", v);
      return [el, prev];
    });
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description,
      image: new URL(p.image, location.origin).href,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: { "@type": "Person", name: p.author },
      mainEntityOfPage: location.href,
    });
    document.head.append(schema);
    return () => {
      schema.remove();
      old.forEach(([el, v]) => {
        if (el) {
          if (v === null) el.removeAttribute("content");
          else el.setAttribute("content", v);
        }
      });
    };
  }, [p]);
  if (!result)
    return <section className="cms-article">Loading article…</section>;
  if (!p)
    return (
      <section className="cms-article">
        <h1>Article unavailable</h1>
        <p>{result.error}</p>
        <Link to="/blog">Back to blog</Link>
      </section>
    );
  return (
    <article className="cms-article">
      <Link to="/blog" className="cms-back">
        ← Back to all articles
      </Link>
      <img className="cms-feature" src={p.image} alt={p.imageAlt} />
      <header>
        <span className="eyebrow">{p.category}</span>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
        <small>
          By {p.author} · Published {dateLabel(p.publishedAt)} · Updated{" "}
          {dateLabel(p.updatedAt)}
        </small>
      </header>
      <div
        className="cms-article-body ql-editor"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(p.content, {
            FORBID_TAGS: [
              "style",
              "iframe",
              "form",
              "input",
              "button",
              "svg",
              "math",
            ],
            FORBID_ATTR: ["srcset"],
          }),
        }}
      />
      <Link to="/blog" className="cms-back">
        ← Explore more articles
      </Link>
    </article>
  );
}
