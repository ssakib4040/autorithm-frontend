import { ImageResponse } from "next/og";

export const alt = "Autorithm - Production-Ready n8n and Make.com Automation Workflows";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, #34d399 0%, #0f172a 45%, #020617 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a7f3d0",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: "#34d399",
            }}
          />
          Autorithm
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              maxWidth: 980,
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Production-ready automation workflows for n8n and Make.com
          </div>
          <div
            style={{
              maxWidth: 920,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#cbd5e1",
            }}
          >
            Premium templates, AI automations, and proven systems built to help teams ship faster.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: 24,
            color: "#e2e8f0",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.35)",
            }}
          >
            n8n Workflows
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.35)",
            }}
          >
            Make.com Templates
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.35)",
            }}
          >
            AI Automation
          </div>
        </div>
      </div>
    ),
    size
  );
}
