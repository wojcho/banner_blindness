export type AdBannerLocation =
  | "top"
  | "sidebar"
  | "other";

export type AdBannerStyle =
  | "attention-grabbing"
  | "nondescript";

export interface AdBannerConfig {
  location: AdBannerLocation;
  style: AdBannerStyle;
  content: string;
  backgroundUrl?: string;
  icon?: React.ReactNode;
}

export interface AdBannerConfigSerialized {
  location: AdBannerLocation;
  style: AdBannerStyle;
  content: string;
  backgroundUrl?: string;
  icon?: string;
}
