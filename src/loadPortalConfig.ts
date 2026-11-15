import type {
  PortalType,
  PortalConfigMap,
} from "./PortalTypes";

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

const validators = {
  encyclopedia: (value: unknown) =>
    isObject(value) &&
    Array.isArray(value.articles) &&
    typeof value.initialArticleId === "string" &&
    typeof value.targetArticleId === "string",

  ecommerce: (value: unknown) =>
    isObject(value) &&
    Array.isArray(value.products) &&
    typeof value.targetProductId === "number",

  newspaper: (value: unknown) =>
    isObject(value) &&
    Array.isArray(value.articles) &&
    typeof value.targetArticleId === "number",

  gallery: (value: unknown) =>
    isObject(value) &&
    Array.isArray(value.photos) &&
    typeof value.targetPhotoId === "string",
} satisfies Record<PortalType, (value: unknown) => boolean>;

export async function loadPortalConfig<
  K extends PortalType
>(
  portalType: K,
  configId: string
): Promise<PortalConfigMap[K]> {
  if (!/^[a-zA-Z0-9_-]+$/.test(configId)) {
    throw new Error("Invalid portal configuration ID");
  }

  const response = await fetch(
    `/portal-config/${portalType}/${encodeURIComponent(configId)}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load ${portalType} configuration: ${configId}`
    );
  }

  const data: unknown = await response.json();

  if (!validators[portalType](data)) {
    throw new Error(
      `Invalid ${portalType} configuration format`
    );
  }

  return data as PortalConfigMap[K];
}
