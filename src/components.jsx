// Reusable building blocks
const { useState, useEffect, useRef, useMemo } = React;

const Eyebrow = ({ children, accent = false }) => (
  <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: accent ? "var(--accent)" : "var(--muted)" }}>
    <span style={{ width: 28, height: 1, background: accent ? "var(--accent)" : "var(--stroke-hi)" }} />
    {children}
  </div>
);

const SectionHead = ({ eyebrow, title, italic, sub, action }) => {
  // title is the rendered string with {italic} as the italic word
  const parts = title.split("{italic}");
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
      <div style={{ maxWidth: 720 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: "Inter", fontWeight: 300, fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "20px 0 16px", color: "var(--text)" }}>
          {parts[0]}
          <span className="font-display" style={{ fontSize: "1.05em", color: "var(--accent)" }}>{italic}</span>
          {parts[1]}
        </h2>
        {sub && <p style={{ color: "var(--text-dim)", fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
};

const PillButton = ({ children, href, onClick, variant = "outline", size = "md", arrow = false, target, rel, download }) => {
  const sizes = {
    sm: { px: 14, py: 7, fs: 12 },
    md: { px: 22, py: 12, fs: 13 },
    lg: { px: 28, py: 14, fs: 14 },
  };
  const s = sizes[size];
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: `${s.py}px ${s.px}px`,
    fontSize: s.fs,
    fontWeight: 500,
    borderRadius: 999,
    transition: "transform 0.25s ease, color 0.25s, background 0.25s",
    whiteSpace: "nowrap",
    fontFamily: "Inter",
  };
  const variants = {
    solid: { background: "var(--text)", color: "var(--bg)", border: "1px solid var(--text)" },
    outline: { background: "transparent", color: "var(--text)", border: "1px solid var(--stroke-hi)" },
    ghost: { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--stroke)" },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      className="ring-grad-hover"
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      download={download}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
      {arrow && <span style={{ fontSize: "0.95em" }}>↗</span>}
    </Tag>
  );
};

const Tag = ({ children, accent = false }) => (
  <span
    className="font-mono"
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 10px",
      fontSize: 10.5,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      borderRadius: 6,
      border: `1px solid ${accent ? "oklch(0.78 0.10 230 / 0.4)" : "var(--stroke-hi)"}`,
      color: accent ? "var(--accent)" : "var(--text-dim)",
      background: accent ? "oklch(0.78 0.10 230 / 0.06)" : "transparent",
    }}
  >
    {children}
  </span>
);

const LiveDot = ({ color = "rgb(74,222,128)" }) => (
  <span
    className="pulse-dot"
    style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: color }}
  />
);

const Logo = () => (
  <div style={{ position: "relative", width: 36, height: 36, borderRadius: 999, padding: 1.5 }} className="accent-grad">
    <div style={{ width: "100%", height: "100%", borderRadius: 999, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="font-display" style={{ fontSize: 14, color: "var(--text)" }}>SB</span>
    </div>
  </div>
);

const Navbar = ({ onNav, active, onContact }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "publications", label: "Publications" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", paddingTop: 18, padding: "18px 16px 0" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 6px",
          borderRadius: 999,
          border: "1px solid oklch(1 0 0 / 0.07)",
          background: "oklch(0.16 0.005 240 / 0.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 10px 40px -10px oklch(0 0 0 / 0.5)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <button onClick={() => onNav("home")} style={{ background: "none", border: "none", padding: 2, marginLeft: 2, marginRight: 4 }}>
          <Logo />
        </button>
        <span style={{ width: 1, height: 22, background: "var(--stroke)" }} />
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onNav(it.id)}
            style={{
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 999,
              border: "none",
              color: active === it.id ? "var(--text)" : "var(--text-dim)",
              background: active === it.id ? "oklch(0.30 0.008 240 / 0.6)" : "transparent",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { if (active !== it.id) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "oklch(0.30 0.008 240 / 0.4)"; } }}
            onMouseLeave={(e) => { if (active !== it.id) { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; } }}
          >
            {it.label}
          </button>
        ))}
        <span style={{ width: 1, height: 22, background: "var(--stroke)" }} />
        <a href={CONTACT.github} target="_blank" rel="noopener" style={{ padding: "8px 14px", fontSize: 13, fontWeight: 500, borderRadius: 999, color: "var(--text-dim)", transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "oklch(0.30 0.008 240 / 0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; }}>GitHub</a>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener" style={{ padding: "8px 14px", fontSize: 13, fontWeight: 500, borderRadius: 999, color: "var(--text-dim)", transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "oklch(0.30 0.008 240 / 0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; }}>LinkedIn</a>
        <a href={CONTACT.resume} target="_blank" rel="noopener" style={{ padding: "8px 14px", fontSize: 13, fontWeight: 500, borderRadius: 999, color: "var(--text-dim)", transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "oklch(0.30 0.008 240 / 0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; }}>Resume</a>
        <span style={{ width: 1, height: 22, background: "var(--stroke)" }} />
        <PillButton size="sm" onClick={onContact} arrow>Say hi</PillButton>
      </div>
    </div>
  );
};

const ScrollIndicator = () => (
  <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 4 }}>
    <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)" }}>SCROLL</span>
    <div style={{ width: 1, height: 40, background: "var(--stroke)", overflow: "hidden", position: "relative" }}>
      <div className="scroll-down-line accent-grad" style={{ position: "absolute", inset: 0, width: "100%", height: "30%" }} />
    </div>
  </div>
);

// HERO BACKGROUND — original animated waveform/grid (no copyrighted video)
const HeroBackdrop = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      // grid
      ctx.strokeStyle = "rgba(80, 90, 110, 0.10)";
      ctx.lineWidth = 1;
      const gs = 60 * dpr;
      for (let x = 0; x < w; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      // multiple sine waves drifting
      const waves = [
        { amp: 60, freq: 0.004, speed: 0.6, alpha: 0.35, hue: 230 },
        { amp: 90, freq: 0.0025, speed: 0.4, alpha: 0.22, hue: 240 },
        { amp: 40, freq: 0.008, speed: 1.0, alpha: 0.18, hue: 220 },
      ];
      for (const wv of waves) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * wv.freq + t * wv.speed) * wv.amp * dpr
                  + Math.sin(x * wv.freq * 2.3 + t * wv.speed * 1.4) * wv.amp * 0.3 * dpr;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `oklch(0.78 0.10 ${wv.hue} / 0)`);
        grad.addColorStop(0.5, `oklch(0.78 0.10 ${wv.hue} / ${wv.alpha})`);
        grad.addColorStop(1, `oklch(0.78 0.10 ${wv.hue} / 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4 * dpr;
        ctx.stroke();
      }
      t += 0.012;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />
      {/* radial vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 50% 40%, transparent 0%, oklch(0.16 0.005 240 / 0.7) 70%, var(--bg) 100%)" }} />
      {/* bottom fade */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 240, background: "linear-gradient(to top, var(--bg), transparent)" }} />
    </div>
  );
};

Object.assign(window, { Eyebrow, SectionHead, PillButton, Tag, LiveDot, Logo, Navbar, ScrollIndicator, HeroBackdrop });
