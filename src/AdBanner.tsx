import { Box, Center, Text } from "@mantine/core";
import type { CSSProperties } from "react";
import type { AdBannerConfig } from "./AdTypes";

interface AdBannerProps {
  config: AdBannerConfig;
}

export function AdBanner({ config }: AdBannerProps) {
  const isTop = config.location === "top";
  const isSidebar = config.location === "sidebar";

  const attention =
    config.style === "attention-grabbing";

  const backgroundStyle: CSSProperties = {
    backgroundImage: config.backgroundUrl
      ? `url("${config.backgroundUrl}")`
      : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: attention ? "#fff3bf" : "#f1f3f5",
    border: attention
      ? "2px solid #f08c00"
      : "1px solid #dee2e6",
    borderRadius: 8,
    padding: isSidebar ? 20 : 14,
    minHeight: isSidebar ? 250 : 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <Box
      data-ad-location={config.location}
      data-ad-style={config.style}
      w={
        isSidebar
          ? "100%"
          : isTop
            ? "100%"
            : undefined
      }
      maw={isSidebar ? undefined : 970}
      mx={isSidebar ? undefined : "auto"}
      style={backgroundStyle}
    >
      <Center style={{ gap: 10, flexDirection: "column" }}>
        {config.icon && (
          <Box>{config.icon}</Box>
        )}

        <Text
          fw={attention ? 800 : 500}
          size={isSidebar ? "sm" : "md"}
          c="dark"
        >
          {config.content}
        </Text>
      </Center>
    </Box>
  );
}

export default AdBanner;
