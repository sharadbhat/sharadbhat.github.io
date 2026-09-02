import { useEffect, useState, type SyntheticEvent } from "react";
import { contactFormApiUrl } from "../../../config/contact";
import "./index.css";

export function ContactFormBlock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  useEffect(() => {
    if (status !== "sent") return undefined;

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const sendEmail = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");

    try {
      const response = await fetch(contactFormApiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      setName("");
      setEmail("");
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-form-block">
      <div className="contact-form-block__copy">
        <h2 className="contact-form-block__title">Get in touch!</h2>
        <p className="contact-form-block__message">
          Send me a note and I will get back to you.
        </p>
      </div>
      <form className="contact-form-block__form" onSubmit={sendEmail}>
        <label className="contact-form-block__field">
          <span>Name</span>
          <input
            autoComplete="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            type="text"
            value={name}
          />
        </label>
        <label className="contact-form-block__field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label className="contact-form-block__field contact-form-block__field--message">
          <span>Message</span>
          <textarea
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
            value={message}
          />
        </label>
        <button
          className={`contact-form-block__submit contact-form-block__submit--${status}`}
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting"
            ? "Sending"
            : status === "sent"
              ? "Sent!"
              : "Send message"}
        </button>
        {status === "error" ? (
          <p className="contact-form-block__status contact-form-block__status--error">
            Could not send that message. Try again in a moment.
          </p>
        ) : null}
      </form>
    </section>
  );
}
