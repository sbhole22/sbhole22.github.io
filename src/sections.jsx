// Page sections
const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

// ========== LOADING SCREEN ==========
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useS(0);
  const [word, setWord] = useS(0);
  const words = ["Design", "Build", "Verify", "Ship"];

  useE(() => {
    const start = performance.now();
    const dur = 2400;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useE(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % words.length), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <div className="bg-grid-fine" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
      <div style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 10 }}>
        <LiveDot color="oklch(0.78 0.10 230)" />
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--text-dim)", textTransform: "uppercase" }}>Booting · Portfolio Build 2026.04</span>
      </div>
      <div style={{ position: "absolute", top: 28, right: 32 }}>
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>SB · Ann Arbor, MI</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, padding: "0 24px" }}>
        <div style={{ height: 90, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {words.map((w, i) => (
            <span
              key={w}
              className="font-display"
              style={{
                position: "absolute",
                fontSize: "clamp(48px, 9vw, 110px)",
                color: "var(--text)",
                opacity: i === word ? 1 : 0,
                transform: i === word ? "translateY(0)" : i < word ? "translateY(-30px)" : "translateY(30px)",
                transition: "opacity 0.4s, transform 0.4s",
                filter: i === word ? "blur(0)" : "blur(8px)",
              }}
            >
              {w}.
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 80, right: 32 }}>
        <span className="font-display tabular" style={{ fontSize: "clamp(60px, 10vw, 140px)", color: "var(--text)", lineHeight: 1 }}>
          {String(count).padStart(3, "0")}
        </span>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "oklch(0.30 0.008 240 / 0.5)" }}>
        <div className="accent-grad" style={{ height: "100%", width: "100%", transform: `scaleX(${count / 100})`, transformOrigin: "left", boxShadow: "0 0 12px oklch(0.78 0.10 230 / 0.6)", transition: "transform 0.05s linear" }} />
      </div>
    </div>
  );
};

