
import { useEffect, useState } from "react";

import type {
  PortalType,
  PortalConfigMap,
} from "./PortalTypes";

import { loadPortalConfig } from "./loadPortalConfig";

interface PortalConfigLoaderProps<
  K extends PortalType
> {
  portalType: K;
  configId: string;
  children: (
    config: PortalConfigMap[K]
  ) => React.ReactNode;
}

export default function PortalConfigLoader<
  K extends PortalType
>({
  portalType,
  configId,
  children,
}: PortalConfigLoaderProps<K>) {
  const [config, setConfig] =
    useState<PortalConfigMap[K] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchConfig() {
      setLoading(true);
      setError(null);
      setConfig(null);

      try {
        const result = await loadPortalConfig(
          portalType,
          configId
        );

        if (!cancelled) {
          setConfig(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unknown portal configuration error"
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
  }, [portalType, configId]);

  if (loading) {
    return <div>Loading portal configuration...</div>;
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
