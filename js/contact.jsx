/* ============================================================
   Phoenix Pulsar — Contact section
   Self-contained form component using Web3Forms.
   Depends only on React (global) and the shared design tokens
   in styles.css / contact.css.  Export: window.ContactSection.
   ============================================================ */
const { useState: useStateC, useRef: useRefC } = React;

function ContactSection() {
  const [status, setStatus] = useStateC("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useStateC("");
  const formRef = useRefC(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const data = new FormData(formRef.current);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrorMsg("");
  }

  return (
    <section id="contact" className="contact">
      <div className="about-head">
        <div>
          <div className="about-kicker">
            <span className="line" />
            <span className="kicker">Contact</span>
          </div>
          <h2>Get in touch</h2>
        </div>
      </div>

      {status === "success" ? (
        <div className="contact-success">
          <span className="contact-check">&#10003;</span>
          <p className="contact-success-msg">Message sent successfully. I'll get back to you soon.</p>
          <button className="btn btn-ghost" onClick={resetForm} type="button">
            Send another message
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form"
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          {/*
            TODO: Replace YOUR_WEB3FORMS_ACCESS_KEY with your real key.
            Get a free access key at https://web3forms.com — just enter
            the email where you want to receive submissions.
            The key routes mail server-side so your email stays off the page.
          */}
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />

          {/* Honeypot — Web3Forms auto-rejects if this hidden checkbox is filled */}
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <label className="contact-label">
            <span className="contact-label-text">Name</span>
            <input
              type="text"
              name="name"
              required
              className="contact-input"
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

          <label className="contact-label">
            <span className="contact-label-text">Email</span>
            <input
              type="email"
              name="email"
              required
              className="contact-input"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="contact-label">
            <span className="contact-label-text">Message</span>
            <textarea
              name="message"
              required
              className="contact-input contact-textarea"
              rows="5"
              placeholder="What's on your mind?"
            />
          </label>

          {status === "error" && (
            <p className="contact-error">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending\u2026" : "Send message"}
            {status !== "sending" && <span className="arrow" aria-hidden="true">&#8594;</span>}
          </button>
        </form>
      )}
    </section>
  );
}

window.ContactSection = ContactSection;
