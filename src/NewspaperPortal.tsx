import { useMemo, useState } from "react";
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

interface Story {
  id: string;
  category: string;
  title: string;
  image: string;
  views?: string;
  publishedAt?: string;
  author?: string;
  excerpt?: string;
}

interface LatestStory extends Story {}

interface HeroStory {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  publishedAt: string;
  views: string;
  badge: string;
  label: string;
  buttonText: string;
}

interface SidebarFeature {
  iconTitle: string;
  title: string;
  description: string;
  buttonText: string;
}

interface NewspaperContent {
  breakingNews: {
    label: string;
    message: string;
    liveLabel: string;
  };

  masthead: {
    date: string;
    title: string;
    accent: string;
    tagline: string;
    subscribeLabel: string;
  };

  navigation: string[];

  hero: HeroStory;

  trendingSection: {
    number: string;
    title: string;
    label: string;
    stories: Story[];
  };

  latestSection: {
    title: string;
    stories: LatestStory[];
    readMoreLabel: string;
  };

  sidebar: {
    hotList: {
      title: string;
      items: string[];
    };
    feature: SidebarFeature;
  };

  featureBanner: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
  };

  footer: {
    title: string;
    accent: string;
    tagline: string;
    links: string[];
    copyright: string;
  };
}

const newspaperContent: NewspaperContent = {
  breakingNews: {
    label: "BREAKING",
    message:
      "THE INTERNET IS EXPLODING! Something unbelievable just happened...",
    liveLabel: "LIVE UPDATES",
  },

  masthead: {
    date: "THURSDAY, NOVEMBER 12, 2026",
    title: "THE DAILY",
    accent: "DRAMA",
    tagline: "FACTS ARE BORING. WE ARE NOT.",
    subscribeLabel: "SUBSCRIBE",
  },

  navigation: [
    "ALL",
    "WORLD",
    "CELEBRITY",
    "MYSTERY",
    "SCIENCE",
    "TECH",
    "POLITICS",
  ],

  hero: {
    category: "MYSTERY",
    title: "YOU WON'T BELIEVE WHAT THEY FOUND IN THE BACKYARD!",
    subtitle: "NEIGHBORS ARE IN TOTAL SHOCK!",
    description:
      "One ordinary morning turned into an extraordinary discovery. Experts are baffled, witnesses are speechless, and the internet wants answers.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
    publishedAt: "15 MIN AGO",
    views: "342K READERS",
    badge: "EXCLUSIVE PHOTOS",
    label: "THE BIG STORY",
    buttonText: "READ THE SHOCKING STORY",
  },

  trendingSection: {
    number: "01.",
    title: "THE INTERNET IS ON FIRE",
    label: "TRENDING NOW",

    stories: [
      {
        id: "story-1",
        category: "CELEBRITY",
        title:
          "HOLLYWOOD IN CHAOS! What REALLY happened behind closed doors?",
        image:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900",
        views: "248K",
        publishedAt: "12 MIN AGO",
      },
      {
        id: "story-2",
        category: "MYSTERY",
        title:
          "Scientists STUNNED after discovering something hiding beneath the ocean!",
        image:
          "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900",
        views: "182K",
        publishedAt: "12 MIN AGO",
      },
      {
        id: "story-3",
        category: "WORLD",
        title:
          "Nobody expected THIS! The bizarre decision that has everyone talking!",
        image:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900",
        views: "156K",
        publishedAt: "12 MIN AGO",
      },
      {
        id: "story-4",
        category: "SCIENCE",
        title:
          "Is this the end of sleep? New invention promises to change EVERYTHING!",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900",
        views: "98K",
        publishedAt: "12 MIN AGO",
      },
    ],
  },

  latestSection: {
    title: "LATEST EXPLOSIVE STORIES",
    readMoreLabel: "Read the full story",

    stories: [
      {
        id: "latest-1",
        category: "POLITICS",
        title:
          "LEAKED! The meeting nobody was supposed to know about",
        image:
          "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=700",
        publishedAt: "2 hours ago",
        author: "Daily Drama Newsroom",
      },
      {
        id: "latest-2",
        category: "TECH",
        title:
          "Your phone might be smarter than you think...",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
        publishedAt: "2 hours ago",
        author: "Daily Drama Newsroom",
      },
      {
        id: "latest-3",
        category: "LIFESTYLE",
        title:
          "People are ditching traditional homes for THIS!",
        image:
          "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=700",
        publishedAt: "2 hours ago",
        author: "Daily Drama Newsroom",
      },
      {
        id: "latest-4",
        category: "ENTERTAINMENT",
        title:
          "Fans spot a mysterious detail nobody noticed before!",
        image:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700",
        publishedAt: "2 hours ago",
        author: "Daily Drama Newsroom",
      },
    ],
  },

  sidebar: {
    hotList: {
      title: "THE HOT LIST",
      items: [
        "The shocking truth about your morning coffee",
        "A billionaire just bought an entire island",
        "This tiny country has a HUGE secret",
        "Doctors can't believe what happened next",
        "The internet is absolutely losing its mind",
      ],
    },

    feature: {
      iconTitle: "YOU HEARD IT HERE FIRST!",
      title: "YOU HEARD IT HERE FIRST!",
      description:
        "Exclusive gossip, unbelievable discoveries, and stories too wild to ignore.",
      buttonText: "GET THE SCOOP",
    },
  },

  featureBanner: {
    eyebrow: "THE DAILY DRAMA PRESENTS",
    title: "THE 10 MOST INSANE STORIES OF THE YEAR!",
    description:
      "The scandals, the mysteries, the jaw-dropping moments. All in one place.",
    buttonText: "DISCOVER THE LIST",
  },

  footer: {
    title: "THE DAILY",
    accent: "DRAMA",
    tagline:
      "THE NEWS YOU DIDN'T ASK FOR, BUT CAN'T STOP READING.",
    links: ["ABOUT", "CONTACT", "PRIVACY", "ADVERTISE"],
    copyright: "© 2026 THE DAILY DRAMA. ALL DRAMA RESERVED.",
  },
};