// ========== HERO ==========
const Hero = ({ onNav, onContact }) => {
  const roles = ["RTL Designer", "Hardware Engineer", "5G PHY Architect", "GPU Systems Hacker", "Founder"];
  const [r, setR] = useS(0);
  useE(() => {
    const id = setInterval(() => setR((x) => (x + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <HeroBackdrop />
      <div className="container-px" style={{ position: "relative", zIndex: 2, maxWidth: 1200, width: "100%", paddingTop: 140, paddingBottom: 120 }}>
        <div className="blur-in" style={{ animationDelay: "0.2s" }}>
          <Eyebrow accent>Portfolio · Vol. 2026</Eyebrow>
        </div>
        <h1 className="name-reveal" style={{ fontFamily: "Inter", fontWeight: 200, fontSize: "clamp(56px, 11vw, 168px)", lineHeight: 0.92, letterSpacing: "-0.04em", margin: "32px 0 20px", color: "var(--text)" }}>
          Swapnil <br />
          <span className="font-display" style={{ color: "var(--text)" }}>Bhole</span>
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <div className="blur-in" style={{ animationDelay: "0.5s", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", marginTop: 24, marginBottom: 36 }}>
          <p style={{ fontSize: "clamp(18px, 2vw, 24px)", margin: 0, color: "var(--text-dim)", maxWidth: 640, lineHeight: 1.4 }}>
            A <span className="font-display role-fade" key={r} style={{ color: "var(--text)", fontSize: "1.05em" }}>{roles[r]}</span>{" "}
            <span style={{ color: "var(--muted)" }}>working at the seam of</span> silicon, signals, and systems<span style={{ color: "var(--accent)" }}>.</span>
          </p>
        </div>

        <div className="blur-in" style={{ animationDelay: "0.7s", maxWidth: 600 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
            Master&rsquo;s student in ECE at the University of Michigan. Six years at C-DOT designing 5G/LTE
            systems from RTL to firmware. Four IEEE publications. One commercialized patent.
          </p>
        </div>

        <div className="blur-in" style={{ animationDelay: "0.9s", display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
          <PillButton variant="solid" size="lg" onClick={() => onNav("work")}>See works</PillButton>
          <PillButton variant="outline" size="lg" onClick={onContact} arrow>Reach out</PillButton>
          <PillButton variant="ghost" size="lg" href={CONTACT.resume} target="_blank" rel="noopener" download>Download CV ↓</PillButton>
        </div>

        {/* Tech stat strip */}
        <div className="blur-in" style={{ animationDelay: "1.1s", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 1, marginTop: 80, padding: "1px", background: "var(--stroke)", borderRadius: 14, overflow: "hidden", maxWidth: 820 }}>
          {[
            { k: "BASE", v: "Ann Arbor" },
            { k: "FOCUS", v: "Hardware · RTL · ML Sys" },
            { k: "PUBS", v: "4 IEEE" },
          ].map((c) => (
            <div key={c.k} style={{ background: "var(--bg)", padding: "16px 18px" }}>
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", marginBottom: 6 }}>{c.k}</div>
              <div className="font-mono" style={{ fontSize: 13, color: "var(--text)" }}>{c.v}</div>
            </div>
          ))}
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};

// ========== PROJECT CARD ==========
const ProjectCard = ({ p, onOpen, span }) => {
  const Visual = VISUALS[p.visual] || VISUALS.rtl;
  const [hover, setHover] = useS(false);
  const aspect = span === "lg" ? "16 / 9" : span === "md" ? "4 / 3" : "1 / 1";
  return (
    <button
      onClick={() => onOpen(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "1px solid var(--stroke)",
        borderRadius: 22,
        overflow: "hidden",
        textAlign: "left",
        padding: 0,
        cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s",
        borderColor: hover ? "var(--stroke-hi)" : "var(--stroke)",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: aspect, overflow: "hidden" }}>
        <div style={{ transition: "transform 0.6s ease", transform: hover ? "scale(1.04)" : "scale(1)", position: "absolute", inset: 0 }}>
          <Visual />
        </div>
        {/* hover veil */}
        <div style={{ position: "absolute", inset: 0, background: "oklch(0.16 0.005 240 / 0.55)", backdropFilter: hover ? "blur(6px)" : "blur(0)", WebkitBackdropFilter: hover ? "blur(6px)" : "blur(0)", opacity: hover ? 1 : 0, transition: "opacity 0.3s, backdrop-filter 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="ring-grad-hover" style={{ position: "relative", padding: "10px 18px", borderRadius: 999, background: "var(--text)", color: "var(--bg)", fontSize: 13, fontWeight: 500 }}>
            View — <span className="font-display">{p.titleItalic}</span> ↗
          </div>
        </div>
        {/* corner stamp */}
        <div className="font-mono" style={{ position: "absolute", top: 14, right: 16, fontSize: 10, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--accent)" }}>●</span>{p.year}
        </div>
        <div className="font-mono" style={{ position: "absolute", top: 14, left: 16, fontSize: 10, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>
          {p.tag}
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <h3 style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 20, lineHeight: 1.25, margin: "0 0 8px", color: "var(--text)", letterSpacing: "-0.01em" }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-dim)", margin: "0 0 14px" }}>{p.summary}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.metrics.slice(0, 3).map((m) => (
            <span key={m.k} className="font-mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", border: "1px solid var(--stroke)", padding: "4px 8px", borderRadius: 4 }}>
              <span style={{ color: "var(--accent)" }}>{m.k}</span> {m.v}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

// ========== WORKS SECTION ==========
const Works = ({ onOpen }) => {
  const [filter, setFilter] = useS("all");
  const filters = [
    { id: "all", label: "All" },
    { id: "Computer Architecture", label: "Architecture" },
    { id: "GPU / ML Systems", label: "GPU / ML" },
    { id: "5G / FPGA / SoC", label: "5G / RTL" },
    { id: "Wireless / ML", label: "Wireless" },
    { id: "Embedded / IoT", label: "Embedded" },
    { id: "Founder · Semifinalist", label: "Founder" },
  ];
  const projects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  // For bento — assign spans to first 6, rest are "sm"
  const spans = ["lg", "md", "md", "lg", "sm", "sm"];

  return (
    <section id="work" style={{ background: "var(--bg)", padding: "120px 0 100px" }}>
      <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHead
          eyebrow="Selected Work · Latest First"
          title="Featured {italic}."
          italic="projects"
          sub="A working set of recent and prior work — from out-of-order RTL and CUDA kernels to 5G OpenRAN and a commercialized patent. Click any card for the full breakdown."
          action={<PillButton variant="ghost" size="md" href={CONTACT.github} target="_blank" rel="noopener" arrow>GitHub</PillButton>}
        />

        {/* Filter bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="font-mono"
              style={{
                padding: "8px 14px",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: 999,
                border: `1px solid ${filter === f.id ? "var(--text)" : "var(--stroke)"}`,
                background: filter === f.id ? "var(--text)" : "transparent",
                color: filter === f.id ? "var(--bg)" : "var(--text-dim)",
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
          {projects.map((p, i) => {
            const span = spans[i] || "sm";
            const cols = span === "lg" ? "span 7" : span === "md" ? "span 5" : "span 4";
            return (
              <div key={p.id} style={{ gridColumn: window.innerWidth < 768 ? "span 12" : cols }}>
                <ProjectCard p={p} onOpen={onOpen} span={span} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ========== PROJECT MODAL ==========
const ProjectModal = ({ p, onClose }) => {
  useE(() => {
    if (!p) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [p, onClose]);
  if (!p) return null;
  const Visual = VISUALS[p.visual] || VISUALS.rtl;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "oklch(0.10 0.005 240 / 0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "5vh 4vw", overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--stroke-hi)", borderRadius: 24, maxWidth: 980, width: "100%", overflow: "hidden", boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.7)" }}>
        <div style={{ position: "relative", aspectRatio: "16/8" }}>
          <Visual />
          <button onClick={onClose} className="font-mono" style={{ position: "absolute", top: 16, right: 16, padding: "8px 14px", borderRadius: 999, background: "oklch(0.16 0.005 240 / 0.7)", border: "1px solid var(--stroke-hi)", color: "var(--text)", fontSize: 11, letterSpacing: "0.18em" }}>CLOSE · ESC</button>
        </div>
        <div style={{ padding: "32px 36px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <Tag accent>{p.tag}</Tag>
            <Tag>{p.year}</Tag>
          </div>
          <h2 style={{ fontFamily: "Inter", fontWeight: 300, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>{p.title}</h2>
          <p style={{ fontSize: 16, color: "var(--text-dim)", lineHeight: 1.6, margin: "0 0 12px" }}>{p.summary}</p>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: "0 0 28px" }}>{p.detail}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, padding: 1, background: "var(--stroke)", borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
            {p.metrics.map((m) => (
              <div key={m.k} style={{ background: "var(--surface)", padding: "16px 18px" }}>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--muted)", marginBottom: 6 }}>{m.k}</div>
                <div className="font-display" style={{ fontSize: 22, color: "var(--text)" }}>{m.v}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", marginBottom: 10, textTransform: "uppercase" }}>Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>

          {p.link && <PillButton variant="outline" size="md" href={p.link} target="_blank" rel="noopener" arrow>View on GitHub</PillButton>}
        </div>
      </div>
    </div>
  );
};

// ========== EXPERIENCE ==========
const Experience = () => (
  <section id="experience" style={{ background: "var(--bg)", padding: "120px 0", position: "relative" }}>
    <div className="bg-grid-fine" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
    <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto", position: "relative" }}>
      <SectionHead
        eyebrow="Trajectory"
        title="A {italic} of building."
        italic="decade"
        sub="From RF & antenna research at VNIT, to six years at India's premier telecom R&D lab, to graduate work in computer architecture at Michigan."
      />
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, position: "relative" }}>
        <div style={{ position: "absolute", left: 180, top: 0, bottom: 0, width: 1, background: "var(--stroke)" }} />
        {EXPERIENCE.map((e, i) => (
          <React.Fragment key={i}>
            <div style={{ paddingTop: 28 }} className="font-mono">
              <div style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)" }}>{e.period_short}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", marginTop: 6, textTransform: "uppercase" }}>{e.where}</div>
            </div>
            <div style={{ padding: "28px 0 28px 36px", borderBottom: i < EXPERIENCE.length - 1 ? "1px solid var(--stroke)" : "none", position: "relative" }}>
              <div style={{ position: "absolute", left: -5, top: 36, width: 10, height: 10, borderRadius: 999, background: "var(--bg)", border: "2px solid var(--accent)" }} />
              <h3 style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 18, color: "var(--text)", margin: "0 0 4px" }}>{e.role}</h3>
              <div style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 12 }}>{e.org}</div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: "0 0 16px" }}>{e.detail}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {e.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

// ========== PUBLICATIONS ==========
const Publications = () => (
  <section id="publications" style={{ background: "var(--bg)", padding: "120px 0" }}>
    <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto" }}>
      <SectionHead
        eyebrow="IEEE · Peer-Reviewed"
        title="Published {italic}."
        italic="research"
        sub="Four IEEE publications spanning deep learning, channel coding, adaptive streaming, and antenna design."
      />
      <div style={{ display: "grid", gap: 1, padding: 1, background: "var(--stroke)", borderRadius: 18, overflow: "hidden" }}>
        {PUBLICATIONS.map((p, i) => (
          <a key={i} href={`https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(p.title)}`} target="_blank" rel="noopener" style={{ background: "var(--surface)", padding: "26px 28px", display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 24, alignItems: "center", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hi)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
          >
            <div className="font-display tabular" style={{ fontSize: 32, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{ fontSize: 16, color: "var(--text)", marginBottom: 4 }}>{p.title}</div>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>{p.venue} · {p.year}</div>
            </div>
            <span style={{ color: "var(--text-dim)", fontSize: 18 }}>↗</span>
          </a>
        ))}
      </div>


    </div>
  </section>
);

// ========== SKILLS ==========
const Skills = () => (
  <section id="skills" style={{ background: "var(--bg)", padding: "120px 0", position: "relative" }}>
    <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto" }}>
      <SectionHead
        eyebrow="Toolkit"
        title="Stack &amp; {italic}."
        italic="instruments"
        sub="A working list — what I reach for daily, what I've shipped, and what I'm sharpening."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
        {SKILLS.map((g, i) => (
          <div key={g.group} style={{ padding: "24px 24px 26px", border: "1px solid var(--stroke)", borderRadius: 18, background: "var(--surface)" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 6 }}>{String(i + 1).padStart(2, "0")} ·</div>
            <h3 className="font-display" style={{ fontSize: 26, color: "var(--text)", margin: "0 0 16px" }}>{g.group}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {g.items.map((it) => <Tag key={it}>{it}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ========== STATS ==========
const StatsSection = () => (
  <section style={{ background: "var(--bg)", padding: "80px 0 60px", borderTop: "1px solid var(--stroke)", borderBottom: "1px solid var(--stroke)" }}>
    <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--stroke)", paddingLeft: 22 }}>
            <div className="font-display" style={{ fontSize: "clamp(56px, 7vw, 96px)", lineHeight: 1, color: "var(--text)" }}>{s.k}</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 10 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ========== CONTACT / FOOTER ==========
const Contact = ({ onContact }) => {
  const marqueeText = "AVAILABLE FOR FULL-TIME · STEM-OPT ELIGIBLE · BUILDING IN ANN ARBOR";
  return (
    <section id="contact" style={{ background: "var(--bg)", paddingTop: 100, paddingBottom: 36, overflow: "hidden", position: "relative" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
      <div className="container-px" style={{ maxWidth: 1320, margin: "0 auto", position: "relative" }}>
        {/* Marquee */}
        <div style={{ overflow: "hidden", marginBottom: 80, mask: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)", WebkitMask: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          <div className="marquee-track" style={{ display: "flex", whiteSpace: "nowrap", gap: 48, width: "max-content" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", color: i % 2 ? "var(--text)" : "transparent", WebkitTextStroke: i % 2 ? "0" : "1px var(--stroke-hi)" }}>
                {marqueeText} ·
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <Eyebrow accent>Let&rsquo;s build</Eyebrow>
            <h2 style={{ fontFamily: "Inter", fontWeight: 200, fontSize: "clamp(48px, 8vw, 120px)", letterSpacing: "-0.03em", lineHeight: 0.98, margin: "20px 0 32px" }}>
              Have a hard <br />
              <span className="font-display">problem</span>?
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-dim)", maxWidth: 480, lineHeight: 1.6, marginBottom: 28 }}>
              Hardware design, RTL verification, signal-processing pipelines, GPU acceleration, or just want to talk shop — drop a line.
            </p>
            <PillButton variant="solid" size="lg" onClick={onContact} arrow>{CONTACT.email}</PillButton>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{ marginTop: 100, paddingTop: 28, borderTop: "1px solid var(--stroke)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LiveDot />
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--text-dim)", textTransform: "uppercase" }}>Available for full-time · Summer/Fall 2026</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <PillButton size="sm" variant="ghost" href={CONTACT.github} target="_blank" rel="noopener" arrow>GitHub</PillButton>
            <PillButton size="sm" variant="ghost" href={CONTACT.linkedin} target="_blank" rel="noopener" arrow>LinkedIn</PillButton>
            <PillButton size="sm" variant="ghost" href={CONTACT.resume} target="_blank" rel="noopener" download>Resume ↓</PillButton>
          </div>
        </div>
        <div className="font-mono" style={{ marginTop: 24, fontSize: 10, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase", textAlign: "center" }}>
          © 2026 Swapnil Bhole · Built in HTML/JS · No frameworks were harmed in the making of this site
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { LoadingScreen, Hero, Works, ProjectModal, Experience, Publications, Skills, StatsSection, Contact });
