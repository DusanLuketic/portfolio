import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dusan Luketic | Senior Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: "#0066FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "white", fontSize: 32, fontWeight: 700 }}>DL</span>
        </div>
        <h1
          style={{
            color: "#f5f5f5",
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          Dusan Luketic
        </h1>
        <p
          style={{
            color: "#737373",
            fontSize: 28,
            margin: "16px 0 0",
            fontWeight: 400,
          }}
        >
          Senior Frontend Developer
        </p>
      </div>
    ),
    size,
  );
}
