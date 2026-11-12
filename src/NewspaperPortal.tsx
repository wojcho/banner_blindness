import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Burger,
} from "@mantine/core";

import {
  FireIcon,
  LightningIcon,
  EyeIcon,
  TrendUpIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  StarIcon,
  ChatCircleIcon,
  FlameIcon,
} from "@phosphor-icons/react";

const stories = [
  {
    category: "CELEBRITY",
    title: "HOLLYWOOD IN CHAOS! What REALLY happened behind closed doors?",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900",
    views: "248K",
  },
  {
    category: "MYSTERY",
    title: "Scientists STUNNED after discovering something hiding beneath the ocean!",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900",
    views: "182K",
  },
  {
    category: "WORLD",
    title: "Nobody expected THIS! The bizarre decision that has everyone talking!",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900",
    views: "156K",
  },
  {
    category: "SCIENCE",
    title: "Is this the end of sleep? New invention promises to change EVERYTHING!",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900",
    views: "98K",
  },
];

const trending = [
  "The shocking truth about your morning coffee",
  "A billionaire just bought an entire island",
  "This tiny country has a HUGE secret",
  "Doctors can't believe what happened next",
  "The internet is absolutely losing its mind",
];

const latestStories = [
  {
    category: "POLITICS",
    title: "LEAKED! The meeting nobody was supposed to know about",
    image: "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=700",
  },
  {
    category: "TECH",
    title: "Your phone might be smarter than you think...",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
  },
  {
    category: "LIFESTYLE",
    title: "People are ditching traditional homes for THIS!",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=700",
  },
  {
    category: "ENTERTAINMENT",
    title: "Fans spot a mysterious detail nobody noticed before!",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700",
  },
];

const categories = [
  "ALL",
  "WORLD",
  "CELEBRITY",
  "MYSTERY",
  "SCIENCE",
  "TECH",
  "POLITICS",
];

