import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { blogApi, dateLabel } from "../blogApi";
export default function Blog() {
  const [posts, P] = useState(null),
    [error, E] = useState("");
  useEffect(() => {
    let active = true;
    blogApi("list")
      .then((p) => {
        if (active) P(p);
      })
      .catch((e) => {
        if (active) E(e.message);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container" data-aos="fade-up">
          <span className="eyebrow">THE PRNNI JOURNAL</span>
          <h1>
            Thoughts for a<br />
            <em>more meaningful life.</em>
          </h1>
          <p>
            Gentle reminders, thoughtful ideas and practical inspiration for
            daily journaling, mindful planning, better habits and personal
            growth.
          </p>
          <Link to="/" className="blog-back">
            Discover Prnni's Diary <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section blog-list-section">
        <div className="container">
          <div className="blog-section-title">
            <div>
              <span className="eyebrow">STORIES & REFLECTIONS</span>
              <h2>
                From Our <em>Journal</em>
              </h2>
            </div>
          </div>
          {error ? (
            <p role="alert">Unable to load blogs: {error}</p>
          ) : !posts ? (
            <p>Loading articles…</p>
          ) : !posts.length ? (
            <p>Our first stories are coming soon.</p>
          ) : (
            <div className="cms-public-grid">
              {posts.map((p) => (
                <Link
                  className="cms-public-card"
                  to={`/blog/${p.slug}`}
                  key={p.id}
                >
                  <img src={p.image} alt={p.imageAlt} loading="lazy" />
                  <div className="cms-card-copy">
                    <span>
                      {p.category} · {dateLabel(p.publishedAt)}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <strong>
                      Read article <ArrowUpRight size={16} />
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="blog-cta">
        <div className="container">
          <h2>Your next chapter deserves intention.</h2>
          <p>Begin your 90-day journey with Prnni's Diary.</p>
          <Link to="/#prebook" className="btn-light">
            Discover Pre-Booking <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
