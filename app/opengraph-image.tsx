import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data/nav";

export const alt = "Clinic Genie. Strategies for specialist clinic growth in Singapore.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #062D36 0%, #0B4652 55%, #083C47 100%)",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "linear-gradient(135deg, #18C4D9 0%, #78E2DD 100%)",
            }}
          />
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#EAFBFB",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Strategies for specialist growth
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#C9E4EA",
              lineHeight: 1.35,
            }}
          >
            Healthcare SEO, medical SEM, clinic websites, and compliance-aware marketing for
            specialist clinics in Singapore.
          </span>
        </div>

        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#78E2DD",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          clinic-genie.com
        </span>
      </div>
    ),
    { ...size }
  );
}
