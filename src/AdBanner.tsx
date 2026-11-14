
import { Box, Center, Text } from "@mantine/core";
import type { CSSProperties } from "react";
import type { AdBannerConfig } from "./AdTypes";

interface AdBannerProps {
  config: AdBannerConfig;
}

export function AdBanner({ config }: AdBannerProps) {
  const isTop = config.location === "top";
  const isSidebar = config.location === "sidebar";
  const attention = config.style === "attention-grabbing";

  const frameStyle: CSSProperties = {
    padding: attention ? 5 : 0,
    borderRadius: attention ? 4 : 10,
    background: attention
      ? "repeating-linear-gradient(135deg, #f08c00 0px, #f08c00 8px, #ffd43b 8px, #ffd43b 16px)"
      : "transparent",
    boxShadow: attention
      ? "0 5px 14px rgba(0, 0, 0, 0.18)"
      : "0 2px 8px rgba(0, 0, 0, 0.07)",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    cursor: "pointer",
    userSelect: "none",
    WebkitUserSelect: "none",
  };

  const bannerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    minHeight: isSidebar ? 250 : 90,
    padding: isSidebar ? 20 : 18,
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
      w="100%"
      maw={isSidebar ? undefined : 970}
      mx={isSidebar ? undefined : "auto"}
      style={frameStyle}
    >
      <Box style={bannerStyle}>
        {/* Dark overlay ensures readable text over any image */}
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
