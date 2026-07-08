import HeroReveal from "./hero-reveal";
import CubeSceneLazy from "./cube-scene-lazy";
import Reveal from "./reveal";
import type { Stat } from "@/lib/portfolio";

export default function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
      <HeroReveal>
        <div
          style={{
            width: "100%",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "80px 24px 60px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              data-hero-item
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "6px 14px",
                marginBottom: 26,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#28c840",
                }}
              />
              Available for work · Front-end Specialist
            </div>
            <h1
              data-hero-item
              style={{
                fontFamily: "var(--font-merienda), cursive",
                fontWeight: 900,
                fontSize: 60,
                lineHeight: 1.05,
                margin: "0 0 20px",
                letterSpacing: "-.5px",
              }}
            >
              Amir Abdulkarim
              <br />
              <span style={{ color: "var(--accent)" }}>Jabbar</span>
            </h1>
            <p
              data-hero-item
              style={{
                fontSize: 15,
                color: "var(--muted)",
                maxWidth: 520,
                lineHeight: 1.7,
                margin: "0 auto 32px",
              }}
            >
              Front-end-focused Full Stack Developer with 3 years of
              experience turning ideas and designs into clean, fast,
              dependable web products — from large-scale government
              dashboards to real-time SaaS used by hundreds of thousands.
            </p>
            <div
              data-hero-item
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href="#work"
                style={{
                  background: "color-mix(in srgb, var(--accent) 80%, black)",
                  color: "#fff",
                  padding: "13px 24px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                View work →
              </a>
              <a
                href="#contact"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                  padding: "13px 24px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* 3D cube visual */}
          <div
            data-hero-item
            aria-hidden="true"
            style={{
              position: "relative",
              width: "min(420px, 100%)",
              maxHeight: 480,
              aspectRatio: "1 / 1",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 62%)",
                filter: "blur(18px)",
                animation: "glowpulse 6s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                animation: "floaty 7s ease-in-out infinite",
              }}
            >
              <CubeSceneLazy />
            </div>
          </div>
        </div>
      </HeroReveal>

      <Reveal>
        <div
          style={{
            width: "100%",
            maxWidth: 1120,
            margin: "40px auto 0",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            gap: 16,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "var(--panel)",
                padding: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-merienda), cursive",
                  fontWeight: 700,
                  fontSize: 30,
                  color: "var(--accent)",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      </div>
    </section>
  );
}
