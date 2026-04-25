// Contact form modal — uses Formspree for email delivery (no backend needed).
const { useState: cState, useEffect: cEffect } = React;

// Replace this endpoint with the user's Formspree form ID (they create one at formspree.io)
// The placeholder uses a generic endpoint that prompts setup on first submit.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwybjzr"; // <-- swap with your own form ID

const ContactModal = ({ open, onClose }) => {
  const [name, setName] = cState("");
  const [email, setEmail] = cState("");
  const [message, setMessage] = cState("");
  const [status, setStatus] = cState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = cState("");

  cEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  cEffect(() => {
    if (!open) {
      // reset on close
      setTimeout(() => { setName(""); setEmail(""); setMessage(""); setStatus("idle"); setErrMsg(""); }, 250);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
          _replyto: email,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Form endpoint not configured. Use the email link below.");
      }
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Could not send. Please email directly.");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-2)",
    border: "1px solid var(--stroke)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--text)",
    fontFamily: "Inter",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle = { display: "block", fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 300, background: "oklch(0.10 0.005 240 / 0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "5vh 4vw", overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--stroke-hi)", borderRadius: 24, maxWidth: 560, width: "100%", overflow: "hidden", boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.7)" }}>
        <div style={{ padding: "28px 32px 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <Eyebrow accent>Direct Line</Eyebrow>
            <h2 style={{ fontFamily: "Inter", fontWeight: 300, fontSize: 32, letterSpacing: "-0.02em", margin: "12px 0 6px" }}>
              Say <span className="font-display" style={{ color: "var(--accent)" }}>hi</span>.
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-dim)", margin: 0 }}>I read everything. I&rsquo;ll reply within 48 hours.</p>
          </div>
          <button onClick={onClose} className="font-mono" style={{ padding: "6px 12px", borderRadius: 999, background: "transparent", border: "1px solid var(--stroke-hi)", color: "var(--text-dim)", fontSize: 10, letterSpacing: "0.2em" }}>ESC</button>
        </div>

        {status === "success" ? (
          <div style={{ padding: "12px 32px 36px", textAlign: "center" }}>
            <div style={{ margin: "24px auto 16px", width: 64, height: 64, borderRadius: 999, background: "oklch(0.78 0.10 230 / 0.12)", border: "1px solid oklch(0.78 0.10 230 / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: 30 }}>✓</div>
            <h3 className="font-display" style={{ fontSize: 28, color: "var(--text)", margin: "0 0 8px" }}>Message sent.</h3>
            <p style={{ fontSize: 14, color: "var(--text-dim)", margin: "0 0 24px" }}>Thanks, {name.split(" ")[0]}. I&rsquo;ll get back to you soon.</p>
            <PillButton variant="outline" size="md" onClick={onClose}>Close</PillButton>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: "16px 32px 32px" }}>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle} htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--stroke)")}
                required
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle} htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--stroke)")}
                required
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle} htmlFor="cf-msg">Message</label>
              <textarea
                id="cf-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on?"
                rows={5}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "Inter" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--stroke)")}
                required
              />
            </div>

            {status === "error" && (
              <div className="font-mono" style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "oklch(0.30 0.10 30 / 0.15)", border: "1px solid oklch(0.60 0.15 30 / 0.4)", color: "oklch(0.85 0.10 30)", fontSize: 11, letterSpacing: "0.05em" }}>
                {errMsg} — or email <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>{CONTACT.email}</a> directly.
              </div>
            )}

            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="ring-grad-hover"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 24px",
                  fontSize: 13, fontWeight: 500,
                  borderRadius: 999,
                  background: "var(--text)", color: "var(--bg)", border: "1px solid var(--text)",
                  fontFamily: "Inter",
                  opacity: status === "sending" ? 0.6 : 1,
                  cursor: status === "sending" ? "wait" : "pointer",
                  transition: "transform 0.25s ease",
                }}
              >
                {status === "sending" ? "Sending…" : "Send message"} <span style={{ fontSize: "0.95em" }}>↗</span>
              </button>
              <a
                href={`mailto:${CONTACT.email}?subject=Portfolio%20message%20from%20${encodeURIComponent(name || "you")}&body=${encodeURIComponent(message)}`}
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-dim)", textDecoration: "underline", textUnderlineOffset: 4 }}
              >
                Or email directly
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

window.ContactModal = ContactModal;
