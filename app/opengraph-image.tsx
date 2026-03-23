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
            "radial-gradient(circle at top left, rgba(56, 189, 248, 0.16) 0%, rgba(15, 23, 42, 0.94) 34%, #020617 72%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 34%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(59, 130, 246, 0.10)",
            filter: "blur(12px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e2e8f0",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
              boxShadow: "0 0 24px rgba(56, 189, 248, 0.35)",
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
              color: "#94a3b8",
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
              border: "1px solid rgba(148,163,184,0.28)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.72)",
            }}
          >
            n8n Workflows
          </div>
          <div
            style={{
              border: "1px solid rgba(148,163,184,0.28)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.72)",
            }}
          >
            Make.com Templates
          </div>
          <div
            style={{
              border: "1px solid rgba(148,163,184,0.28)",
              borderRadius: 9999,
              padding: "12px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.72)",
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
