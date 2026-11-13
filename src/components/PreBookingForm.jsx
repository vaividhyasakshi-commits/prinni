import React, { useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  category: "",
  quantity: "1",
  message: "",
};

export default function PreBookingForm({ variant = "default" }) {
  const [data, setData] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const update = (event) => {
    const { name, value } = event.target;

    setData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!/^[0-9]{10}$/.test(data.phone)) {
      setNotice("Please enter a valid 10-digit mobile number.");
      return;
    }

    setNotice(
      "Pre-booking registration is not live yet. It will open on 5 December 2026."
    );
  };

  return (
    <div className={`booking-card ${variant}`}>
      <div className="booking-heading">
        <span className="eyebrow">YOUR NEW CHAPTER STARTS HERE</span>
        <h3>Reserve Your Prnni's Diary</h3>
        <p>
          Be among the first to begin a meaningful 90-day journey.
        </p>
      </div>

      <form className="booking-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor={`name-${variant}`}>Full Name *</label>
          <input
            id={`name-${variant}`}
            name="name"
            type="text"
            placeholder="Your full name"
            value={data.name}
            onChange={update}
            required
          />
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor={`email-${variant}`}>Email *</label>
            <input
              id={`email-${variant}`}
              name="email"
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={update}
              required
            />
          </div>

          <div className="field">
            <label htmlFor={`phone-${variant}`}>Phone *</label>
            <input
              id={`phone-${variant}`}
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="Mobile number"
              maxLength={10}
              value={data.phone}
              onChange={update}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor={`city-${variant}`}>City *</label>
            <input
              id={`city-${variant}`}
              name="city"
              placeholder="Your city"
              value={data.city}
              onChange={update}
              required
            />
          </div>

          <div className="field">
            <label htmlFor={`quantity-${variant}`}>Quantity *</label>
            <select
              id={`quantity-${variant}`}
              name="quantity"
              value={data.quantity}
              onChange={update}
            >
              {[1, 2, 3, 4, 5, 10].map((n) => (
                <option value={n} key={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor={`category-${variant}`}>
            I'm buying this diary for *
          </label>
          <select
            id={`category-${variant}`}
            name="category"
            value={data.category}
            onChange={update}
            required
          >
            <option value="">Choose an option</option>
            <option value="self">Myself</option>
            <option value="student">Student</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="professional">Working Professional</option>
            <option value="gift">Gift for Someone</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor={`message-${variant}`}>
            Special Message (Optional)
          </label>
          <textarea
            id={`message-${variant}`}
            name="message"
            value={data.message}
            onChange={update}
            placeholder="Anything you'd like to share?"
            rows={3}
          />
        </div>

        <button type="submit" className="booking-submit">
          Pre-Booking Coming Soon
          <ArrowUpRight size={18} />
        </button>

        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}

        <p className="form-disclaimer">
          <LockKeyhole size={13} />
          Official registration opens after booking setup.
        </p>
      </form>
    </div>
  );
}