export function NewspaperPortal() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [menuOpened, setMenuOpened] = useState(false);

  const content = newspaperContent;

  const filteredStories = useMemo(() => {
    if (activeCategory === "ALL") {
      return content.trendingSection.stories;
    }

    return content.trendingSection.stories.filter(
      (story) => story.category === activeCategory
    );
  }, [activeCategory]);

  const navigationCategories = content.navigation;

  return (
    <Box bg="#f5f2eb" mih="100vh" c="#171717">

      {/* BREAKING NEWS */}

      <Box bg="#d71920" c="white" py={8}>
        <Container size="xl">
          <Group gap="xs" wrap="nowrap">
            <Badge color="yellow" c="black" radius={0}>
              <Group gap={4}>
                <LightningIcon weight="fill" size={14} />
                {content.breakingNews.label}
              </Group>
            </Badge>

            <Text size="xs" fw={900} truncate>
              {content.breakingNews.message}
            </Text>

            <Text ml="auto" size="xs" fw={900} visibleFrom="sm">
              {content.breakingNews.liveLabel}
            </Text>
          </Group>
        </Container>
      </Box>

      <Container size="xl">

        {/* MASTHEAD */}

        <Box py="xl">
          <Group justify="space-between" align="center">

            <Group gap="xs">
              <Burger
                opened={menuOpened}
                onClick={() => setMenuOpened((value) => !value)}
                hiddenFrom="md"
                size="sm"
              />

              <Text size="xs" fw={900} visibleFrom="sm">
                {content.masthead.date}
              </Text>
            </Group>

            <Stack align="center" gap={0}>
              <Group gap={4}>
                <FlameIcon
                  size={34}
                  color="#d71920"
                  weight="fill"
                />

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
                  {content.masthead.title}

                  <Text component="span" c="#d71920" inherit>
                    {content.masthead.accent}
                  </Text>
                </Title>
              </Group>

              <Text
                size="xs"
                fw={900}
                tt="uppercase"
                style={{ letterSpacing: 4 }}
              >
                {content.masthead.tagline}
              </Text>
            </Stack>

            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                color="dark"
                size="lg"
              >
                <MagnifyingGlassIcon size={21} />
              </ActionIcon>

              <Button
                color="dark"
                radius={0}
                size="xs"
                visibleFrom="sm"
              >
                {content.masthead.subscribeLabel}
              </Button>
            </Group>
          </Group>
        </Box>

        <Divider size={3} color="dark" />
        <Divider size={1} color="dark" mt={3} />

        {/* DESKTOP NAVIGATION */}

        <Group
          justify="center"
          gap="lg"
          py="sm"
          visibleFrom="md"
          wrap="wrap"
        >
          {navigationCategories.map((category) => (
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

        {/* MOBILE NAVIGATION */}

        {menuOpened && (
          <Paper p="md" mb="md" withBorder>
            <Stack gap="sm">
              {navigationCategories.map((category) => (
                <Text
                  key={category}
                  fw={800}
                  c={activeCategory === category ? "red" : "dark"}
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

        {/* HERO STORY */}

        <Box py="lg">

          <Group justify="space-between" mb="sm">
            <Badge color="red" radius={0} size="lg">
              <Group gap={5}>
                <FireIcon size={14} weight="fill" />
                {content.hero.label}
              </Group>
            </Badge>

            <Text size="xs" fw={700} c="dimmed">
              EDITOR'S PICK • EXCLUSIVE
            </Text>
          </Group>

          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing="lg"
          >
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
                {content.hero.title}
              </Title>

              <Text size="lg" fw={900} c="red">
                {content.hero.subtitle}
              </Text>

              <Text size="sm" c="dimmed" maw={500}>
                {content.hero.description}
              </Text>

              <Group gap="md" mt="sm">
                <Badge color="red" radius={0}>
                  {content.hero.category}
                </Badge>

                <Text size="xs" c="dimmed">
                  {content.hero.publishedAt}
                </Text>

                <Group gap={4}>
                  <EyeIcon size={15} />
                  <Text size="xs" fw={700}>
                    {content.hero.views}
                  </Text>
                </Group>
              </Group>

              <Button
                color="red"
                radius={0}
                w="fit-content"
                rightSection={<ArrowRightIcon size={18} />}
              >
                {content.hero.buttonText}
              </Button>
            </Stack>

            <Box pos="relative">
              <Image
                src={content.hero.image}
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
                {content.hero.badge}
              </Badge>
            </Box>
          </SimpleGrid>
        </Box>

        <Divider size={4} color="dark" />

        {/* TRENDING STORIES */}

        <Box py="lg">

          <Group justify="space-between" mb="md">
            <Title
              order={2}
              fw={1000}
              style={{ fontFamily: "Georgia, serif" }}
            >
              <Text component="span" c="red" inherit>
                {content.trendingSection.number}
              </Text>{" "}
              {content.trendingSection.title}
            </Title>

            <Group gap={4}>
              <TrendUpIcon color="red" size={20} />

              <Text size="xs" fw={900}>
                {content.trendingSection.label}
              </Text>
            </Group>
          </Group>

          {filteredStories.length > 0 ? (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 4 }}
              spacing="md"
            >
              {filteredStories.map((story, index) => (
                <Card
                  key={story.id}
                  padding={0}
                  radius={0}
                  bg="white"
                  withBorder
                >
                  <Box pos="relative">
                    <Image
                      src={story.image}
                      h={165}
                      fit="cover"
                    />

                    <Badge
                      pos="absolute"
                      top={10}
                      left={10}
                      color="red"
                      radius={0}
                    >
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
                      <Text size="xs" c="dimmed">
                        {story.publishedAt}
                      </Text>

                      <Group gap={4}>
                        <EyeIcon size={14} />
                        <Text size="xs" fw={700}>
                          {story.views}
                        </Text>
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              No stories available in this category.
            </Text>
          )}
        </Box>

        <Divider size={4} color="dark" />

        {/* LATEST STORIES AND SIDEBAR */}

        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing="xl"
          py="xl"
        >

          {/* LATEST STORIES */}

          <Box style={{ gridColumn: "span 2" }}>
            <Title order={2} fw={1000} mb="md">
              {content.latestSection.title}
            </Title>

            <Stack gap="lg">
              {content.latestSection.stories.map((story) => (
                <Group
                  key={story.id}
                  align="flex-start"
                  wrap="nowrap"
                >
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
                      {story.publishedAt}
                      {story.author ? ` • ${story.author}` : ""}
                    </Text>

                    <Group gap={4}>
                      <ChatCircleIcon size={15} />

                      <Text size="xs" fw={700}>
                        {content.latestSection.readMoreLabel}
                      </Text>
                    </Group>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Box>

          {/* SIDEBAR */}

          <Stack gap="md">

            {/* HOT LIST */}

            <Paper
              bg="#171717"
              c="white"
              p="md"
              radius={0}
            >
              <Group gap="xs" mb="md">
                <FlameIcon
                  color="#ff3030"
                  size={23}
                  weight="fill"
                />

                <Title order={3} fw={1000}>
                  {content.sidebar.hotList.title}
                </Title>
              </Group>

              {content.sidebar.hotList.items.map((item, index) => (
                <Box key={`${index}-${item}`}>
                  <Group
                    align="flex-start"
                    gap="sm"
                    py="sm"
                  >
                    <Title order={2} c="red" fw={1000}>
                      {String(index + 1).padStart(2, "0")}
                    </Title>

                    <Text
                      size="sm"
                      fw={800}
                      style={{ flex: 1 }}
                    >
                      {item}
                    </Text>
                  </Group>

                  {index !== content.sidebar.hotList.items.length - 1 && (
                    <Divider color="dark.5" />
                  )}
                </Box>
              ))}
            </Paper>

            {/* SIDEBAR FEATURE */}

            <Paper
              p="md"
              radius={0}
              withBorder
              bg="#fff4d6"
            >
              <StarIcon
                size={26}
                color="#d71920"
                weight="fill"
              />

              <Title order={3} fw={1000}>
                {content.sidebar.feature.title}
              </Title>

              <Text size="sm" mt="xs">
                {content.sidebar.feature.description}
              </Text>

              <Button
                color="red"
                radius={0}
                fullWidth
                mt="md"
              >
                {content.sidebar.feature.buttonText}
              </Button>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* FEATURE BANNER */}

        <Box
          bg="#d71920"
          c="white"
          p={{ base: "lg", md: 40 }}
          my="xl"
        >
          <Stack align="center" gap="sm">

            <Text
              fw={900}
              size="xs"
              style={{ letterSpacing: 5 }}
            >
              {content.featureBanner.eyebrow}
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
              {content.featureBanner.title}
            </Title>

            <Text ta="center" maw={500} size="sm">
              {content.featureBanner.description}
            </Text>

            <Button
              color="dark"
              radius={0}
              size="lg"
            >
              {content.featureBanner.buttonText}
              <ArrowRightIcon size={18} />
            </Button>
          </Stack>
        </Box>

        {/* FOOTER */}

        <Divider size={4} color="dark" />

        <Stack align="center" py="xl" gap="xs">

          <Title
            order={2}
            fw={1000}
            style={{ fontFamily: "Georgia, serif" }}
          >
            {content.footer.title}

            <Text component="span" c="red" inherit>
              {content.footer.accent}
            </Text>
          </Title>

          <Text size="xs" c="dimmed" ta="center">
            {content.footer.tagline}
          </Text>

          <Group gap="lg" mt="sm" wrap="wrap" justify="center">
            {content.footer.links.map((link) => (
              <Text
                key={link}
                size="xs"
                fw={700}
                style={{ cursor: "pointer" }}
              >
                {link}
              </Text>
            ))}
          </Group>

          <Text size="xs" c="dimmed" mt="md">
            {content.footer.copyright}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default NewspaperPortal;
