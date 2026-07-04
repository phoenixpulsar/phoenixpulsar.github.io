/* ============================================================
   Phoenix Pulsar — Contact / "transmit a signal"
   Formspree-backed. Replace PP_FORMSPREE_ID with your form id
   from https://formspree.io/forms (looks like "mabcdxyz").
   ============================================================ */
const { useState: useStateC, useRef: useRefC } = React;

window.PP_FORMSPREE_ID = "mzdlylyy";

function ContactSection({ onDone }) {
  const [status, setStatus] = useStateC("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useStateC("");
  const formRef = useRefC(null);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const form = formRef.current;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${window.PP_FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const j = await res.json().catch(() => null);
        setErrMsg((j && j.errors && j.errors.map((x) => x.message).join(", ")) || "Transmission failed. Try again.");
        setStatus("error");
      }
    } catch (err) {
      setErrMsg("No route to host. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="ct-sent">
        <Pulsar size={40} />
        <h3>Signal received.</h3>
        <p>Your message is on the wire. I read everything — expect a reply on the return path.</p>
        <div className="ct-sent-actions">
          <button type="button" className="ct-again" onClick={() => setStatus("idle")}>Send another</button>
          {onDone && <button type="button" className="ct-back" onClick={onDone}>Back to the hub</button>}
        </div>
      </div>
    );
  }

  return (
    <form className="ct-form" ref={formRef} onSubmit={onSubmit} noValidate={false}>
      <p className="ct-lead">Have a project, a strange idea, or friction worth cutting open? Transmit a signal.</p>

      <div className="ct-grid">
        <label className="ct-field">
          <span className="ct-label">Name</span>
          <input className="ct-input" type="text" name="name" autoComplete="name" required placeholder="Ada Lovelace" />
        </label>
        <label className="ct-field">
          <span className="ct-label">Return path · email</span>
          <input className="ct-input" type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
      </div>

      <label className="ct-field">
        <span className="ct-label">Message</span>
        <textarea className="ct-input ct-area" name="message" rows="6" required placeholder="What should exist that doesn't yet?"></textarea>
      </label>

      {/* honeypot — humans never see this */}
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />

      <div className="ct-actions">
        <button className="ct-send" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Transmitting…" : "Transmit"} <span aria-hidden>→</span>
        </button>
        {status === "error" && <span className="ct-err" role="alert">{errMsg}</span>}
      </div>
    </form>
  );
}

window.ContactSection = ContactSection;
