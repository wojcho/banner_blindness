import React from "react";
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

const articles: Article[] = [
  {
    id: 1,
    title: "THE TRUTH THEY HID FROM US! Scientists Discover Something That Could Change Everything",
    header: "Experts are speechless. The discovery nobody expected is making headlines around the world.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    link: "#article-1",
    category: "BREAKING NEWS",
    main: true,
    time: "12 min ago",
  },
  {
    id: 2,
    title: "SHOCKING! A Simple Everyday Habit Could Be Ruining Your Life",
    header: "Doctors are warning everyone. Millions of people might be making this mistake.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    link: "#article-2",
    category: "HEALTH",
    featured: true,
    time: "25 min ago",
  },
  {
    id: 3,
    title: "Nobody Saw This Coming: Internet Explodes Over Celebrity Revelation",
    header: "One unexpected announcement has sent social media into complete chaos.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    link: "#article-3",
    category: "CELEBRITIES",
    featured: true,
    time: "38 min ago",
  },
  {
    id: 4,
    title: "This New Technology Is Leaving Everyone Speechless",
    header: "A futuristic innovation could soon become part of everyday life.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    link: "#article-4",
    category: "TECHNOLOGY",
    featured: true,
    time: "1 hour ago",
  },
  {
    id: 5,
    title: "The 5 Things You Should Never Do Before Going to Bed",
    header: "Sleep specialists explain why these seemingly harmless habits matter.",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b6c8a0c?w=600",
    link: "#article-5",
    category: "LIFESTYLE",
    time: "1 hour ago",
  },
  {
    id: 6,
    title: "A Mysterious Object Appeared in the Sky. People Cannot Explain It",
    header: "Witnesses captured something unusual, and the footage is going viral.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600",
    link: "#article-6",
    category: "WORLD",
    time: "2 hours ago",
  },
  {
    id: 7,
    title: "Your Smartphone Has a Hidden Feature You Probably Never Used",
    header: "This little-known trick could save you a lot of time.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    link: "#article-7",
    category: "TECHNOLOGY",
    time: "3 hours ago",
  },
  {
    id: 8,
    title: "The Most Unexpected Food Trend Is Taking Over the Internet",
    header: "Food lovers are divided over this unusual new sensation.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    link: "#article-8",
    category: "FOOD",
    time: "4 hours ago",
  },
  {
    id: 9,
    title: "Why Everyone Is Talking About This Forgotten Destination",
    header: "Travel enthusiasts have discovered a surprising hidden gem.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
    link: "#article-9",
    category: "TRAVEL",
    time: "5 hours ago",
  },
  {
    id: 10,
    title: "Scientists Reveal What Happens When You Take a Break From Social Media",
    header: "The results of a recent study may surprise you.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    link: "#article-10",
    category: "SCIENCE",
    time: "6 hours ago",
  },
];

