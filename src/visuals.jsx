// Visual placeholders for project cards — abstract technical patterns, no fake AI imagery.
// Each renders into a card; designed to feel like a hardware engineer's portfolio.

const VisualBase = ({ children, label, accent = "230" }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background:
        `radial-gradient(120% 80% at 30% 0%, oklch(0.28 0.04 ${accent} / 0.6) 0%, transparent 60%), ` +
        `linear-gradient(135deg, oklch(0.18 0.01 ${accent}) 0%, oklch(0.12 0.005 ${accent}) 100%)`,
    }}
  >
    {children}
    <div className="halftone-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
    {label && (
      <div
        className="font-mono"
        style={{
          position: "absolute",
          left: 16,
          bottom: 14,
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--muted)",
          textTransform: "uppercase",
          opacity: 0.85,
        }}
      >
        <span style={{ color: "var(--accent)" }}>◆</span> {label}
      </div>
    )}
  </div>
);

const VisRTL = () => (
  <VisualBase label="rtl · pipeline">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="rtlg" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.78 0.10 230)" />
          <stop offset="1" stopColor="oklch(0.62 0.12 250)" />
        </linearGradient>
      </defs>
      {/* pipeline stages */}
      {["IF", "ID", "RN", "IS", "EX", "WB"].map((s, i) => (
        <g key={s} transform={`translate(${30 + i * 58}, 90)`}>
          <rect width="46" height="60" rx="6" fill="oklch(0.22 0.01 240)" stroke="url(#rtlg)" strokeWidth="1" />
          <text x="23" y="36" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="oklch(0.85 0.04 230)">{s}</text>
          {i < 5 && <line x1="46" y1="30" x2="58" y2="30" stroke="url(#rtlg)" strokeWidth="1.5" />}
        </g>
      ))}
      {/* dispatch lanes */}
      <g opacity="0.5">
        <path d="M 30 60 H 380" stroke="oklch(0.4 0.02 240)" strokeWidth="0.5" strokeDasharray="2 4" />
        <path d="M 30 200 H 380" stroke="oklch(0.4 0.02 240)" strokeWidth="0.5" strokeDasharray="2 4" />
      </g>
      <text x="20" y="30" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// 2-WAY OOO · R10K RENAME</text>
    </svg>
  </VisualBase>
);

const VisCUDA = () => (
  <VisualBase label="cuda · kernels" accent="260">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* grid of threads */}
      {Array.from({ length: 12 }).map((_, r) =>
        Array.from({ length: 18 }).map((_, c) => {
          const intensity = 0.18 + 0.55 * Math.exp(-((r - 6) ** 2 + (c - 9) ** 2) / 25);
          return (
            <rect
              key={`${r}-${c}`}
              x={20 + c * 20}
              y={20 + r * 16}
              width="14"
              height="10"
              fill={`oklch(${0.4 + intensity * 0.4} ${intensity * 0.15} 240)`}
              opacity={0.25 + intensity}
            />
          );
        })
      )}
      <text x="22" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// THREADBLOCK ⟨32×32⟩</text>
    </svg>
  </VisualBase>
);

const VisSpectrum = () => (
  <VisualBase label="ofdm · spectrum">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="spec" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="oklch(0.78 0.10 230 / 0.0)" />
          <stop offset="1" stopColor="oklch(0.78 0.10 230 / 0.55)" />
        </linearGradient>
      </defs>
      {/* spectrum bars */}
      {Array.from({ length: 56 }).map((_, i) => {
        const x = 20 + i * 6.6;
        const env = Math.exp(-((i - 28) ** 2) / 320) * 0.9 + 0.05;
        const noise = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * 0.06;
        const h = (env + noise) * 160;
        return <rect key={i} x={x} y={210 - h} width="4.5" height={h} fill="url(#spec)" />;
      })}
      <line x1="20" y1="210" x2="380" y2="210" stroke="oklch(0.35 0.01 240)" strokeWidth="0.5" />
      <text x="22" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// 5G NR · n78 · 100 MHz</text>
      <text x="22" y="34" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.5 0.02 240)">CF 3.5 GHz</text>
    </svg>
  </VisualBase>
);

const VisConstellation = () => (
  <VisualBase label="qam · constellation" accent="220">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* axes */}
      <line x1="200" y1="20" x2="200" y2="220" stroke="oklch(0.32 0.01 240)" strokeWidth="0.5" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="oklch(0.32 0.01 240)" strokeWidth="0.5" />
      {/* clusters: 16-QAM */}
      {[-3, -1, 1, 3].map((i) =>
        [-3, -1, 1, 3].map((q) =>
          Array.from({ length: 9 }).map((_, k) => {
            const cx = 200 + i * 32 + (Math.random() - 0.5) * 6;
            const cy = 120 - q * 32 + (Math.random() - 0.5) * 6;
            return <circle key={`${i}-${q}-${k}`} cx={cx} cy={cy} r="1.6" fill="oklch(0.78 0.10 230)" opacity="0.7" />;
          })
        )
      )}
      <text x="22" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// I/Q · 16-QAM</text>
    </svg>
  </VisualBase>
);

