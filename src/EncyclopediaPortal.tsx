import { useMemo, useState } from "react";
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Burger,
  Container,
  Divider,
  Drawer,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";

import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  ArrowRightIcon,
  CompassIcon,
  ArticleIcon,
  XIcon,
} from "@phosphor-icons/react";

import "@mantine/core/styles.css";

interface EncyclopediaArticle {
  id: string;
  title: string;
  header: string;
  image: string;
  relatedArticleIds: string[];
}

const articles: EncyclopediaArticle[] = [
  {
    id: "earth",
    title: "Earth",
    header:
      "Earth is the third planet from the Sun and the only known astronomical object to harbor life.",
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    relatedArticleIds: ["solar-system", "moon", "climate"],
  },
  {
    id: "solar-system",
    title: "Solar System",
    header:
      "The Solar System consists of the Sun and all celestial objects gravitationally bound to it.",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    relatedArticleIds: ["earth", "moon", "mars"],
  },
  {
    id: "moon",
    title: "Moon",
    header:
      "The Moon is Earth's only natural satellite and the fifth-largest satellite in the Solar System.",
    image:
      "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe",
    relatedArticleIds: ["earth", "solar-system"],
  },
  {
    id: "mars",
    title: "Mars",
    header:
      "Mars is the fourth planet from the Sun, often called the Red Planet because of its reddish appearance.",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    relatedArticleIds: ["solar-system", "earth"],
  },
  {
    id: "climate",
    title: "Climate Change",
    header:
      "Climate change refers to long-term shifts in temperatures and weather patterns, primarily caused by human activities since the 1800s.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    relatedArticleIds: ["earth", "solar-system"],
  },
];


