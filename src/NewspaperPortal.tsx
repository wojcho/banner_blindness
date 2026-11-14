
import React, { useState } from "react";

import {
  Box,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  Badge,
  Image,
  Card,
  Divider,
  Anchor,
  Button,
  TextInput,
} from "@mantine/core";

import {
  FireIcon,
  LightningIcon,
  EyeIcon,
  ClockIcon,
  TrendUpIcon,
  NewspaperIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

import "./NewspaperPortal.css";
import type { AdBannerConfig } from "./AdTypes";
import AdBanner from "./AdBanner";

// ============================================================
// TYPES
// ============================================================

interface Article {
  id: number;
  title: string;
  header: string;
  image: string;
  link: string;
  category: string;
  featured?: boolean;
  main?: boolean;
  time?: string;
}

interface NewspaperPortalProps {
  articles?: Article[];
  targetArticleId?: number;
  onTargetArticleSelected?: (article: Article) => void;
  adBanner?: AdBannerConfig;
}

// ============================================================
// MOCK ARTICLES
// ============================================================

const mockArticles: Article[] = [
  {
    id: 1,
    title:
      "THE TRUTH THEY HID FROM US! Scientists Discover Something That Could Change Everything",
    header:
      "Experts are speechless. The discovery nobody expected is making headlines around the world.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    link: "#article-1",
    category: "BREAKING NEWS",
    main: true,
    time: "12 min ago",
  },
  {
    id: 2,
    title:
      "SHOCKING! A Simple Everyday Habit Could Be Ruining Your Life",
    header:
      "Doctors are warning everyone. Millions of people might be making this mistake.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    link: "#article-2",
    category: "HEALTH",
    featured: true,
    time: "25 min ago",
  },
  {
    id: 3,
    title:
      "Nobody Saw This Coming: Internet Explodes Over Celebrity Revelation",
    header:
      "One unexpected announcement has sent social media into complete chaos.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    link: "#article-3",
    category: "CELEBRITIES",
    featured: true,
    time: "38 min ago",
  },
  {
    id: 4,
    title:
      "This New Technology Is Leaving Everyone Speechless",
    header:
      "A futuristic innovation could soon become part of everyday life.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    link: "#article-4",
    category: "TECHNOLOGY",
    featured: true,
    time: "1 hour ago",
  },
  {
    id: 5,
    title:
      "The 5 Things You Should Never Do Before Going to Bed",
    header:
      "Sleep specialists explain why these seemingly harmless habits matter.",
    image:
      "https://images.unsplash.com/photo-1511295742362-92c96b6c8a0c?w=600",
    link: "#article-5",
    category: "LIFESTYLE",
    time: "1 hour ago",
  },
  {
    id: 6,
    title:
      "A Mysterious Object Appeared in the Sky. People Cannot Explain It",
    header:
      "Witnesses captured something unusual, and the footage is going viral.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600",
    link: "#article-6",
    category: "WORLD",
    time: "2 hours ago",
  },
  {
    id: 7,
    title:
      "Your Smartphone Has a Hidden Feature You Probably Never Used",
    header:
      "This little-known trick could save you a lot of time.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    link: "#article-7",
    category: "TECHNOLOGY",
    time: "3 hours ago",
  },
  {
    id: 8,
    title:
      "The Most Unexpected Food Trend Is Taking Over the Internet",
    header:
      "Food lovers are divided over this unusual new sensation.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    link: "#article-8",
    category: "FOOD",
    time: "4 hours ago",
  },
  {
    id: 9,
    title:
      "Why Everyone Is Talking About This Forgotten Destination",
    header:
      "Travel enthusiasts have discovered a surprising hidden gem.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
    link: "#article-9",
    category: "TRAVEL",
    time: "5 hours ago",
  },
  {
    id: 10,
    title:
      "Scientists Reveal What Happens When You Take a Break From Social Media",
    header:
      "The results of a recent study may surprise you.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    link: "#article-10",
    category: "SCIENCE",
    time: "6 hours ago",
  },
];

// ============================================================
// COMPONENT
// ============================================================

export function NewspaperPortal({
  articles = mockArticles,
  targetArticleId,
  onTargetArticleSelected,
  adBanner,
}: NewspaperPortalProps) {
  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------

  const [feedback, setFeedback] = useState<{
    type: "success" | "failure";
    articleId: number;
    key: number;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // ----------------------------------------------------------
  // NAVIGATION
  // ----------------------------------------------------------

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const resetFilters = () => {
    setActiveCategory("ALL");
    setSearchQuery("");
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    scrollToSection("news-content");
  };

  // ----------------------------------------------------------
  // FILTERING
  // ----------------------------------------------------------

  const matchesArticle = (article: Article) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.header.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "ALL" ||
      (activeCategory === "TRENDING"
        ? Boolean(article.featured)
        : article.category === activeCategory);

    return matchesSearch && matchesCategory;
  };

  const filteredArticles = articles.filter(matchesArticle);

  const mainArticle = articles.find((article) => article.main);

  const visibleMainArticle =
    mainArticle && matchesArticle(mainArticle)
      ? mainArticle
      : undefined;

  const featuredArticles = filteredArticles.filter(
    (article) => article.featured
  );

  const regularArticles = filteredArticles.filter(
    (article) => !article.main && !article.featured
  );

  const rankingArticles = filteredArticles
    .filter((article) => !article.main)
    .slice(0, 5);

  const hasResults = filteredArticles.length > 0;

  // ----------------------------------------------------------
  // ARTICLE SELECTION
  // ----------------------------------------------------------

  const handleArticleSelection = (
    article: Article,
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    const isCorrect = article.id === targetArticleId;

    setFeedback((previous) => ({
      type: isCorrect ? "success" : "failure",
      articleId: article.id,
      key: (previous?.key ?? 0) + 1,
    }));

    if (isCorrect) {
      onTargetArticleSelected?.(article);
    }
  };

  // ----------------------------------------------------------
  // NEWSLETTER
  // ----------------------------------------------------------

  const handleNewsletterSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());

    if (!isValid) {
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  // ----------------------------------------------------------
  // REUSABLE ARTICLE LINK
  // ----------------------------------------------------------

  const ArticleLink = ({
    article,
    children,
  }: {
    article: Article;
    children: React.ReactNode;
  }) => (
    <Anchor
      href={article.link}
      underline="never"
      c="inherit"
      onClick={(event) =>
        handleArticleSelection(article, event)
      }
      className="article-link"
      aria-label={`Select article: ${article.title}`}
    >
      {children}
    </Anchor>
  );

  // ----------------------------------------------------------
  // NAVIGATION ITEMS
  // ----------------------------------------------------------

  const navigationItems = [
    { label: "HOME", category: "ALL" },
    { label: "WORLD", category: "WORLD" },
    { label: "CELEBRITIES", category: "CELEBRITIES" },
    { label: "TECH", category: "TECHNOLOGY" },
    { label: "HEALTH", category: "HEALTH" },
    { label: "LIFESTYLE", category: "LIFESTYLE" },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Box id="top" className="newspaper-portal">

      {/* ================================================== */}
      {/* SELECTION FEEDBACK */}
      {/* ================================================== */}

      {feedback && (
        <Box
          key={feedback.key}
          className={`selection-feedback ${
            feedback.type === "success"
              ? "selection-success"
              : "selection-failure"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {feedback.type === "success" ? (
            <>
              <span className="feedback-icon">✓</span>

              <Text fw={900} size="lg">
                CORRECT! YOU FOUND IT!
              </Text>

              <Text size="sm">
                Excellent work. That's the target article!
              </Text>
            </>
          ) : (
            <>
              <span className="feedback-icon">✕</span>

              <Text fw={900} size="lg">
                NOT QUITE!
              </Text>

              <Text size="sm">
                That is not the article we are looking for. Try again!
              </Text>
            </>
          )}
        </Box>
      )}

      {/* ================================================== */}
      {/* MASTHEAD */}
      {/* ================================================== */}

      <Box className="newspaper-masthead">

        <Container size="xl">

          <Group justify="space-between" py="xs">

            <Text size="xs" fw={700} c="dimmed">
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric",
              })
                .format(new Date())
                .toUpperCase()}
            </Text>

            <Group gap={6}>
              <FireIcon
                size={16}
                weight="fill"
                color="#e03131"
              />

              <Text size="xs" fw={800} c="red">
                THE NEWS NEVER SLEEPS
              </Text>
            </Group>

          </Group>

          <Divider color="dark.4" />

          {/* LOGO */}

          <Box py={24} ta="center">

            <Anchor
              component="button"
              type="button"
              c="inherit"
              underline="never"
              onClick={() => {
                resetFilters();
                scrollToSection("top");
              }}
              aria-label="Return to homepage"
            >
              <Group justify="center" gap={8}>

                <LightningIcon
                  size={34}
                  weight="fill"
                  color="#e03131"
                />

                <Title className="newspaper-logo">
                  THE DAILY <span>DRAMA</span>
                </Title>

                <LightningIcon
                  size={34}
                  weight="fill"
                  color="#e03131"
                />

              </Group>
            </Anchor>

            <Text
              size="xs"
              fw={700}
              c="dimmed"
              tt="uppercase"
              mt={5}
              style={{ letterSpacing: 4 }}
            >
              Everything. Everywhere. All at Once.
            </Text>

          </Box>

          <Divider color="dark.4" />

          {/* NAVIGATION */}

          <Group
            justify="space-between"
            py="sm"
            wrap="nowrap"
            className="newspaper-nav"
          >

            <Group gap="lg" wrap="nowrap">

              {navigationItems.map((item) => (
                <Anchor
                  key={item.label}
                  component="button"
                  type="button"
                  c={
                    activeCategory === item.category
                      ? "red"
                      : "dark"
                  }
                  fw={900}
                  size="xs"
                  onClick={() =>
                    selectCategory(item.category)
                  }
                  className="nav-link"
                  aria-current={
                    activeCategory === item.category
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Anchor>
              ))}

            </Group>

            <Badge
              color={
                activeCategory === "TRENDING" ? "red" : "gray"
              }
              variant={
                activeCategory === "TRENDING"
                  ? "filled"
                  : "light"
              }
              radius="xs"
              leftSection={<FireIcon size={12} />}
              className="clickable-badge"
              onClick={() =>
                selectCategory(
                  activeCategory === "TRENDING"
                    ? "ALL"
                    : "TRENDING"
                )
              }
            >
              TRENDING
            </Badge>

          </Group>

        </Container>

      </Box>

      {/* ================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================== */}

      <Container
        id="news-content"
        size="xl"
        py="lg"
      >

        {/* BREAKING NEWS TICKER */}

        <Group
          className="breaking-ticker"
          gap={0}
          wrap="nowrap"
        >

          <Box className="breaking-label">
            <LightningIcon size={15} weight="fill" />
            BREAKING
          </Box>

          <Anchor
            component="button"
            type="button"
            c="white"
            fw={700}
            size="sm"
            px="md"
            onClick={() => {
              if (visibleMainArticle) {
                scrollToSection("main-story");
              } else {
                scrollToSection("latest-stories");
              }
            }}
            lineClamp={1}
            style={{ flex: 1, textAlign: "left" }}
          >
            You will not believe what happened today!
            The internet is going crazy!
          </Anchor>

          <Button
            variant="subtle"
            color="white"
            size="compact-sm"
            aria-label="Go to latest stories"
            onClick={() =>
              scrollToSection("latest-stories")
            }
          >
            <ArrowRightIcon size={18} />
          </Button>

        </Group>

        {adBanner && (
          <Box my="lg">
            <AdBanner config={adBanner} />
          </Box>
        )}

        {/* SEARCH */}

        <Group
          mt="lg"
          mb="md"
          justify="space-between"
          align="center"
          wrap="wrap"
        >

          <Text fw={900} size="sm">
            FIND YOUR NEXT STORY
          </Text>

          <TextInput
            placeholder="Search headlines, topics..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.currentTarget.value)
            }
            leftSection={<EyeIcon size={17} />}
            rightSection={
              searchQuery ? (
                <Button
                  variant="subtle"
                  color="gray"
                  size="compact-xs"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </Button>
              ) : null
            }
            radius="md"
            size="md"
            w={{ base: "100%", sm: 340 }}
            aria-label="Search articles"
          />

        </Group>

        {/* ACTIVE FILTER */}

        {(activeCategory !== "ALL" || searchQuery.trim()) && (
          <Group mb="lg" gap="xs">

            <Text size="xs" c="dimmed">
              FILTERING:
            </Text>

            {activeCategory !== "ALL" && (
              <Badge color="red" variant="light">
                {activeCategory}
              </Badge>
            )}

            {searchQuery.trim() && (
              <Badge color="gray" variant="light">
                "{searchQuery}"
              </Badge>
            )}

            <Anchor
              component="button"
              type="button"
              size="xs"
              c="red"
              fw={700}
              onClick={resetFilters}
            >
              CLEAR FILTERS
            </Anchor>

          </Group>
        )}

        {/* ================================================== */}
        {/* NO RESULTS */}
        {/* ================================================== */}

        {!hasResults && (
          <Box py={60} ta="center">

            <NewspaperIcon
              size={48}
              color="#999"
              weight="light"
            />

            <Title order={3} ff="Georgia, serif" mt="md">
              NO STORIES FOUND
            </Title>

            <Text c="dimmed" mt="xs" mb="lg">
              Try another search term or explore all our stories.
            </Text>

            <Button color="red" onClick={resetFilters}>
              SHOW ALL NEWS
            </Button>

          </Box>
        )}

        {/* ================================================== */}
        {/* MAIN HEADLINE */}
        {/* ================================================== */}

        {visibleMainArticle && (
          <Box
            id="main-story"
            mt="xl"
            mb="xl"
          >

            <Group justify="space-between" mb="sm">

              <Group gap={6}>
                <FireIcon
                  size={18}
                  weight="fill"
                  color="#e03131"
                />

                <Text fw={900} size="sm" tt="uppercase">
                  TODAY'S BIGGEST STORY
                </Text>
              </Group>

              <Group gap={4}>
                <ClockIcon size={12} />

                <Text size="xs" c="dimmed">
                  {visibleMainArticle.time}
                </Text>
              </Group>

            </Group>

            <Card
              padding={0}
              radius="sm"
              className="main-article"
            >

              <ArticleLink article={visibleMainArticle}>

                <Box pos="relative">

                  <Image
                    src={visibleMainArticle.image}
                    h={440}
                    fit="cover"
                    alt={visibleMainArticle.title}
                  />

                  <Box className="main-article-overlay">

                    <Badge color="red" size="lg" radius="xs">
                      {visibleMainArticle.category}
                    </Badge>

                    <Title
                      order={1}
                      c="white"
                      className="main-headline"
                      mt="sm"
                    >
                      {visibleMainArticle.title}
                    </Title>

                    <Text
                      c="white"
                      size="md"
                      mt="sm"
                      maw={750}
                    >
                      {visibleMainArticle.header}
                    </Text>

                    <Text c="white" size="xs" fw={700} mt="md">
                      READ THE FULL STORY →
                    </Text>

                  </Box>

                </Box>

              </ArticleLink>

            </Card>

          </Box>
        )}

        {/* ================================================== */}
        {/* FEATURED STORIES */}
        {/* ================================================== */}

        {featuredArticles.length > 0 && (
          <Box mb="xl">

            <Group justify="space-between" mb="md">

              <Title order={2} className="section-title">
                <FireIcon
                  size={22}
                  weight="fill"
                  color="#e03131"
                />
                YOU NEED TO SEE THIS!
              </Title>

              <Text size="xs" fw={700} c="red">
                MOST READ TODAY
              </Text>

            </Group>

            <Grid>

              {featuredArticles.map((article, index) => (
                <Grid.Col
                  key={article.id}
                  span={{ base: 12, sm: 6, md: 4 }}
                >

                  <ArticleLink article={article}>

                    <Card
                      padding={0}
                      radius="sm"
                      className="featured-card"
                    >

                      <Box pos="relative">

                        <Image
                          src={article.image}
                          h={190}
                          fit="cover"
                          alt={article.title}
                        />

                        <Badge
                          color="red"
                          radius="xs"
                          className="image-badge"
                        >
                          #{index + 1} TRENDING
                        </Badge>

                      </Box>

                      <Stack gap={8} p="md">

                        <Text size="xs" fw={900} c="red">
                          {article.category}
                        </Text>

                        <Title
                          order={3}
                          className="featured-title"
                        >
                          {article.title}
                        </Title>

                        <Text
                          size="sm"
                          c="dimmed"
                          lineClamp={2}
                        >
                          {article.header}
                        </Text>

                        <Group justify="space-between">

                          <Text size="xs" c="dimmed">
                            {article.time}
                          </Text>

                          <ArrowRightIcon size={18} />

                        </Group>

                      </Stack>

                    </Card>

                  </ArticleLink>

                </Grid.Col>
              ))}

            </Grid>

          </Box>
        )}

        {/* ================================================== */}
        {/* REGULAR NEWS + SIDEBAR */}
        {/* ================================================== */}

        {(regularArticles.length > 0 ||
          rankingArticles.length > 0) && (
          <>
            <Divider my="xl" />

            <Grid>

              {/* LATEST STORIES */}

              <Grid.Col
                span={{ base: 12, md: 8 }}
                id="latest-stories"
              >

                <Group justify="space-between" mb="lg">

                  <Title order={2} className="section-title">
                    <NewspaperIcon size={22} />
                    LATEST STORIES
                  </Title>

                  <Badge
                    color="dark"
                    variant="light"
                    className="clickable-badge"
                    onClick={resetFilters}
                  >
                    ALL NEWS
                  </Badge>

                </Group>

                <Stack gap="md">

                  {regularArticles.map((article) => (
                    <ArticleLink
                      key={article.id}
                      article={article}
                    >

                      <Group
                        align="flex-start"
                        wrap="nowrap"
                        className="regular-article"
                        gap="md"
                      >

                        <Image
                          src={article.image}
                          w={155}
                          h={110}
                          radius="sm"
                          fit="cover"
                          alt={article.title}
                        />

                        <Stack gap={5} style={{ flex: 1 }}>

                          <Text size="xs" fw={900} c="red">
                            {article.category}
                          </Text>

                          <Title
                            order={4}
                            className="regular-title"
                          >
                            {article.title}
                          </Title>

                          <Text
                            size="sm"
                            c="dimmed"
                            lineClamp={2}
                          >
                            {article.header}
                          </Text>

                          <Text size="xs" c="dimmed">
                            {article.time}
                          </Text>

                        </Stack>

                      </Group>

                    </ArticleLink>
                  ))}

                </Stack>

              </Grid.Col>

              {/* SIDEBAR */}

              <Grid.Col span={{ base: 12, md: 4 }}>

                <Box className="sidebar">

                  <Box className="sidebar-heading">

                    <TrendUpIcon size={19} weight="bold" />

                    <Title order={3}>
                      HOT RIGHT NOW
                    </Title>

                  </Box>

                  {/* RANKINGS */}

                  {rankingArticles.length > 0 ? (
                    <Stack gap="md" mt="md">

                      {rankingArticles.map((article, index) => (
                        <ArticleLink
                          key={article.id}
                          article={article}
                        >

                          <Group
                            align="flex-start"
                            gap="sm"
                            wrap="nowrap"
                            className="ranking-item"
                          >

                            <Title
                              order={2}
                              c="red"
                              className="ranking-number"
                            >
                              {String(index + 1).padStart(2, "0")}
                            </Title>

                            <Stack gap={4} style={{ flex: 1 }}>

                              <Text
                                fw={800}
                                size="sm"
                                lineClamp={3}
                              >
                                {article.title}
                              </Text>

                              <Text size="xs" c="dimmed">
                                {article.category}
                              </Text>

                            </Stack>

                          </Group>

                        </ArticleLink>
                      ))}

                    </Stack>
                  ) : (
                    <Text size="sm" c="dimmed" mt="md">
                      No trending stories match your filters.
                    </Text>
                  )}

                  <Divider my="xl" />

                  {/* NEWSLETTER */}

                  <Box
                    id="newsletter"
                    className="newsletter-box"
                  >

                    <EyeIcon size={28} weight="fill" />

                    {newsletterStatus === "success" ? (
                      <Stack gap="xs">

                        <Title order={3} mt="sm">
                          YOU'RE ON THE LIST! ✓
                        </Title>

                        <Text size="sm">
                          Thanks for subscribing to The Daily Drama!
                        </Text>

                        <Button
                          variant="white"
                          color="red"
                          size="sm"
                          onClick={() =>
                            setNewsletterStatus("idle")
                          }
                        >
                          SUBSCRIBE ANOTHER EMAIL
                        </Button>

                      </Stack>
                    ) : (
                      <>

                        <Title order={3} mt="sm">
                          DON'T MISS A THING!
                        </Title>

                        <Text size="sm" mt="xs">
                          The juiciest stories delivered straight
                          to your inbox.
                        </Text>

                        <Box
                          component="form"
                          onSubmit={handleNewsletterSubmit}
                          mt="md"
                        >

                          <Stack gap="xs">

                            <TextInput
                              placeholder="Enter your email address"
                              type="email"
                              value={newsletterEmail}
                              onChange={(event) => {
                                setNewsletterEmail(
                                  event.currentTarget.value
                                );
                                setNewsletterStatus("idle");
                              }}
                              aria-label="Newsletter email address"
                              error={
                                newsletterStatus === "error"
                                  ? "Please enter a valid email address."
                                  : undefined
                              }
                              styles={{
                                input: {
                                  background: "white",
                                  color: "#171717",
                                },
                              }}
                            />

                            <Button
                              fullWidth
                              color="dark"
                              type="submit"
                            >
                              SUBSCRIBE NOW →
                            </Button>

                          </Stack>

                        </Box>

                      </>
                    )}

                  </Box>

                </Box>

              </Grid.Col>

            </Grid>
          </>
        )}

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <Divider my="xl" />

        <Box ta="center" py="lg">

          <Anchor
            component="button"
            type="button"
            c="inherit"
            underline="never"
            onClick={() => {
              resetFilters();
              scrollToSection("top");
            }}
            aria-label="Back to homepage"
          >

            <Title order={2} className="newspaper-logo">
              THE DAILY <span>DRAMA</span>
            </Title>

          </Anchor>

          <Text size="xs" c="dimmed" mt="xs">
            © 2026 THE DAILY DRAMA. ALL DRAMA RESERVED.
          </Text>

          <Button
            variant="subtle"
            color="dark"
            size="xs"
            mt="md"
            onClick={() => scrollToSection("top")}
          >
            BACK TO TOP ↑
          </Button>

        </Box>

      </Container>

    </Box>
  );
}

export default NewspaperPortal;
