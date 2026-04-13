import { ImageResponse } from "next/og";
import { getMetadataProfile } from "@/lib/server-api";
import { getSeoProfile } from "@/lib/seo";

export const revalidate = 3600;
export const alt = "Portfolio Prime social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const profile = await getMetadataProfile();
  const seo = getSeoProfile(profile);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 32%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #082f49 100%)",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#7dd3fc",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#38bdf8",
            }}
          />
          {seo.siteName}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            {seo.personName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.25,
              color: "#cbd5e1",
            }}
          >
            {seo.jobTitle} building polished Next.js and React experiences from{" "}
            {seo.location}.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#e2e8f0",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {["Next.js", "React", "SEO", "Performance"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  background: "rgba(15, 23, 42, 0.45)",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", color: "#7dd3fc", fontWeight: 700 }}>
            {seo.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