const VisVision = () => (
  <VisualBase label="ssd · detection" accent="240">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* fake scene grid */}
      <rect x="0" y="0" width="400" height="240" fill="oklch(0.16 0.01 240)" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={i * 33} y1="0" x2={i * 33} y2="240" stroke="oklch(0.22 0.01 240)" strokeWidth="0.5" />
      ))}
      {/* bounding boxes */}
      <g fill="none" stroke="oklch(0.78 0.10 230)" strokeWidth="1.2">
        <rect x="60" y="70" width="90" height="110" />
        <rect x="200" y="120" width="60" height="80" />
        <rect x="290" y="60" width="70" height="60" />
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.85 0.04 230)">
        <rect x="60" y="58" width="60" height="12" fill="oklch(0.78 0.10 230)" />
        <text x="63" y="67" fill="oklch(0.16 0.01 240)">person · 0.97</text>
        <rect x="200" y="108" width="48" height="12" fill="oklch(0.78 0.10 230)" />
        <text x="202" y="117" fill="oklch(0.16 0.01 240)">chair · 0.91</text>
        <rect x="290" y="48" width="42" height="12" fill="oklch(0.78 0.10 230)" />
        <text x="292" y="57" fill="oklch(0.16 0.01 240)">cup · 0.88</text>
      </g>
      <text x="14" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// VAL ACC 98.3%</text>
    </svg>
  </VisualBase>
);

const VisLattice = () => (
  <VisualBase label="mlip · lattice">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 11 }).map((_, c) => {
          const x = 30 + c * 35 + (r % 2 ? 17 : 0);
          const y = 30 + r * 28;
          if (x > 380) return null;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={x} cy={y} r="3" fill="oklch(0.78 0.10 230)" opacity="0.8" />
              {c < 10 && <line x1={x} y1={y} x2={x + 35} y2={y} stroke="oklch(0.4 0.02 240)" strokeWidth="0.4" />}
              {r < 6 && <line x1={x} y1={y} x2={x + (r % 2 ? -17 : 17)} y2={y + 28} stroke="oklch(0.4 0.02 240)" strokeWidth="0.4" />}
            </g>
          );
        })
      )}
    </svg>
  </VisualBase>
);

const VisQubit = () => (
  <VisualBase label="state tomography" accent="270">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* bloch sphere */}
      <g transform="translate(200 120)">
        <circle r="78" fill="none" stroke="oklch(0.4 0.02 240)" strokeWidth="0.6" />
        <ellipse rx="78" ry="22" fill="none" stroke="oklch(0.4 0.02 240)" strokeWidth="0.4" />
        <ellipse rx="22" ry="78" fill="none" stroke="oklch(0.4 0.02 240)" strokeWidth="0.4" />
        <line x1="-90" y1="0" x2="90" y2="0" stroke="oklch(0.32 0.01 240)" strokeWidth="0.4" />
        <line x1="0" y1="-90" x2="0" y2="90" stroke="oklch(0.32 0.01 240)" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="48" y2="-58" stroke="oklch(0.78 0.10 230)" strokeWidth="1.4" />
        <circle cx="48" cy="-58" r="4" fill="oklch(0.78 0.10 230)" />
        <text x="55" y="-60" fontFamily="JetBrains Mono" fontSize="10" fill="oklch(0.78 0.10 230)">|ψ⟩</text>
      </g>
    </svg>
  </VisualBase>
);

const VisIoT = () => (
  <VisualBase label="esp32 · telemetry">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* node */}
      <rect x="160" y="100" width="80" height="50" rx="4" fill="oklch(0.20 0.01 240)" stroke="oklch(0.78 0.10 230)" strokeWidth="1" />
      <text x="200" y="130" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="oklch(0.85 0.04 230)">ESP32</text>
      {/* radio waves */}
      {[20, 40, 60].map((r, i) => (
        <g key={r} opacity={0.5 - i * 0.12}>
          <circle cx="200" cy="125" r={50 + r} fill="none" stroke="oklch(0.78 0.10 230)" strokeWidth="0.6" strokeDasharray="3 4" />
        </g>
      ))}
      {/* sensors */}
      <circle cx="80" cy="80" r="6" fill="oklch(0.78 0.10 230 / 0.4)" stroke="oklch(0.78 0.10 230)" />
      <circle cx="320" cy="190" r="6" fill="oklch(0.78 0.10 230 / 0.4)" stroke="oklch(0.78 0.10 230)" />
      <circle cx="320" cy="60" r="6" fill="oklch(0.78 0.10 230 / 0.4)" stroke="oklch(0.78 0.10 230)" />
    </svg>
  </VisualBase>
);

