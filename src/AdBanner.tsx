import { Box, Center, Text } from "@mantine/core";
import type { CSSProperties } from "react";
import type { AdBannerConfig } from "./AdTypes";

interface AdBannerProps {
  config: AdBannerConfig;
}

export function AdBanner({ config }: AdBannerProps) {
  const attention = config.style === "attention-grabbing";

  const isSidebar = config.location === "sidebar";

  const frameStyle: CSSProperties = {
    width: isSidebar ? 160 : "100%",
    maxWidth: isSidebar ? 160 : 970,
    padding: attention ? 5 : 0,
    borderRadius: attention ? 4 : 10,
    background: attention
      ? "repeating-linear-gradient(135deg, #f08c00 0px, #f08c00 8px, #ffd43b 8px, #ffd43b 16px)"
      : "transparent",
    boxShadow: attention
      ? "0 5px 14px rgba(0, 0, 0, 0.18)"
      : "0 2px 8px rgba(0, 0, 0, 0.07)",
    cursor: "pointer",
    userSelect: "none",
  };

  const bannerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: isSidebar ? 600 : 90,
    minHeight: isSidebar ? 600 : 90,
    padding: isSidebar ? 12 : 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: attention ? 2 : 7,
    backgroundColor: attention ? "#252525" : "#f1f3f5",
    backgroundImage: config.backgroundUrl
      ? `url("${config.backgroundUrl}")`
      : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };


  return (
    <Box
      data-ad-location={config.location}
      data-ad-style={config.style}
      style={frameStyle}
    >
      <Box style={bannerStyle}>
        <Box
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: attention
              ? "linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.42))"
              : "rgba(0,0,0,.18)",
            pointerEvents: "none",
          }}
        />

        <Center
          style={{
            position: "relative",
            zIndex: 1,
            gap: 10,
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          {config.icon && (
            <Box
              style={{
                color: attention ? "#ffd43b" : "#495057",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {config.icon}
            </Box>
          )}

          <Text
            fw={attention ? 800 : 500}
            size={isSidebar ? "sm" : "md"}
            c={attention ? "white" : "dark"}
            style={{
              textShadow: attention
                ? "0 2px 5px rgba(0,0,0,.7)"
                : undefined,
              lineHeight: 1.4,
            }}
          >
            {config.content}
          </Text>

          {attention && (
            <Text
              size="xs"
              fw={800}
              c="#252525"
              tt="uppercase"
              style={{
                background: "#ffd43b",
                padding: "6px 14px",
                borderRadius: 3,
                letterSpacing: "0.08em",
                boxShadow: "0 2px 5px rgba(0,0,0,.25)",
              }}
            >
              Discover more →
            </Text>
          )}
        </Center>
      </Box>
    </Box>
  );
}

export default AdBanner;
