import { ImageResponse } from "next/og";

// Apple touch icon — served as a 180×180 PNG at /apple-icon. Uses the same
// code-generated approach as opengraph-image.tsx so no binary asset is needed.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a3d91 0%, #061d45 100%)",
          color: "white",
          fontSize: 116,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -4,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