export function EncyclopediaPortal() {
  const [selectedArticleId, setSelectedArticleId] = useState("earth");
  const [search, setSearch] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);

  const selectedArticle = articles.find(
    (article) => article.id === selectedArticleId
  );

  // Search articles by title and description.
  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.header.toLowerCase().includes(query)
    );
  }, [search]);

  // Find related articles.
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];

    return selectedArticle.relatedArticleIds
      .map((id) => articles.find((article) => article.id === id))
      .filter(
        (article): article is EncyclopediaArticle =>
          article !== undefined
      );
  }, [selectedArticle]);

  // Navigate to an article.
  const selectArticle = (id: string) => {
    setSelectedArticleId(id);
    setSearch("");
    setMenuOpened(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Reusable article navigation.
  const articleNavigation = (
    <Stack gap={4}>
      {articles.map((article) => (
        <UnstyledButton
          key={article.id}
          onClick={() => selectArticle(article.id)}
          p="sm"
          style={{
            borderRadius: rem(8),
            backgroundColor:
              selectedArticleId === article.id
                ? "#e7f0ff"
                : "transparent",
          }}
        >
          <Group gap="xs" wrap="nowrap">
            <ArticleIcon
              size={18}
              color={
                selectedArticleId === article.id
                  ? "#228be6"
                  : "#868e96"
              }
            />

            <Text
              size="sm"
              fw={selectedArticleId === article.id ? 700 : 400}
              c={selectedArticleId === article.id ? "blue" : "dark"}
            >
              {article.title}
            </Text>
          </Group>
        </UnstyledButton>
      ))}
    </Stack>
  );

  return (
    <AppShell
      header={{ height: 76 }}
      padding={0}
      styles={{
        main: {
          backgroundColor: "#f8f9fc",
          minHeight: "100vh",
        },
      }}
    >
      {/* HEADER */}
      <AppShell.Header
        px="md"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderBottom: "1px solid #e9ecef",
          zIndex: 200,
        }}
      >
        <Container size="xl" w="100%">
          <Group justify="space-between" wrap="nowrap">

            {/* Hamburger + Brand */}
            <Group gap="sm" wrap="nowrap">
              <Burger
                opened={menuOpened}
                onClick={() => setMenuOpened((value) => !value)}
                size="sm"
                aria-label="Toggle article navigation"
              />

              <ThemeIcon size={42} radius="md" color="blue">
                <BookOpenIcon size={25} weight="duotone" />
              </ThemeIcon>

              <Box visibleFrom="xs">
                <Title order={3} size="h4">
                  Omnipedia
                </Title>

                <Text size="xs" c="dimmed">
                  Explore the world of knowledge
                </Text>
              </Box>
            </Group>

            {/* SEARCH */}
            <Box
              pos="relative"
              w={{ base: "65%", sm: 420 }}
            >
              <TextInput
                placeholder="Search Omnipedia..."
                leftSection={
                  <MagnifyingGlassIcon size={18} />
                }
                rightSection={
                  search ? (
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                    >
                      <XIcon size={16} />
                    </ActionIcon>
                  ) : null
                }
                value={search}
                onChange={(event) =>
                  setSearch(event.currentTarget.value)
                }
                radius="xl"
                size="md"
              />

              {/* SEARCH RESULTS DROPDOWN */}
              {search.trim().length > 0 && (
                <Paper
                  pos="absolute"
                  top="calc(100% + 10px)"
                  left={0}
                  right={0}
                  shadow="lg"
                  radius="lg"
                  withBorder
                  bg="white"
                  style={{
                    zIndex: 300,
                    overflow: "hidden",
                  }}
                >
                  <Group
                    justify="space-between"
                    px="md"
                    py="sm"
                  >
                    <Text size="xs" fw={700} c="dimmed">
                      SEARCH RESULTS
                    </Text>

                    <Badge
                      variant="light"
                      color="blue"
                    >
                      {filteredArticles.length} ARTICLES
                    </Badge>
                  </Group>

                  <Divider />

                  <ScrollArea.Autosize mah={420}>
                    {filteredArticles.length > 0 ? (
                      <Stack gap={0} p="xs">
                        {filteredArticles.map((article) => (
                          <UnstyledButton
                            key={article.id}
                            onClick={() =>
                              selectArticle(article.id)
                            }
                            p="sm"
                            style={{
                              borderRadius: rem(8),
                            }}
                          >
                            <Group
                              gap="sm"
                              wrap="nowrap"
                              align="flex-start"
                            >
                              {/* Article thumbnail */}
                              <Image
                                src={article.image}
                                alt={article.title}
                                w={76}
                                h={66}
                                radius="md"
                                fit="cover"
                                style={{
                                  flexShrink: 0,
                                }}
                              />

                              {/* Article information */}
                              <Box
                                style={{
                                  flex: 1,
                                  minWidth: 0,
                                }}
                              >
                                <Text
                                  fw={600}
                                  size="sm"
                                  c="dark"
                                  mb={4}
                                >
                                  {article.title}
                                </Text>

                                <Text
                                  size="xs"
                                  c="dimmed"
                                  lineClamp={2}
                                  lh={1.5}
                                >
                                  {article.header}
                                </Text>
                              </Box>

                              <ArrowRightIcon
                                size={18}
                                color="#228be6"
                                style={{
                                  flexShrink: 0,
                                  alignSelf: "center",
                                }}
                              />
                            </Group>
                          </UnstyledButton>
                        ))}
                      </Stack>
                    ) : (
                      <Stack
                        align="center"
                        py="xl"
                        px="md"
                        gap="xs"
                      >
                        <MagnifyingGlassIcon
                          size={32}
                          color="#adb5bd"
                        />

                        <Text fw={600} size="sm">
                          No articles found
                        </Text>

                        <Text
                          size="xs"
                          c="dimmed"
                          ta="center"
                        >
                          Try another search term or keyword.
                        </Text>
                      </Stack>
                    )}
                  </ScrollArea.Autosize>
                </Paper>
              )}
            </Box>
          </Group>
        </Container>
      </AppShell.Header>

      {/* NAVIGATION DRAWER */}
      <Drawer
        opened={menuOpened}
        onClose={() => setMenuOpened(false)}
        title={
          <Group gap="xs">
            <CompassIcon size={20} />
            <Text fw={700}>Explore articles</Text>
          </Group>
        }
        position="left"
        size={300}
        padding="md"
      >
        <Text size="xs" c="dimmed" mb="sm">
          {articles.length} ARTICLES
        </Text>

        {articleNavigation}
      </Drawer>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Container size="xl" py="xl">

          {selectedArticle ? (
            <Stack gap="lg">

              {/* ARTICLE HEADING */}
              <Box>
                <Title order={1} size="2.5rem" mb="sm">
                  {selectedArticle.title}
                </Title>

                <Text size="lg" c="dimmed" lh={1.7}>
                  {selectedArticle.header}
                </Text>
              </Box>

              {/* MAIN IMAGE */}
              <Paper radius="lg" withBorder bg="white" p={0}>
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  h={350}
                  fit="cover"
                  radius="lg"
                />

                <Text size="xs" c="dimmed" p="sm">
                  Illustration: {selectedArticle.title}
                </Text>
              </Paper>

              {/* ARTICLE BODY */}
              <Paper p="xl" radius="lg" withBorder bg="white">
                <Title order={3} mb="md">
                  Overview
                </Title>

                <Text size="md" lh={1.9} c="dark">
                  {selectedArticle.header}
                </Text>

                <Divider my="lg" />

                <Text size="sm" c="dimmed" lh={1.8}>
                  Welcome to the Encyclopedia Portal. This article
                  provides an introduction to {selectedArticle.title}.
                  Explore the related articles below to discover
                  more topics and expand your knowledge.
                </Text>
              </Paper>

              {/* RELATED ARTICLES */}
              {relatedArticles.length > 0 && (
                <Box>
                  <Group justify="space-between" mb="md">
                    <Title order={3}>
                      Related articles
                    </Title>

                    <Text size="xs" c="dimmed">
                      {relatedArticles.length} ARTICLES
                    </Text>
                  </Group>

                  <Stack gap="sm">
                    {relatedArticles.map((article) => (
                      <Paper
                        key={article.id}
                        withBorder
                        radius="lg"
                        p="sm"
                        bg="white"
                      >
                        <UnstyledButton
                          w="100%"
                          onClick={() =>
                            selectArticle(article.id)
                          }
                        >
                          <Group
                            justify="space-between"
                            wrap="nowrap"
                          >
                            <Group gap="md" wrap="nowrap">
                              <Image
                                src={article.image}
                                w={76}
                                h={60}
                                radius="md"
                                fit="cover"
                              />

                              <Box style={{ minWidth: 0 }}>
                                <Text fw={600}>
                                  {article.title}
                                </Text>

                                <Text
                                  size="xs"
                                  c="dimmed"
                                  lineClamp={2}
                                >
                                  {article.header}
                                </Text>
                              </Box>
                            </Group>

                            <ArrowRightIcon
                              size={20}
                              color="#228be6"
                            />
                          </Group>
                        </UnstyledButton>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          ) : (
            <Paper p="xl" radius="lg" withBorder bg="white">
              <Text ta="center" c="dimmed">
                Article not found.
              </Text>
            </Paper>
          )}

          {/* FOOTER */}
          <Divider my="xl" />

          <Text size="xs" c="dimmed" ta="center">
            Omnipedia · Discover knowledge, one article at a time.
          </Text>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default EncyclopediaPortal;
