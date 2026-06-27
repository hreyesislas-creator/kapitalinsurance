import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Better Insurance for Less in Hialeah, FL`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a3d91 0%, #061d45 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#1d47e0,#0a3d91)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              border: "2px solid rgba(255,255,255,0.25)",
            }}
          >
            K
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            Kapital Insurance Group
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Save More.
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Stay Protected.
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 32, color: "rgba(255,255,255,0.82)" }}>
            Better insurance for less — Hialeah, FL.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div
            style={{
              background: "#e01933",
              color: "white",
              padding: "14px 32px",
              borderRadius: 999,
              fontWeight: 700,
            }}
          >
            Get a Free Quote
          </div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{site.phone.display}</div>
        </div>
      </div>
    ),
    size,
  );
}
