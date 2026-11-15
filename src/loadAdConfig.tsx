import {
  MegaphoneIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  ImageIcon,
} from "@phosphor-icons/react";

import type {
  AdBannerConfig,
  AdBannerConfigSerialized,
} from "./AdTypes";

const iconMap = {
  MegaphoneIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  ImageIcon,
} as const;

type IconName = keyof typeof iconMap;

function isIconName(name: string): name is IconName {
  return name in iconMap;
}

function isValidAdConfig(
  value: unknown
): value is AdBannerConfigSerialized {
  if (!value || typeof value !== "object") {
    return false;
  }

  const config = value as Record<string, unknown>;

  return (
    ["top", "sidebar", "other"].includes(
      config.location as string
    ) &&
    ["attention-grabbing", "nondescript"].includes(
      config.style as string
    ) &&
    typeof config.content === "string" &&
    (config.backgroundUrl === undefined ||
      typeof config.backgroundUrl === "string") &&
    (config.icon === undefined ||
      typeof config.icon === "string")
  );
}

export async function loadAdConfig(
  name: string
): Promise<AdBannerConfig> {
  // Prevent path traversal and unexpected filenames.
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error("Invalid ad configuration name");
  }

  const response = await fetch(
    `/ad-config/${encodeURIComponent(name)}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load ad configuration: ${name}`
    );
  }

  const data: unknown = await response.json();

  if (!isValidAdConfig(data)) {
    throw new Error("Invalid ad configuration format");
  }

  const serialized = data;

  let icon = undefined;

  if (serialized.icon && isIconName(serialized.icon)) {
    const Icon = iconMap[serialized.icon];
    icon = <Icon size={28} />;
  }

  return {
    ...serialized,
    icon,
  };
}

