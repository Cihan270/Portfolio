import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared editorial Open Graph card. */
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const steps = ["Business", "Analysis", "Technology", "Change"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f0ea",
          color: "#15223f",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#5d6880", letterSpacing: 2 }}>
          <span>{eyebrow.toUpperCase()}</span>
          <span>{site.name.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#3c4a66", maxWidth: 1000, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", borderTop: "2px solid #15223f", paddingTop: 24, fontSize: 22 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: i === steps.length - 1 ? "#0d1729" : "#15223f" }}>{s}</span>
              {i < steps.length - 1 && <span style={{ margin: "0 20px", color: "#7d879e" }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
