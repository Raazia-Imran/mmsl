import { useCopy } from "../components/ContentCopy.jsx";
import React, { useState } from "react";
import Icon from "../components/Icon.jsx";
export default function Contact({ settings }) {
  const copy = useCopy();

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  async function submit(e) {
    e.preventDefault();
    if (!accessKey || status === "sending") return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    if (fields.get("botcheck")) return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: settings.title,
          from_name: settings.title,
          name: fields.get("name"),
          email: fields.get("email"),
          message: fields.get("message"),
          botcheck: fields.get("botcheck"),
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success)
        throw new Error(
          copy("Your message could not be sent. Please try again shortly."),
        );
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || copy("Something went wrong. Please try again."));
    }
  }
  return (
    <div className="contact-layout">
      <div className="contact-information">
        <span className="eyebrow">{copy("VISIT THE LAB")}</span>
        <h2>
          {copy("Let’s start")}
          <br />
          {copy("a conversation.")}
        </h2>
        <p>
          {copy(
            "For research enquiries, collaboration and information about the lab.",
          )}
        </p>
        <div className="contact-item">
          <Icon name="pin" />
          <div>
            <h3>{copy("Find us")}</h3>
            <address>
              {settings.address.map((x, i) => (
                <React.Fragment key={i}>
                  {x}
                  <br />
                </React.Fragment>
              ))}
            </address>
          </div>
        </div>
        <div className="contact-item">
          <Icon name="mail" />
          <div>
            <h3>{copy("Email the lab")}</h3>
            {settings.email ? (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            ) : (
              <p>{settings.emailPlaceholder}</p>
            )}
          </div>
        </div>
        {settings.phone && (
          <div className="contact-item">
            <span>{copy("Phone")}</span>
            <p>{settings.phone}</p>
            {settings.phoneNote && <p>{settings.phoneNote}</p>}
          </div>
        )}
        {settings.labHead && (
          <div className="contact-item">
            <span>{copy("Lab head")}</span>
            <p>{settings.labHead}</p>
          </div>
        )}
      </div>
      <form className="contact-form" onSubmit={submit}>
        <span className="eyebrow">{copy("SEND AN ENQUIRY")}</span>
        <h3>{copy("What would you like to explore?")}</h3>
        <label>
          {copy("Your name")}
          <input
            name="name"
            autoComplete="name"
            required
            maxLength="120"
            placeholder={copy("Full name")}
          />
        </label>
        <label>
          {copy("Email address")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength="254"
            placeholder={copy("you@example.com")}
          />
        </label>
        <label>
          {copy("Your message")}
          <textarea
            name="message"
            required
            minLength="10"
            maxLength="5000"
            rows="5"
            placeholder={copy("Tell us a little about your enquiry")}
          />
        </label>
        <input
          className="honeypot"
          type="checkbox"
          name="botcheck"
          tabIndex="-1"
          aria-hidden="true"
        />
        <p className="form-notice">
          {accessKey ? (
            <span>
              {copy(
                "By sending this form, you agree to the processing of your enquiry as described in our ",
              )}
              <a href="/privacy/">{copy("privacy notice")}</a>
              {copy(".")}
            </span>
          ) : (
            copy(
              "The form will open when the lab confirms its official contact email.",
            )
          )}
        </p>
        <button
          className="button primary"
          type="submit"
          disabled={!accessKey || status === "sending"}
        >
          {status === "sending"
            ? copy("Sending your message")
            : copy("Send enquiry")}
          <Icon name={status === "sending" ? "atom" : "upRight"} />
        </button>
        <p
          role="status"
          aria-live="polite"
          className={status === "error" ? "form-error" : "form-success"}
        >
          {status === "success"
            ? copy(
                "Your message has been sent. Thank you for contacting the lab.",
              )
            : error}
        </p>
      </form>
    </div>
  );
}
