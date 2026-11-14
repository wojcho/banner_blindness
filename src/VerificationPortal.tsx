import { useState } from "react";
import {
  Box,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Popover,
} from "@mantine/core";
import {
  CheckIcon,
  CloudIcon,
  LockIcon,
  CircleIcon,
} from "@phosphor-icons/react";

import { SliderCaptcha } from "./SliderCaptcha";
import type { AdBannerConfig } from "./AdTypes";
import { AdBanner } from "./AdBanner";

interface VerificationPortalProps {
  onVerified?: () => void;
  adBanner?: AdBannerConfig;
}

export function VerificationPortal({
  onVerified,
  adBanner,
}: VerificationPortalProps) {
  const [verified, setVerified] = useState(false);
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleSuccess = () => {
    setTimeout(() => {
      setVerified(true);
      onVerified?.();
    }, 1000);
  };

  const footerLinkStyle = {
    cursor: "pointer",
    userSelect: "none" as const,
  };

  const renderPopup = (label: string) => (
    <Popover
      opened={activePopup === label}
      onChange={(opened) =>
        setActivePopup(opened ? label : null)
      }
      position="top"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Text
          size="xs"
          c="dimmed"
          style={footerLinkStyle}
          onClick={() =>
            setActivePopup(
              activePopup === label ? null : label
            )
          }
        >
          {label}
        </Text>
      </Popover.Target>

      <Popover.Dropdown>
        <Text size="sm">There is nothing here.</Text>
      </Popover.Dropdown>
    </Popover>
  );

  return (
    <Center mih="100vh" bg="#f7f7f7" p="md">
      <Paper
        w="100%"
        maw={420}
        p="xl"
        radius="md"
        withBorder
        shadow="sm"
        style={{
          borderColor: "#e5e7eb",
          background: "#fff",
        }}
      >
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <Group gap={8}>
              <ThemeIcon
                size={34}
                radius="sm"
                variant="light"
                color="blue"
              >
                <CloudIcon size={23} />
              </ThemeIcon>

              <Text fw={700} size="lg" c="#303030">
                Seqritron KFT
              </Text>
            </Group>

            <LockIcon size={20} color="#888" />
          </Group>

          {adBanner && (
            <AdBanner config={adBanner} />
          )}


          <Box>
            <Text fw={600} size="lg" c="#222">
              {verified
                ? "Verification complete"
                : "Verify you are human"}
            </Text>

            <Text size="sm" c="dimmed" mt={5}>
              {verified
                ? "Your browser has been verified successfully."
                : "Please complete the following challenge to continue."}
            </Text>
          </Box>

          {/* Verification area */}
          <Box
            p="md"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              background: "#fafafa",
            }}
          >
            {verified ? (
              <Group gap="sm">
                <ThemeIcon color="green" radius="xl">
                  <CheckIcon size={18} />
                </ThemeIcon>

                <Box>
                  <Text fw={600} size="sm" c="green">
                    Success!
                  </Text>
                  <Text size="xs" c="dimmed">
                    You have passed the verification.
                  </Text>
                </Box>
              </Group>
            ) : (
              <SliderCaptcha onSuccess={handleSuccess} />
            )}
          </Box>

          {/* Footer */}
          <Group justify="space-between" align="center">
            <Text size="xs" c="dimmed">
              Performance & security
              <br />
              powered by Seqritron KFT
            </Text>

            <Group gap={6}>
              {renderPopup("Privacy")}
              <CircleIcon size={8} color="#888" />
              {renderPopup("Terms")}
            </Group>
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}

export default VerificationPortal;
