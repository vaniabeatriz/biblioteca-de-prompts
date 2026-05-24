import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt =
  "Prompt Library - practical AI prompts for work, study, and everyday use";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08152f",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%"
        }}
      >
        <div
          style={{
            color: "#f4d7dc",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase"
          }}
        >
          Practical AI prompts for real work
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 0.92
            }}
          >
            Prompt Library
          </div>
          <div
            style={{
              color: "#dbe3f4",
              fontSize: 38,
              lineHeight: 1.22,
              maxWidth: 900
            }}
          >
            {siteConfig.shortDescription}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#f4d7dc",
            display: "flex",
            fontSize: 30,
            fontWeight: 800,
            gap: 16
          }}
        >
          <div
            style={{
              background: "#8f1f3f",
              borderRadius: 12,
              height: 26,
              width: 26
            }}
          />
          prompts for writing, planning, learning, meetings, and decisions
        </div>
      </div>
    ),
    size
  );
}