export function NewspaperPortal() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [menuOpened, setMenuOpened] = useState(false);

  const filteredStories =
    activeCategory === "ALL"
      ? stories
      : stories.filter((story) => story.category === activeCategory);

  return (
    <Box bg="#f5f2eb" mih="100vh" c="#171717">
      {/* Breaking news */}
      <Box bg="#d71920" c="white" py={8}>
        <Container size="xl">
          <Group gap="xs" wrap="nowrap">
            <Badge color="yellow" c="black" radius={0}>
              <Group gap={4}>
                <LightningIcon weight="fill" size={14} />
                BREAKING
              </Group>
            </Badge>
            <Text size="xs" fw={900} truncate>
              THE INTERNET IS EXPLODING! Something unbelievable just happened...
            </Text>
            <Text ml="auto" size="xs" fw={900} visibleFrom="sm">
              LIVE UPDATES
            </Text>
          </Group>
        </Container>
      </Box>

      <Container size="xl">
        {/* Newspaper masthead */}
        <Box py="xl">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <Burger
                opened={menuOpened}
                onClick={() => setMenuOpened(!menuOpened)}
                hiddenFrom="md"
                size="sm"
              />
              <Text size="xs" fw={900} visibleFrom="sm">
                THURSDAY, NOVEMBER 12, 2026
              </Text>
            </Group>

            <Stack align="center" gap={0}>
              <Group gap={4}>
                <FlameIcon size={34} color="#d71920" weight="fill" />
                <Title
                  order={1}
                  fw={1000}
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(32px, 6vw, 68px)",
                    letterSpacing: "-4px",
                    lineHeight: 1,
                  }}
                >
                  THE DAILY
                  <Text component="span" c="#d71920" inherit>
                    DRAMA
                  </Text>
                </Title>
              </Group>
              <Text
                size="xs"
                fw={900}
                tt="uppercase"
                style={{ letterSpacing: 4 }}
              >
                FACTS ARE BORING. WE ARE NOT.
              </Text>
            </Stack>

            <Group gap="xs">
              <ActionIcon variant="subtle" color="dark" size="lg">
                <MagnifyingGlassIcon size={21} />
              </ActionIcon>
              <Button color="dark" radius={0} size="xs" visibleFrom="sm">
                SUBSCRIBE
              </Button>
            </Group>
          </Group>
        </Box>

        <Divider size={3} color="dark" />
        <Divider size={1} color="dark" mt={3} />

        {/* Navigation */}
        <Group
          justify="center"
          gap="lg"
          py="sm"
          visibleFrom="md"
          wrap="wrap"
        >
          {categories.map((category) => (
            <Text
              key={category}
              size="xs"
              fw={900}
              c={activeCategory === category ? "red" : "dark"}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Text>
          ))}
        </Group>

        {menuOpened && (
          <Paper p="md" mb="md" withBorder>
            <Stack gap="sm">
              {categories.map((category) => (
                <Text
                  key={category}
                  fw={800}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setActiveCategory(category);
                    setMenuOpened(false);
                  }}
                >
                  {category}
                </Text>
              ))}
            </Stack>
          </Paper>
        )}

        <Divider size={3} color="dark" />

        {/* Hero story */}
        <Box py="lg">
          <Group justify="space-between" mb="sm">
            <Badge color="red" radius={0} size="lg">
              <Group gap={5}>
                <FireIcon size={14} weight="fill" />
                THE BIG STORY
              </Group>
            </Badge>
            <Text size="xs" fw={700} c="dimmed">
              EDITOR'S PICK • EXCLUSIVE
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack justify="center" gap="sm">
              <Title
                order={2}
                fw={1000}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 0.98,
                  letterSpacing: "-2px",
                  textTransform: "uppercase",
                }}
              >
                YOU WON'T BELIEVE WHAT THEY FOUND IN THE BACKYARD!
              </Title>

              <Text size="lg" fw={900} c="red">
                NEIGHBORS ARE IN TOTAL SHOCK!
              </Text>

              <Text size="sm" c="dimmed" maw={500}>
                One ordinary morning turned into an extraordinary discovery.
                Experts are baffled, witnesses are speechless, and the
                internet wants answers.
              </Text>

              <Group gap="md" mt="sm">
                <Badge color="red" radius={0}>MYSTERY</Badge>
                <Text size="xs" c="dimmed">15 MIN AGO</Text>
                <Group gap={4}>
                  <EyeIcon size={15} />
                  <Text size="xs" fw={700}>342K READERS</Text>
                </Group>
              </Group>

              <Button
                color="red"
                radius={0}
                w="fit-content"
                rightSection={<ArrowRightIcon size={18} />}
              >
                READ THE SHOCKING STORY
              </Button>
            </Stack>

            <Box pos="relative">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
                h={{ base: 250, md: 410 }}
                fit="cover"
                radius={0}
              />
              <Badge
                color="red"
                radius={0}
                pos="absolute"
                bottom={12}
                left={12}
                size="lg"
              >
                EXCLUSIVE PHOTOS
              </Badge>
            </Box>
          </SimpleGrid>
        </Box>

        <Divider size={4} color="dark" />

        {/* Trending stories */}
        <Box py="lg">
          <Group justify="space-between" mb="md">
            <Title order={2} fw={1000} style={{ fontFamily: "Georgia, serif" }}>
              <Text component="span" c="red" inherit>01.</Text>{" "}
              THE INTERNET IS ON FIRE
            </Title>
            <Group gap={4}>
              <TrendUpIcon color="red" size={20} />
              <Text size="xs" fw={900}>TRENDING NOW</Text>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            {filteredStories.map((story, index) => (
              <Card
                key={story.title}
                padding={0}
                radius={0}
                bg="white"
                withBorder
              >
                <Box pos="relative">
                  <Image src={story.image} h={165} fit="cover" />
                  <Badge pos="absolute" top={10} left={10} color="red" radius={0}>
                    {story.category}
                  </Badge>
                </Box>
                <Stack p="sm" gap="xs">
                  <Text size="xs" fw={900} c="red">
                    #{index + 1} MOST READ
                  </Text>
                  <Text
                    fw={900}
                    size="md"
                    style={{
                      fontFamily: "Georgia, serif",
                      lineHeight: 1.2,
                    }}
                  >
                    {story.title}
                  </Text>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">12 min ago</Text>
                    <Group gap={4}>
                      <EyeIcon size={14} />
                      <Text size="xs" fw={700}>{story.views}</Text>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Divider size={4} color="dark" />

        {/* Latest stories and sidebar */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" py="xl">
          <Box style={{ gridColumn: "span 2" }}>
            <Title order={2} fw={1000} mb="md">
              LATEST EXPLOSIVE STORIES
            </Title>

            <Stack gap="lg">
              {latestStories.map((story) => (
                <Group key={story.title} align="flex-start" wrap="nowrap">
                  <Image
                    src={story.image}
                    w={{ base: 110, sm: 190 }}
                    h={{ base: 100, sm: 130 }}
                    fit="cover"
                    radius={0}
                  />
                  <Stack gap={5} style={{ flex: 1 }}>
                    <Text size="xs" fw={900} c="red">
                      {story.category}
                    </Text>
                    <Title
                      order={3}
                      fw={900}
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "clamp(17px, 2vw, 24px)",
                        lineHeight: 1.15,
                      }}
                    >
                      {story.title}
                    </Title>
                    <Text size="xs" c="dimmed">
                      2 hours ago • Daily Drama Newsroom
                    </Text>
                    <Group gap={4}>
                      <ChatCircleIcon size={15} />
                      <Text size="xs" fw={700}>Read the full story</Text>
                    </Group>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Box>

          {/* Sidebar */}
          <Stack gap="md">
            <Paper bg="#171717" c="white" p="md" radius={0}>
              <Group gap="xs" mb="md">
                <FlameIcon color="#ff3030" size={23} weight="fill" />
                <Title order={3} fw={1000}>THE HOT LIST</Title>
              </Group>

              {trending.map((item, index) => (
                <Box key={item}>
                  <Group align="flex-start" gap="sm" py="sm">
                    <Title order={2} c="red" fw={1000}>
                      0{index + 1}
                    </Title>
                    <Text size="sm" fw={800} style={{ flex: 1 }}>
                      {item}
                    </Text>
                  </Group>
                  <Divider color="dark.5" />
                </Box>
              ))}
            </Paper>

            <Paper p="md" radius={0} withBorder bg="#fff4d6">
              <StarIcon size={26} color="#d71920" weight="fill" />
              <Title order={3} fw={1000}>
                YOU HEARD IT HERE FIRST!
              </Title>
              <Text size="sm" mt="xs">
                Exclusive gossip, unbelievable discoveries, and stories too
                wild to ignore.
              </Text>
              <Button color="red" radius={0} fullWidth mt="md">
                GET THE SCOOP
              </Button>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* Feature banner */}
        <Box bg="#d71920" c="white" p={{ base: "lg", md: 40 }} my="xl">
          <Stack align="center" gap="sm">
            <Text fw={900} size="xs" style={{ letterSpacing: 5 }}>
              THE DAILY DRAMA PRESENTS
            </Text>
            <Title
              order={2}
              ta="center"
              fw={1000}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(32px, 5vw, 58px)",
                lineHeight: 1,
              }}
            >
              THE 10 MOST INSANE STORIES OF THE YEAR!
            </Title>
            <Text ta="center" maw={500} size="sm">
              The scandals, the mysteries, the jaw-dropping moments.
              All in one place.
            </Text>
            <Button color="dark" radius={0} size="lg">
              DISCOVER THE LIST <ArrowRightIcon size={18} />
            </Button>
          </Stack>
        </Box>

        {/* Footer */}
        <Divider size={4} color="dark" />
        <Stack align="center" py="xl" gap="xs">
          <Title order={2} fw={1000} style={{ fontFamily: "Georgia, serif" }}>
            THE DAILY
            <Text component="span" c="red" inherit>DRAMA</Text>
          </Title>
          <Text size="xs" c="dimmed" ta="center">
            THE NEWS YOU DIDN'T ASK FOR, BUT CAN'T STOP READING.
          </Text>
          <Group gap="lg" mt="sm">
            <Text size="xs" fw={700}>ABOUT</Text>
            <Text size="xs" fw={700}>CONTACT</Text>
            <Text size="xs" fw={700}>PRIVACY</Text>
            <Text size="xs" fw={700}>ADVERTISE</Text>
          </Group>
          <Text size="xs" c="dimmed" mt="md">
            © 2026 THE DAILY DRAMA. ALL DRAMA RESERVED.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default NewspaperPortal;
