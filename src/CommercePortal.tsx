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
  Input,
  NumberFormatter,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  StarIcon,
  SlidersHorizontalIcon,
  XIcon,
  PackageIcon,
} from "@phosphor-icons/react";

export function CommercePortal() {
  const products = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro 256GB Natural Titanium",
      category: "Electronics",
      price: 4299,
      oldPrice: 4999,
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600",
      badge: "Bestseller",
      delivery: "Tomorrow",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      category: "Electronics",
      price: 1199,
      oldPrice: 1499,
      rating: 4.8,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
      badge: "Price hit",
      delivery: "Tomorrow",
    },
    {
      id: 3,
      name: "Nike Air Max 270 Men's Sports Shoes",
      category: "Fashion",
      price: 449,
      oldPrice: null,
      rating: 4.7,
      reviews: 86,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      badge: null,
      delivery: "In 2 days",
    },
    {
      id: 4,
      name: "Modern Minimalist Desk Lamp",
      category: "Home",
      price: 129,
      oldPrice: 179,
      rating: 4.6,
      reviews: 54,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
      badge: "Sale",
      delivery: "Tomorrow",
    },
    {
      id: 5,
      name: "Apple MacBook Air 13 M3 16GB 512GB",
      category: "Electronics",
      price: 5499,
      oldPrice: 5999,
      rating: 4.9,
      reviews: 217,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      badge: "Bestseller",
      delivery: "Tomorrow",
    },
    {
      id: 6,
      name: "Premium Everyday Backpack 25L",
      category: "Fashion",
      price: 189,
      oldPrice: null,
      rating: 4.5,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      badge: null,
      delivery: "In 2 days",
    },
    {
      id: 7,
      name: "Ceramic Coffee Set - 4 Pieces",
      category: "Home",
      price: 89,
      oldPrice: 119,
      rating: 4.8,
      reviews: 73,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
      badge: "Sale",
      delivery: "Tomorrow",
    },
    {
      id: 8,
      name: "Smart Fitness Watch AMOLED Display",
      category: "Electronics",
      price: 599,
      oldPrice: 799,
      rating: 4.6,
      reviews: 194,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      badge: "Popular",
      delivery: "Tomorrow",
    },
  ];

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((current) => [...current, id]);
  };

  return (
    <Box bg="#f5f6f8" mih="100vh">
      {/* Header */}
      <Box bg="white" style={{ borderBottom: "1px solid #e9ecef" }}>
        <Container size="xl" py="md">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs">
              <ThemeIcon
                size={42}
                radius="md"
                color="blue"
                variant="filled"
              >
                <PackageIcon size={25} />
              </ThemeIcon>
              <Title order={2} c="#1769d2" fw={900}>
                marketo
              </Title>
            </Group>

            <Group gap="lg">
              <Button
                variant="subtle"
                color="dark"
                leftSection={<HeartIcon size={19} />}
                visibleFrom="sm"
              >
                Favorites
              </Button>

              <Button
                color="blue"
                radius="md"
                leftSection={<ShoppingCartIcon size={20} />}
              >
                Cart ({cart.length})
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Search area */}
      <Box bg="#1769d2" py={35}>
        <Container size="xl">
          <Stack gap="lg">
            <Box>
              <Title order={1} c="white" size={32}>
                Find exactly what you need.
              </Title>
              <Text c="rgba(255,255,255,0.8)" mt={5}>
                Millions of products. Great prices. Fast delivery.
              </Text>
            </Box>

            <Paper p={6} radius="lg" maw={850}>
              <Input
                size="xl"
                variant="unstyled"
                placeholder="What are you looking for?"
                leftSection={<MagnifyingGlassIcon size={23} color="#868e96" />}
                rightSection={
                  search ? (
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => setSearch("")}
                    >
                      <XIcon size={18} />
                    </ActionIcon>
                  ) : null
                }
                value={search}
                onChange={(event) =>
                  setSearch(event.currentTarget.value)
                }
                styles={{
                  input: {
                    fontSize: 16,
                    height: 48,
                  },
                }}
              />
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* Category navigation */}
      <Box bg="white" style={{ borderBottom: "1px solid #e9ecef" }}>
        <Container size="xl" py="sm">
          <Group gap="xl" wrap="nowrap">
            {categories.map((item) => (
              <Button
                key={item}
                variant={category === item ? "light" : "subtle"}
                color="blue"
                radius="xl"
                size="sm"
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </Group>
        </Container>
      </Box>

      {/* Main content */}
      <Container size="xl" py={30}>
        <Group justify="space-between" align="center" mb="xl">
          <Box>
            <Title order={2} size={24} c="#212529">
              {search ? `Results for "${search}"` : "Discover products"}
            </Title>
            <Text size="sm" c="dimmed" mt={4}>
              {filteredProducts.length} products found
            </Text>
          </Box>

          <Select
            w={205}
            size="sm"
            radius="md"
            leftSection={<SlidersHorizontalIcon size={17} />}
            value={sort}
            onChange={(value) => setSort(value || "recommended")}
            data={[
              { value: "recommended", label: "Recommended" },
              { value: "price-asc", label: "Price: lowest first" },
              { value: "price-desc", label: "Price: highest first" },
              { value: "rating", label: "Top rated" },
            ]}
          />
        </Group>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <SimpleGrid
            cols={{ base: 1, xs: 2, sm: 3, lg: 4 }}
            spacing="lg"
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                bg="white"
                radius="lg"
                padding={0}
                withBorder
                style={{
                  overflow: "hidden",
                  transition: "transform 150ms ease, box-shadow 150ms ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-3px)";
                  event.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = "none";
                }}
              >
                <Box pos="relative">
                  <Image
                    src={product.image}
                    h={210}
                    fit="cover"
                    alt={product.name}
                  />

                  {product.badge && (
                    <Badge
                      pos="absolute"
                      top={12}
                      left={12}
                      color="blue"
                      variant="filled"
                      radius="sm"
                    >
                      {product.badge}
                    </Badge>
                  )}

                  <ActionIcon
                    pos="absolute"
                    top={10}
                    right={10}
                    variant="white"
                    color={
                      favorites.includes(product.id) ? "red" : "gray"
                    }
                    radius="xl"
                    size="lg"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <HeartIcon
                      size={19}
                      weight={
                        favorites.includes(product.id)
                          ? "fill"
                          : "regular"
                      }
                    />
                  </ActionIcon>
                </Box>

                <Stack p="md" gap="xs" style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed">
                    {product.category}
                  </Text>

                  <Text
                    fw={600}
                    size="sm"
                    lineClamp={2}
                    mih={42}
                    c="#212529"
                  >
                    {product.name}
                  </Text>

                  <Group gap={5}>
                    <StarIcon size={14} color="#f59f00" />
                    <Text size="xs" fw={600}>
                      {product.rating}
                    </Text>
                    <Text size="xs" c="dimmed">
                      ({product.reviews} reviews)
                    </Text>
                  </Group>

                  <Box mt="xs">
                    <Group gap={8} align="baseline">
                      <Text size="xl" fw={800} c="#212529">
                        <NumberFormatter
                          value={product.price}
                          thousandSeparator
                          suffix=" zł"
                        />
                      </Text>

                      {product.oldPrice && (
                        <Text
                          size="xs"
                          c="dimmed"
                          td="line-through"
                        >
                          <NumberFormatter
                            value={product.oldPrice}
                            thousandSeparator
                            suffix=" zł"
                          />
                        </Text>
                      )}
                    </Group>
                  </Box>

                  <Group gap={5}>
                    <TruckIcon size={16} color="#2f9e44" />
                    <Text size="xs" c="green" fw={500}>
                      Delivery: {product.delivery}
                    </Text>
                  </Group>

                  <Divider my={5} />

                  <Button
                    fullWidth
                    radius="md"
                    color="blue"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Paper p={60} radius="lg" ta="center" withBorder>
            <ThemeIcon
              size={60}
              radius="xl"
              color="gray"
              variant="light"
              mx="auto"
            >
              <MagnifyingGlassIcon size={30} />
            </ThemeIcon>
            <Title order={3} mt="lg">
              No products found
            </Title>
            <Text c="dimmed" mt="xs">
              Try another search term or change the selected category.
            </Text>
            <Button
              mt="lg"
              variant="light"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          </Paper>
        )}
      </Container>

      {/* Footer */}
      <Box bg="white" mt={40} py="xl">
        <Container size="xl">
          <Group justify="space-between">
            <Text fw={800} c="blue" size="lg">
              marketo
            </Text>
            <Text size="xs" c="dimmed">
              © 2026 Marketo Marketplace. Demo experience.
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