const NewspaperPortal: React.FC = () => {
  const mainArticle = articles.find((a) => a.main)!;
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter(
    (a) => !a.main && !a.featured
  );

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
    >
      {children}
    </Anchor>
  );

  return (
    <Box className="newspaper-portal">
      {/* MASTHEAD */}
      <Box className="newspaper-masthead">
        <Container size="xl">
          <Group justify="space-between" py="xs">
            <Text size="xs" fw={700} c="dimmed">
              SATURDAY, NOVEMBER 14, 2026
            </Text>
            <Group gap={6}>
              <FireIcon size={16} weight="fill" color="#e03131" />
              <Text size="xs" fw={800} c="red">
                THE NEWS NEVER SLEEPS
              </Text>
            </Group>
          </Group>

          <Divider color="dark.4" />

          <Box py={24} ta="center">
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

          <Group
            justify="space-between"
            py="sm"
            wrap="nowrap"
            className="newspaper-nav"
          >
            <Group gap="lg" wrap="nowrap">
              {["HOME", "WORLD", "CELEBRITIES", "TECH", "HEALTH", "LIFESTYLE"].map(
                (item) => (
                  <Anchor key={item} href="#" c="dark" fw={800} size="xs">
                    {item}
                  </Anchor>
                )
              )}
            </Group>
            <Badge color="red" radius="xs" leftSection={<FireIcon size={12} />}>
              TRENDING
            </Badge>
          </Group>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container size="xl" py="lg">
        {/* BREAKING NEWS TICKER */}
        <Group className="breaking-ticker" gap={0} wrap="nowrap">
          <Box className="breaking-label">
            <LightningIcon size={15} weight="fill" />
            BREAKING
          </Box>
          <Text size="sm" fw={700} px="md" lineClamp={1}>
            You will not believe what happened today! The internet is going crazy!
          </Text>
          <ArrowRightIcon size={18} />
        </Group>

        {/* MAIN HEADLINE */}
        <Box mt="xl" mb="xl">
          <Group justify="space-between" mb="sm">
            <Group gap={6}>
              <FireIcon size={18} weight="fill" color="#e03131" />
              <Text fw={900} size="sm" tt="uppercase">
                TODAY'S BIGGEST STORY
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              <ClockIcon size={12} /> {mainArticle.time}
            </Text>
          </Group>

          <Card
            padding={0}
            radius="sm"
            className="main-article"
          >
            <ArticleLink article={mainArticle}>
              <Box pos="relative">
                <Image
                  src={mainArticle.image}
                  h={440}
                  fit="cover"
                />
                <Box className="main-article-overlay">
                  <Badge color="red" size="lg" radius="xs">
                    {mainArticle.category}
                  </Badge>
                  <Title
                    order={1}
                    c="white"
                    className="main-headline"
                    mt="sm"
                  >
                    {mainArticle.title}
                  </Title>
                  <Text c="white" size="md" mt="sm" maw={750}>
                    {mainArticle.header}
                  </Text>
                  <Text c="white" size="xs" fw={700} mt="md">
                    READ THE FULL STORY →
                  </Text>
                </Box>
              </Box>
            </ArticleLink>
          </Card>
        </Box>

        {/* FEATURED STORIES */}
        <Group justify="space-between" mb="md">
          <Title order={2} className="section-title">
            <FireIcon size={22} weight="fill" color="#e03131" />
            YOU NEED TO SEE THIS!
          </Title>
          <Text size="xs" fw={700} c="red">
            MOST READ TODAY
          </Text>
        </Group>

        <Grid>
          {featuredArticles.map((article, index) => (
            <Grid.Col key={article.id} span={{ base: 12, sm: 6, md: 4 }}>
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
                    <Title order={3} className="featured-title">
                      {article.title}
                    </Title>
                    <Text size="sm" c="dimmed" lineClamp={2}>
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

        {/* REGULAR NEWS */}
        <Divider my="xl" />

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Group justify="space-between" mb="lg">
              <Title order={2} className="section-title">
                <NewspaperIcon size={22} />
                LATEST STORIES
              </Title>
              <Badge color="dark" variant="light">
                ALL NEWS
              </Badge>
            </Group>

            <Stack gap="md">
              {regularArticles.map((article) => (
                <ArticleLink key={article.id} article={article}>
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
                    />
                    <Stack gap={5} style={{ flex: 1 }}>
                      <Text size="xs" fw={900} c="red">
                        {article.category}
                      </Text>
                      <Title order={4} className="regular-title">
                        {article.title}
                      </Title>
                      <Text size="sm" c="dimmed" lineClamp={2}>
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
                <Title order={3}>HOT RIGHT NOW</Title>
              </Box>

              <Stack gap="md" mt="md">
                {articles.slice(1, 6).map((article, index) => (
                  <ArticleLink key={article.id} article={article}>
                    <Group align="flex-start" gap="sm" wrap="nowrap">
                      <Title order={2} c="red" className="ranking-number">
                        0{index + 1}
                      </Title>
                      <Stack gap={4}>
                        <Text fw={800} size="sm" lineClamp={3}>
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

              <Divider my="xl" />

              <Box className="newsletter-box">
                <EyeIcon size={28} weight="fill" />
                <Title order={3} mt="sm">
                  DON"T MISS A THING!
                </Title>
                <Text size="sm" mt="xs">
                  The juiciest stories delivered straight to your inbox.
                </Text>
                <Anchor
                  href="#newsletter"
                  c="white"
                  fw={800}
                  mt="md"
                  display="block"
                >
                  SUBSCRIBE NOW →
                </Anchor>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>

        {/* FOOTER */}
        <Divider my="xl" />
        <Box ta="center" py="lg">
          <Title order={2} className="newspaper-logo">
            THE DAILY <span>DRAMA</span>
          </Title>
          <Text size="xs" c="dimmed" mt="xs">
            © 2026 THE DAILY DRAMA. ALL DRAMA RESERVED.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default NewspaperPortal;
