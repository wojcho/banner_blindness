import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Anchor,
  Button,
  Code,
  CopyButton,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const adConfigIds: string[] = [
  "error",
  "generic",
  "advert",
  "pigeon",
  "face",
  "captcha",
  "technology",
  "clothes",
  "biology",
  "history",
  "nature",
  "landmarks",
  "politics",
  "finance",
  
  "error-sidebar",
  "generic-sidebar",
  "advert-sidebar",
  "pigeon-sidebar",
  "face-sidebar",
  "captcha-sidebar",
  "technology-sidebar",
  "clothes-sidebar",
  "biology-sidebar",
  "history-sidebar",
  "nature-sidebar",
  "landmarks-sidebar",
  "politics-sidebar",
  "finance-sidebar",
];

const portals = [
  { value: "captcha", label: "Captcha" },
  { value: "encyclopedia", label: "Encyclopedia" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "newspaper", label: "Newspaper" },
  { value: "gallery", label: "Gallery" },
];

type PortalType =
  | "captcha"
  | "encyclopedia"
  | "ecommerce"
  | "newspaper"
  | "gallery";

const portalConfigIds: Record<PortalType, string[]> = {
  captcha: [],
  encyclopedia: ["basic", "biology", "history"],
  ecommerce: ["basic", "technology", "clothes"],
  newspaper: ["basic", "politics", "finance"],
  gallery: ["basic", "nature", "landmarks"],
};

export function LinkWizard() {
  const [portal, setPortal] = useState<PortalType | null>(null);
  const [portalConfigId, setPortalConfigId] = useState<string | null>(null);
  const [adConfigId, setAdConfigId] = useState<string | null>(null);

  const availablePortalConfigs = portal
    ? portalConfigIds[portal] ?? []
    : [];

  const isCaptcha = portal === "captcha";

  const generatedUrl =
    portal && adConfigId
      ? portal === "captcha"
        ? `/captcha/${adConfigId}`
        : portalConfigId
          ? `/${portal}/${adConfigId}/${portalConfigId}`
          : null
      : null;

  function handlePortalChange(value: string | null) {
    setPortal(value as PortalType | null);
    setPortalConfigId(null);
  }

  return (
    <Stack
      maw={520}
      mx="auto"
      my="xl"
      p="md"
      gap="lg"
    >
      <Stack gap={4}>
        <Title order={2}>Portal Link Wizard</Title>
        <Text c="dimmed" size="sm">
          Configure your portal and advertisement to generate a link.
        </Text>
      </Stack>

      <Paper withBorder radius="md" p="lg">
        <Stack gap="md">
          <Select
            label="Portal"
            placeholder="Choose a portal"
            data={portals}
            value={portal}
            onChange={handlePortalChange}
            searchable
            clearable
            nothingFoundMessage="No portals found"
            required
          />

          {!isCaptcha && (
            <Select
              label="Portal configuration"
              placeholder={
                !portal
                  ? "Choose a portal first"
                  : "Choose a portal configuration"
              }
              data={availablePortalConfigs}
              value={portalConfigId}
              onChange={setPortalConfigId}
              disabled={!portal}
              searchable
              clearable
              required
            />
          )}

          <Select
            label="Advertisement configuration"
            placeholder="Choose an advertisement configuration"
            data={adConfigIds}
            value={adConfigId}
            onChange={setAdConfigId}
            searchable
            clearable
            required
          />
        </Stack>
      </Paper>

      {generatedUrl && (
        <Paper withBorder radius="md" p="lg">
          <Stack gap="sm">
            <Text fw={600}>Generated link</Text>

            <Code block>{generatedUrl}</Code>

            <Group justify="space-between">
              <CopyButton value={generatedUrl}>
                {({ copied, copy }) => (
                  <Button
                    variant="light"
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                  >
                    {copied ? "Copied!" : "Copy link"}
                  </Button>
                )}
              </CopyButton>

              <Anchor
                component={Link}
                to={generatedUrl}
                fw={600}
              >
                Open portal →
              </Anchor>
            </Group>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}

export default LinkWizard;
