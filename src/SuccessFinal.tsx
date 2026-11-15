import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  TrophyIcon,
  CheckCircleIcon,
  SparkleIcon,
  ArrowRightIcon,
  FlagCheckeredIcon,
} from "@phosphor-icons/react";

interface SuccessFinalProps {
  title?: string;
  description?: string;
  onContinue?: () => void;
}

export function SuccessFinal({
  title = "Objective completed!",
  description = "Congratulations! You have successfully achieved your objective. Your progress has been recorded.",
  onContinue,
}: SuccessFinalProps) {
  return (
    <Container
      fluid
      p={0}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, var(--mantine-color-gray-0), var(--mantine-color-blue-0))",
      }}
    >
      <Container size={520} w="100%">
        <Paper
          shadow="lg"
          radius="xl"
          p={{ base: "xl", sm: 48 }}
          withBorder
        >
          <Stack align="center" gap="lg">
            <Group gap={8}>
              <SparkleIcon
                size={20}
                weight="fill"
                color="var(--mantine-color-yellow-6)"
              />
              <Text
                size="sm"
                fw={700}
                tt="uppercase"
                c="dimmed"
                style={{ letterSpacing: 2 }}
              >
                Good job
              </Text>
              <SparkleIcon
                size={20}
                weight="fill"
                color="var(--mantine-color-yellow-6)"
              />
            </Group>

            <ThemeIcon
              size={112}
              radius="50%"
              variant="light"
              color="green"
            >
              <TrophyIcon size={64} weight="duotone" />
            </ThemeIcon>

            <Stack align="center" gap="xs">
              <Badge
                size="lg"
                variant="light"
                color="green"
                leftSection={<CheckCircleIcon size={14} weight="fill" />}
              >
                Successfully completed
              </Badge>

              <Title
                order={1}
                ta="center"
                size="2rem"
              >
                {title}
              </Title>

              <Text
                c="dimmed"
                ta="center"
                size="md"
                maw={380}
                lh={1.6}
              >
                {description}
              </Text>
            </Stack>

            <Paper
              w="100%"
              radius="md"
              p="md"
              bg="var(--mantine-color-green-light)"
            >
              <Group justify="center" gap="xs">
                <FlagCheckeredIcon
                  size={22}
                  weight="duotone"
                  color="var(--mantine-color-green-7)"
                />
                <Text fw={600} c="green.8">
                  Goal reached. Well done!
                </Text>
              </Group>
            </Paper>

            {onContinue && (
              <Button
                size="lg"
                radius="md"
                fullWidth
                rightSection={<ArrowRightIcon size={18} />}
                onClick={onContinue}
              >
                Continue
              </Button>
            )}

            <Text size="xs" c="dimmed" ta="center">
              Thank you for your effort and dedication.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Container>
  );
}

export default SuccessFinal;
