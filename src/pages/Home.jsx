import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  PenLine,
  Sparkles,
  Target,
  Users,
  Gift,
  Moon,
  Sun,
} from "lucide-react";

import PreBookingForm from "../components/PreBookingForm";
import { publicUrl } from "../publicUrl";

const photos = {
  cover: "/images/prnni-cover.jpg",
  story: "/images/prnni-story.jpg",
  daily: "/images/prnni-daily.jpg",
  students: "/images/prnni-students.jpg",
  children: "/images/prnni-children.jpg",
};

const benefits = [
  {
    icon: Clock3,
    title: "Time Management",
    text: "Organise your schedule and make meaningful use of your day.",
  },
  {
    icon: Target,
    title: "Daily Goal Setting",
    text: "Turn your bigger dreams into small, achievable daily actions.",
  },
  {
    icon: Heart,
    title: "Gratitude",
    text: "Notice the people and moments that make your life beautiful.",
  },
  {
    icon: PenLine,
    title: "Self-Reflection",
    text: "Understand your thoughts, experiences, emotions and progress.",
  },
  {
    icon: BookOpen,
    title: "Better Habits",
    text: "Build a more consistent approach to your everyday routines.",
  },
  {
    icon: Sparkles,
    title: "Personal Growth",
    text: "Give yourself room to learn, improve and become.",
  },
];

const audiences = [
  {
    icon: BookOpen,
    title: "For Students",
    subtitle: "Study with direction",
    text: "Manage study hours, assignments, revision, exam preparation and goals.",
  },
  {
    icon: Heart,
    title: "For Children",
    subtitle: "Little minds, meaningful habits",
    text: "Build creativity, gratitude and healthy routines with support from parents.",
  },
  {
    icon: Users,
    title: "For Parents",
    subtitle: "Make time for yourself",
    text: "Find balance between family responsibilities, reflection and personal priorities.",
  },
  {
    icon: Target,
    title: "For Professionals",
    subtitle: "Work with clarity",
    text: "Prioritise important tasks, organise schedules and reflect on your progress.",
  },
];

const diaryFeatures = [
  { icon: Sun, title: "Today's Goal", text: "Choose one meaningful task." },
  { icon: Clock3, title: "Daily Timetable", text: "Plan important parts of your day." },
  { icon: Target, title: "Special Focus", text: "Decide what matters most today." },
  { icon: Heart, title: "Talk to Prnni", text: "Share feelings, lessons and gratitude." },
  { icon: PenLine, title: "Tomorrow's Plan", text: "Prepare thoughtfully for tomorrow." },
  { icon: Moon, title: "Tonight's Thought", text: "Reflect before ending your day." },
];

const faqs = [
  {
    question: "What is Prnni's Diary?",
    answer:
      "Prnni's Diary is a guided 90-day journal designed for planning, goal setting, reflection, gratitude and building positive daily habits.",
  },
  {
    question: "Who can use Prnni?",
    answer:
      "Students, children, parents and working professionals can use Prnni. Younger children can complete their diary with a parent or guardian.",
  },
  {
    question: "How long should I write every day?",
    answer:
      "Around 10 minutes of thoughtful daily writing is a good starting point. You can adjust this to your needs.",
  },
  {
    question: "Is this only a timetable planner?",
    answer:
      "No. It combines practical daily scheduling with emotional reflection, goal setting, gratitude and personal growth.",
  },
  {
    question: "When will Prnni launch?",
    answer:
      "Prnni is scheduled to launch on 5 December 2026, with pre-bookings planned for 5–15 December 2026.",
  },
  {
    question: "How do I pre-book?",
    answer:
      "The official booking process will be enabled before 5 December. Payment and delivery details will be announced before bookings open.",
  },
];

