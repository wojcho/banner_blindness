import { useEffect, useMemo, useState } from "react";
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
  CheckCircleIcon,
} from "@phosphor-icons/react";

import "@mantine/core/styles.css";
import type { AdBannerConfig } from "./AdTypes";
import AdBanner from "./AdBanner";

import { mockedArticles, type EncyclopediaArticle } from "./PortalTypes";

interface EncyclopediaPortalProps {
  articles?: EncyclopediaArticle[];
  initialArticleId?: string;
  targetArticleId?: string;
  onTargetArticleSelected?: (article: EncyclopediaArticle) => void;
  adBanner?: AdBannerConfig;
}

export function EncyclopediaPortal({
  articles = mockedArticles,
  initialArticleId,
  targetArticleId,
  onTargetArticleSelected,
  adBanner,
}: EncyclopediaPortalProps) {
  const [selectedArticleId, setSelectedArticleId] = useState(
    initialArticleId ?? "earth",
  );
  const [search, setSearch] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);
  const [showTargetSuccess, setShowTargetSuccess] = useState(false);

  const topAd = adBanner?.location === "top";
  const sidebarAd = adBanner?.location === "sidebar";
  const bottomAd = adBanner?.location === "other";

  const selectedArticle = articles.find(
    (article) => article.id === selectedArticleId,
  );

  const goToHome = () => {
    selectArticle(initialArticleId ?? "earth");
  };

  useEffect(() => {
    if (
      targetArticleId &&
      selectedArticleId === targetArticleId &&
      selectedArticle
    ) {
      setShowTargetSuccess(true);

      // Wait for the success animation to complete
      const timeout = setTimeout(() => {
        onTargetArticleSelected?.(selectedArticle);
        setShowTargetSuccess(false);
      }, 3500);

      return () => clearTimeout(timeout);
    }

    setShowTargetSuccess(false);
  }, [
    selectedArticleId,
    targetArticleId,
    selectedArticle,
    onTargetArticleSelected,
  ]);

  // Search articles by title and description.
  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.header.toLowerCase().includes(query),
    );
  }, [search]);

  // Find related articles.
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];

    return selectedArticle.relatedArticleIds
      .map((id) => articles.find((article) => article.id === id))
      .filter(
        (article): article is EncyclopediaArticle => article !== undefined,
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
              selectedArticleId === article.id ? "#e7f0ff" : "transparent",
          }}
        >
          <Group gap="xs" wrap="nowrap">
            <ArticleIcon
              size={18}
              color={selectedArticleId === article.id ? "#228be6" : "#868e96"}
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
    <>
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

                <UnstyledButton
                  onClick={goToHome}
                  style={{ cursor: "pointer" }}
                  aria-label="Go to Omnipedia home"
                >
                  <Group gap="sm" wrap="nowrap">
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
                </UnstyledButton>
              </Group>

              {/* SEARCH */}
              <Box pos="relative" w={{ base: "65%", sm: 420 }}>
                <TextInput
                  placeholder="Search Omnipedia..."
                  leftSection={<MagnifyingGlassIcon size={18} />}
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
                  onChange={(event) => setSearch(event.currentTarget.value)}
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
                    <Group justify="space-between" px="md" py="sm">
                      <Text size="xs" fw={700} c="dimmed">
                        SEARCH RESULTS
                      </Text>

                      <Badge variant="light" color="blue">
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
                              onClick={() => selectArticle(article.id)}
                              p="sm"
                              style={{
                                borderRadius: rem(8),
                              }}
                            >
                              <Group gap="sm" wrap="nowrap" align="flex-start">
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
                                  <Text fw={600} size="sm" c="dark" mb={4}>
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
                        <Stack align="center" py="xl" px="md" gap="xs">
                          <MagnifyingGlassIcon size={32} color="#adb5bd" />

                          <Text fw={600} size="sm">
                            No articles found
                          </Text>

                          <Text size="xs" c="dimmed" ta="center">
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

          {/* TOP AD BANNER */}
          {topAd && (
            <Box
              w="100%"
              display="flex"
              style={{
                justifyContent: "center",
                padding: "12px 16px",
                backgroundColor: "#f8f9fc",
              }}
            >
              <AdBanner config={adBanner!} />
            </Box>
          )}

          <Container size="xl" py="xl">
            {/* SUCCESS ANIMATION */}
            {showTargetSuccess && selectedArticle && (
              <Paper
                mb="xl"
                p="md"
                radius="lg"
                withBorder
                bg="#ebfbee"
                style={{
                  borderColor: "#69db7c",
                  animation: "successSlideIn 0.55s ease-out",
                }}
              >
                <Group gap="md" wrap="nowrap">
                  <ThemeIcon
                    size={46}
                    radius="xl"
                    color="green"
                    variant="light"
                    className="target-success-icon"
                  >
                    <CheckCircleIcon size={30} weight="fill" />
                  </ThemeIcon>

                  <Box style={{ flex: 1 }}>
                    <Text fw={700} c="green.9">
                      Target article reached!
                    </Text>

                    <Text size="sm" c="green.8">
                      Successfully navigated to {selectedArticle.title}. Your
                      destination has been found.
                    </Text>
                  </Box>

                  <Badge color="green" variant="light">
                    SUCCESS
                  </Badge>
                </Group>
              </Paper>
            )}

            {selectedArticle ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 24,
                  width: "100%",
                }}
              >
                {/* ARTICLE */}
                <Box
                  style={{
                    flex: "1 1 800px",
                    maxWidth: sidebarAd ? 850 : "100%",
                    minWidth: 0,
                  }}
                >
                  <Stack gap="lg">
                    {/* ARTICLE HEADING */}
                    <Box
                      className={
                        showTargetSuccess ? "target-success-heading" : undefined
                      }
                      style={{
                        borderRadius: rem(12),
                        padding: rem(8),
                      }}
                    >
                      <Title order={1} size="2.5rem" mb="sm">
                        {selectedArticle.title}

                        {showTargetSuccess && (
                          <Badge
                            ml="md"
                            color="green"
                            variant="light"
                            size="lg"
                          >
                            <Group gap={4}>
                              <CheckCircleIcon size={14} weight="fill" />
                              Reached
                            </Group>
                          </Badge>
                        )}
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
                        {selectedArticle.content}
                      </Text>

                      <Divider my="lg" />

                      <Text size="sm" c="dimmed" lh={1.8}>
                        Welcome to the Omnipedia. This article provides an
                        introduction to {selectedArticle.title}. Explore the
                        related articles below to discover more topics and
                        expand your knowledge.
                      </Text>
                    </Paper>

                    {/* RELATED ARTICLES */}
                    {relatedArticles.length > 0 && (
                      <Box>
                        <Group justify="space-between" mb="md">
                          <Title order={3}>Related articles</Title>

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
                                onClick={() => selectArticle(article.id)}
                              >
                                <Group justify="space-between" wrap="nowrap">
                                  <Group gap="md" wrap="nowrap">
                                    <Image
                                      src={article.image}
                                      w={76}
                                      h={60}
                                      radius="md"
                                      fit="cover"
                                    />

                                    <Box style={{ minWidth: 0 }}>
                                      <Text fw={600}>{article.title}</Text>

                                      <Text size="xs" c="dimmed" lineClamp={2}>
                                        {article.header}
                                      </Text>
                                    </Box>
                                  </Group>

                                  <ArrowRightIcon size={20} color="#228be6" />
                                </Group>
                              </UnstyledButton>
                            </Paper>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Box>

                {/* SIDEBAR AD */}
                {sidebarAd && (
                  <Box
                    style={{
                      flex: "0 0 160px",
                      width: 160,
                      position: "sticky",
                      top: 100,
                    }}
                  >
                    <AdBanner config={adBanner!} />
                  </Box>
                )}
              </Box>
            ) : (
              <Paper p="xl" radius="lg" withBorder bg="white">
                <Text ta="center" c="dimmed">
                  Article not found.
                </Text>
              </Paper>
            )}

            {/* BOTTOM AD */}
            {bottomAd && (
              <Box
                w="100%"
                display="flex"
                style={{
                  justifyContent: "center",
                  paddingTop: 24,
                  paddingBottom: 12,
                }}
              >
                <AdBanner config={adBanner!} />
              </Box>
            )}

            {/* FOOTER */}
            <Divider my="xl" />

            <Text size="xs" c="dimmed" ta="center">
              Omnipedia. Discover knowledge, one article at a time.
            </Text>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default EncyclopediaPortal;