const VisTrellis = () => (
  <VisualBase label="trellis · turbo">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 8 }).map((_, t) =>
        Array.from({ length: 4 }).map((_, s) => {
          const x = 40 + t * 45;
          const y = 60 + s * 40;
          return (
            <g key={`${t}-${s}`}>
              <circle cx={x} cy={y} r="3" fill="oklch(0.78 0.10 230)" />
              {t < 7 && (
                <>
                  <line x1={x} y1={y} x2={x + 45} y2={y} stroke="oklch(0.4 0.02 240)" strokeWidth="0.5" />
                  <line x1={x} y1={y} x2={x + 45} y2={y + (s < 3 ? 40 : -40)} stroke="oklch(0.4 0.02 240)" strokeWidth="0.5" />
                </>
              )}
            </g>
          );
        })
      )}
    </svg>
  </VisualBase>
);

const VisProtocol = () => (
  <VisualBase label="3gpp · stack">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {["RRC", "PDCP", "RLC", "MAC", "PHY"].map((l, i) => (
        <g key={l}>
          <rect x="40" y={32 + i * 36} width="320" height="28" rx="4" fill="oklch(0.20 0.01 240)" stroke="oklch(0.32 0.01 240)" />
          <text x="56" y={50 + i * 36} fontFamily="JetBrains Mono" fontSize="11" fill="oklch(0.85 0.04 230)">{l}</text>
          <text x="344" y={50 + i * 36} textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.55 0.02 240)">REL 9–12</text>
        </g>
      ))}
    </svg>
  </VisualBase>
);

const VisGraph = () => (
  <VisualBase label="alumni network">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const r = 70 + (i % 3) * 16;
        return { i, x: 200 + Math.cos(a) * r, y: 120 + Math.sin(a) * r };
      }).map((n, _, arr) => (
        <g key={n.i}>
          {arr.slice(0, 6).map((m) => (
            <line key={m.i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="oklch(0.32 0.02 240)" strokeWidth="0.4" />
          ))}
          <circle cx={n.x} cy={n.y} r="3.5" fill="oklch(0.78 0.10 230)" />
        </g>
      ))}
      <circle cx="200" cy="120" r="6" fill="oklch(0.92 0.04 230)" />
    </svg>
  </VisualBase>
);

const VisQR = () => (
  <VisualBase label="smart qr · indicator" accent="220">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(140 40)">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => {
            const fill = (r + c * 7 + (r * c) % 3) % 3 === 0;
            return <rect key={`${r}-${c}`} x={c * 13} y={r * 13} width="12" height="12" fill={fill ? "oklch(0.92 0.04 230)" : "oklch(0.18 0.01 240)"} />;
          })
        )}
        {/* corner markers */}
        {[[0, 0], [9, 0], [0, 9]].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <rect x={cx * 13} y={cy * 13} width="39" height="39" fill="oklch(0.92 0.04 230)" />
            <rect x={cx * 13 + 6} y={cy * 13 + 6} width="27" height="27" fill="oklch(0.18 0.01 240)" />
            <rect x={cx * 13 + 12} y={cy * 13 + 12} width="15" height="15" fill="oklch(0.92 0.04 230)" />
          </g>
        ))}
      </g>
    </svg>
  </VisualBase>
);

const VisSensor = () => (
  <VisualBase label="flow sensor · gps">
    <svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      {/* pulse train */}
      <polyline
        points={Array.from({ length: 30 }, (_, i) => `${20 + i * 12},${i % 2 ? 80 : 130}`).join(" ")}
        fill="none"
        stroke="oklch(0.78 0.10 230)"
        strokeWidth="1.4"
      />
      <text x="22" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.6 0.02 240)">// PULSE COUNT · 5 m GPS</text>
      <text x="22" y="180" fontFamily="JetBrains Mono" fontSize="11" fill="oklch(0.85 0.04 230)">42.6 L</text>
      <text x="22" y="200" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.55 0.02 240)">42.279 N · -83.732 W</text>
    </svg>
  </VisualBase>
);

const VISUALS = {
  rtl: VisRTL,
  cuda: VisCUDA,
  spectrum: VisSpectrum,
  constellation: VisConstellation,
  vision: VisVision,
  lattice: VisLattice,
  qubit: VisQubit,
  iot: VisIoT,
  trellis: VisTrellis,
  protocol: VisProtocol,
  graph: VisGraph,
  qr: VisQR,
  sensor: VisSensor,
};

window.VISUALS = VISUALS;