function SectionHeading({ tag, title, description, center = false }) {
  return (
    <div data-aos="fade-up" className={`section-heading ${center ? "center" : ""}`}>
      <span className="eyebrow">{tag}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function LaunchCountdown() {
  const launch = new Date("2026-12-05T00:00:00+05:30").getTime();

  const calculate = () => {
    const remaining = Math.max(0, launch - Date.now());

    return {
      Days: Math.floor(remaining / 86400000),
      Hours: Math.floor((remaining / 3600000) % 24),
      Minutes: Math.floor((remaining / 60000) % 60),
      Seconds: Math.floor((remaining / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (Date.now() >= launch) {
    return <p className="countdown-done">Prnni has officially launched!</p>;
  }

  return (
    <div className="launch-countdown">
      {Object.entries(time).map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className="home-hero" id="home">
        <div className="container hero-layout">
          <div className="hero-content" data-aos="fade-up">
            <span className="eyebrow">
              PRNNI’S DIARY · 90-DAY GUIDED JOURNAL
            </span>

            <h1>
              This diary is
              <br />
              <em>not for everyone.</em>
            </h1>

            <h2 className="hero-subheading">
              It's for those who are truly ready to change themselves.
            </h2>

            <p>
              For the dreamers seeking direction. For busy minds looking
              for clarity. For anyone ready to turn everyday intentions
              into meaningful action. Prnni’s Diary is a guided daily planner and self-reflection journal for goal setting, time management, gratitude and personal growth.
            </p>

            <div className="hero-actions">
              <a href="#about" className="btn-primary">
                Discover Prnni <ArrowUpRight size={18} />
              </a>

              <a href="#inside" className="btn-text">
                Explore the Diary <ArrowRight size={17} />
              </a>
            </div>

            <div className="hero-stats">
              <div><strong>90</strong><span>Days of Growth</span></div>
              <div><strong>10</strong><span>Minutes a Day</span></div>
              <div><strong>01</strong><span>Better You</span></div>
            </div>
          </div>

          <div className="hero-form-column" data-aos="fade-up">
            <div className="form-banner">
              <CalendarDays size={17} />
              Launching 5 December 2026
            </div>

            <PreBookingForm variant="hero" />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <div className="philosophy-strip" aria-label="Plan with purpose, reflect with honesty, grow with love, become your better self">
        <div className="philosophy-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="philosophy-group" key={copy}>
              {[0, 1, 2, 3].map((repeat) => (
                <React.Fragment key={repeat}>
                  {["PLAN WITH PURPOSE", "REFLECT WITH HONESTY", "GROW WITH LOVE", "BECOME YOUR BETTER SELF"].map((phrase) => (
                    <span className="philosophy-item" key={phrase}>{phrase}<span>✳</span></span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="container about-layout">
          <div className="about-image" data-aos="fade-up">
            <img
              src={publicUrl("/images/heart behind.png")}
              alt="The story behind Prnni’s Diary"
              loading="lazy"
            />

            <div className="image-note">
              <Heart size={19} />
              Someone who loves you.
            </div>
          </div>

          <div className="about-content" data-aos="fade-up">
            <SectionHeading
              tag="MORE THAN JUST A DIARY"
              title={
                <>
                  Meet Prnni.
                  <br />
                  <em>Someone who loves you.</em>
                </>
              }
            />

            <p>
              Think of someone who has always been there for you.
              Someone who celebrated your smallest victories and
              listened when words weren't enough.
            </p>

            <p><strong>That is Prnni.</strong></p>

            <p>
              Prnni could be your mother, father, partner, child,
              sibling, friend, teacher, or someone whose love makes
              your life a little more beautiful.
            </p>

            <p>
              Every night when you open this diary, imagine Prnni
              sitting beside you — not to judge you, but to listen
              as you share your thoughts, feelings and dreams.
            </p>

            <div className="about-quote">
              “Prnni has many faces, but one heart — a heart that
              loves without conditions.”
            </div>

            <span className="signature">With love, Prnni ♡</span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section benefits-section" id="benefits">
        <div className="container">
          <SectionHeading
            tag="WHY CHOOSE PRNNI?"
            center
            title={
              <>
                Small steps.
                <br />
                <em>Meaningful changes.</em>
              </>
            }
            description="Build better daily habits with a guided personal growth journal for time management, goal setting, gratitude and self-reflection."
          />

          <div className="benefits-grid">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <article className="benefit-card" data-aos="fade-up" data-aos-delay={(index % 4) * 70} key={item.title}>
                  <div className="card-top">
                    <div className="icon-box">
                      <Icon size={25} strokeWidth={1.5} />
                    </div>
                    <span>0{index + 1}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section audience-section" id="audience">
        <div className="container">
          <SectionHeading
            tag="WHO IS PRNNI FOR?"
            center
            title={
              <>
                Different journeys.
                <br />
                <em>One beautiful purpose.</em>
              </>
            }
            description="A daily planner and guided journal for students, children, parents and working professionals. No matter where you are in life, your next chapter deserves intention."
          />

          <div className="audience-grid">
            {audiences.map((item, index) => {
              const Icon = item.icon;

              return (
                <article className="audience-card" data-aos="fade-up" data-aos-delay={(index % 4) * 70} key={item.title}>
                  <div className="audience-top">
                    <Icon size={29} strokeWidth={1.4} />
                    <span>0{index + 1} / 04</span>
                  </div>

                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSIDE THE DIARY */}
      <section className="section inside-section" id="inside">
        <div className="container inside-layout">
          <div>
            <SectionHeading
              tag="EXPLORE WHAT'S INSIDE"
              title={
                <>
                  Every page has
                  <br />
                  <em>a purpose.</em>
                </>
              }
            />

            <p className="inside-intro">
              This guided daily planner brings together your daily timetable, meaningful
              goals, personal focus, emotions and gratitude.
            </p>

            <div className="diary-features">
              {diaryFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="diary-feature" key={item.title}>
                    <div className="feature-icon">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>

                    <Check size={17} />
                  </div>
                );
              })}
            </div>

            <a href="#prebook" className="btn-primary">
              Begin Your Journey <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="inside-photos" data-aos="fade-up">
            <div className="inside-photo first">
              <img
                src={publicUrl("/images/daily.png")}
                alt="Prnni’s Diary daily timetable and goal setting page"
                loading="lazy"
              />
            </div>

            <div className="inside-photo second">
              <img
                src={publicUrl("/images/sharp mind.png")}
                alt="Prnni’s Diary student planning and reflection page"
                loading="lazy"
              />
            </div>

            <div className="inside-circle">
              <strong>90</strong>
              <span>DAYS OF YOU</span>
            </div>
          </div>
        </div>
      </section>

      {/* 90-DAY JOURNEY */}
      <section className="section journey-section" id="journey">
        <div className="container">
          <SectionHeading
            tag="YOUR 90-DAY JOURNEY"
            center
            title={
              <>
                Three months.
                <br />
                <em>A new perspective.</em>
              </>
            }
            description="You don't have to change everything at once. You just have to begin."
          />

          <div className="journey-grid">
            {[
              {
                no: "01",
                days: "DAYS 01–30",
                title: "Begin",
                subtitle: "Discover your rhythm.",
                text: "Understand your routine, identify your goals and start showing up for yourself.",
              },
              {
                no: "02",
                days: "DAYS 31–60",
                title: "Build",
                subtitle: "Choose consistency.",
                text: "Strengthen meaningful habits, learn from setbacks and create better routines.",
              },
              {
                no: "03",
                days: "DAYS 61–90",
                title: "Become",
                subtitle: "See how far you've come.",
                text: "Reflect on your progress, celebrate your achievements and prepare for the next chapter.",
              },
            ].map((item) => (
              <article className="journey-card" data-aos="fade-up" key={item.no}>
                <div className="journey-number">{item.no}</div>
                <span className="eyebrow">{item.days}</span>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.text}</p>

                <div className="journey-bottom">
                  <span>YOUR JOURNEY</span>
                  <ArrowUpRight size={18} />
                </div>
              </article>
            ))}
          </div>

          <p className="journey-caption">
            Your progress doesn't need to be perfect to be meaningful. ♡
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <SectionHeading
            tag="A CLOSER LOOK"
            center
            title={
              <>
                Made with thought.
                <br />
                <em>Filled with heart.</em>
              </>
            }
          />

          <div className="gallery-grid">
            {[
              { image: publicUrl("/images/heart behind.png"), title: "The Heart Behind Prnni" },
              { image: publicUrl("/images/little dreamer.png"), title: "For Little Dreamers" },
              { image: publicUrl("/images/sharp mind.png"), title: "For Focused Minds" },
              { image: publicUrl("/images/daily.png"), title: "Daily Planning" },
            ].map((item, index) => (
              <article className="gallery-card" data-aos="fade-up" data-aos-delay={(index % 4) * 70} key={item.title}>
                <div className="gallery-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <div className="gallery-caption">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LAUNCH */}
      <section className="launch-section" id="launch">
        <div className="container launch-inner">
          <Sparkles size={34} />

          <span className="eyebrow">YOUR NEXT CHAPTER IS WAITING</span>

          <h2>
            A beautiful beginning
            <br />
            <em>is coming.</em>
          </h2>

          <p>
            One diary. Ninety days. Countless opportunities to become
            a little better than yesterday.
          </p>

          <div className="launch-dates">
            <div>
              <CalendarDays size={22} />
              <span>OFFICIAL LAUNCH</span>
              <strong>05 December 2026</strong>
            </div>

            <div className="date-divider" />

            <div>
              <Clock3 size={22} />
              <span>PRE-BOOKING WINDOW</span>
              <strong>05–15 December 2026</strong>
            </div>
          </div>

          <LaunchCountdown />

          <a href="#prebook" className="btn-light">
            Explore Pre-Booking
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* FINAL CTA + SECOND FORM */}
      <section className="section final-cta-section" id="prebook">
        <div className="container final-cta-layout">
          <div>
            <span className="eyebrow">A PROMISE TO YOURSELF</span>

            <h2>
              The best investment
              <br />
              is <em>in yourself.</em>
            </h2>

            <p>
              Your time matters. Your thoughts matter. Your dreams matter.
              Give yourself a little space every day to plan, reflect
              and grow.
            </p>

            <div className="cta-points">
              <div><Check size={17} /> 90 days of guided journaling</div>
              <div><Check size={17} /> Daily timetable and goal setting</div>
              <div><Check size={17} /> Personal reflection and gratitude</div>
              <div><Check size={17} /> For different age groups and lifestyles</div>
            </div>

            <div className="cta-message">
              <Gift size={27} />
              <p>
                A thoughtful gift for yourself or someone whose growth
                means the world to you.
              </p>
            </div>
          </div>

          <PreBookingForm variant="final" />
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <div>
            <SectionHeading
              tag="FREQUENTLY ASKED QUESTIONS"
              title={
                <>
                  A little clarity
                  <br />
                  <em>before you begin.</em>
                </>
              }
            />

            <p className="faq-intro">
              Every meaningful journey begins with curiosity.
              Here are a few things you might want to know.
            </p>
          </div>

          <div className="faq-list" data-aos="fade-up">
            {faqs.map((item, index) => (
              <div className="faq-item" key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={activeFaq === index}
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? -1 : index)
                  }
                >
                  {item.question}
                  <ChevronDown
                    size={19}
                    className={activeFaq === index ? "rotated" : ""}
                  />
                </button>

                <p className="faq-answer" hidden={activeFaq !== index}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section blog-preview">
        <div className="container blog-preview-layout">
          <div>
            <span className="eyebrow">FROM OUR JOURNAL</span>
            <h2>
              Thoughts worth
              <br />
              <em>keeping close.</em>
            </h2>
            <p>
              Thoughtful ideas about time management, reflection,
              personal growth and mindful everyday living.
            </p>
          </div>

          <Link to="/blog" className="btn-primary">
            Explore Our Blog <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
