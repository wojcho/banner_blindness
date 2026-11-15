import { useEffect, useState } from "react";

import type { AdBannerConfig } from "./AdTypes";

import { loadAdConfig } from "./loadAdConfig";

interface AdConfigLoaderProps {
  configName: string;
  children: (config: AdBannerConfig) => React.ReactNode;
}

export default function AdConfigLoader({
  configName,
  children,
}: AdConfigLoaderProps) {
  const [config, setConfig] =
    useState<AdBannerConfig | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchConfig() {
      setLoading(true);
      setError(null);
      setConfig(null);

      try {
        const result = await loadAdConfig(configName);

        if (!cancelled) {
          setConfig(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unknown configuration error"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchConfig();

    return () => {
      cancelled = true;
    };
  }, [configName]);

  if (loading) {
    return <div>Loading portal...</div>;
  }

  if (error || !config) {
    return (
      <div role="alert">
        Failed to load portal configuration: {error}
      </div>
    );
  }

  return <>{children(config)}</>;
}
