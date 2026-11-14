
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
  Popover,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Modal,
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
  CheckCircleIcon,
  TrashIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

import "./CommercePortal.css";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  delivery: string;
}

const mockProducts: Product[] = [
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

interface CommercePortalProps {
  products?: Product[];
  targetProductId?: number;
  onTargetProductInCart?: () => void;
}

export function CommercePortal({
  products = mockProducts,
  targetProductId,
  onTargetProductInCart,
}: CommercePortalProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");

  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const [favoritesOpened, setFavoritesOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const [successProductId, setSuccessProductId] =
    useState<number | null>(null);

  const [showPageSuccess, setShowPageSuccess] = useState(false);

  const [paymentErrorOpened, setPaymentErrorOpened] = useState(false);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter and sort products
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
  }, [products, search, category, sort]);

  // Favorite products
  const favoriteProducts = useMemo(
    () => products.filter((product) => favorites.includes(product.id)),
    [products, favorites]
  );

  // Cart products (duplicates represent quantities)
  const cartProducts = useMemo(
    () => cart.map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => product !== undefined),
    [products, cart]
  );

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  const cartCount = cart.length;

  // Handle click of logo
  const handleLogoClick = () => {
    // Reset browsing filters
    setSearch("");
    setCategory("All");
    setSort("recommended");

    // Close open panels
    setFavoritesOpened(false);
    setCartOpened(false);

    // Preserve cart and favorites!

    // Return to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // Add to cart
  const addToCart = (id: number) => {
    setCart((current) => [...current, id]);

    if (id === targetProductId) {
      setSuccessProductId(id);
      setShowPageSuccess(true);

      onTargetProductInCart?.();

      setTimeout(() => {
        setSuccessProductId((current) =>
          current === id ? null : current
        );
      }, 1800);

      setTimeout(() => {
        setShowPageSuccess(false);
      }, 2800);
    }
  };

  // Remove one occurrence from cart
  const removeFromCart = (id: number) => {
    setCart((current) => {
      const index = current.indexOf(id);

      if (index === -1) return current;

      return current.filter((_, i) => i !== index);
    });
  };

  // Group cart items and calculate quantities
  const groupedCart = useMemo(() => {
    return cartProducts.reduce<
      { product: Product; quantity: number }[]
    >((groups, product) => {
      const existing = groups.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        groups.push({ product, quantity: 1 });
      }

      return groups;
    }, []);
  }, [cartProducts]);

  // Product card
  const renderProduct = (product: Product) => (
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
          color={favorites.includes(product.id) ? "red" : "gray"}
          radius="xl"
          size="lg"
          onClick={() => toggleFavorite(product.id)}
        >
          <HeartIcon
            size={19}
            weight={
              favorites.includes(product.id) ? "fill" : "regular"
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
              <Text size="xs" c="dimmed" td="line-through">
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
          color={
            successProductId === product.id ? "green" : "blue"
          }
          className={
            successProductId === product.id
              ? "cart-success"
              : undefined
          }
          onClick={() => addToCart(product.id)}
        >
          {successProductId === product.id
            ? "✓ Added successfully!"
            : "Add to cart"}
        </Button>
      </Stack>
    </Card>
  );

  return (
    <Box bg="#f5f6f8" mih="100vh">
      {/* HEADER */}
      <Box bg="white" style={{ borderBottom: "1px solid #e9ecef" }}>
        <Container size="xl" py="md">
          <Group justify="space-between" wrap="nowrap">

            {/* CLICKABLE LOGO */}
            <Group
              gap="xs"
              style={{ cursor: "pointer" }}
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              aria-label="Go to homepage"
            >
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

            <Group gap="sm">

              {/* FAVORITES POPOVER */}
              <Popover
                width={360}
                position="bottom-end"
                shadow="lg"
                radius="lg"
                opened={favoritesOpened}
                onChange={setFavoritesOpened}
                withArrow
              >
                <Popover.Target>
                  <Button
                    variant="subtle"
                    color="dark"
                    leftSection={<HeartIcon size={19} />}
                    onClick={() => {
                      setFavoritesOpened((current) => !current);
                      setCartOpened(false);
                    }}
                  >
                    Favorites ({favorites.length})
                  </Button>
                </Popover.Target>

                <Popover.Dropdown p="md">
                  <Group justify="space-between" mb="md">
                    <Title order={4}>My favorites</Title>

                    <Badge color="pink">
                      {favorites.length} products
                    </Badge>
                  </Group>

                  {favoriteProducts.length > 0 ? (
                    <ScrollArea.Autosize mah={350}>
                      <Stack gap="md">
                        {favoriteProducts.map((product) => (
                          <Group
                            key={product.id}
                            wrap="nowrap"
                            align="center"
                          >
                            <Image
                              src={product.image}
                              w={65}
                              h={65}
                              radius="md"
                              fit="cover"
                            />

                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Text size="sm" fw={600} lineClamp={2}>
                                {product.name}
                              </Text>

                              <Text size="sm" fw={700} c="blue">
                                <NumberFormatter
                                  value={product.price}
                                  thousandSeparator
                                  suffix=" zł"
                                />
                              </Text>

                              <Button
                                size="xs"
                                variant="light"
                                mt={5}
                                onClick={() => addToCart(product.id)}
                              >
                                Add to cart
                              </Button>
                            </Box>

                            <ActionIcon
                              color="red"
                              variant="subtle"
                              onClick={() =>
                                toggleFavorite(product.id)
                              }
                            >
                              <TrashIcon size={18} />
                            </ActionIcon>
                          </Group>
                        ))}
                      </Stack>
                    </ScrollArea.Autosize>
                  ) : (
                    <Stack align="center" py="xl" gap="xs">
                      <HeartIcon size={36} color="#adb5bd" />

                      <Text fw={600}>No favorites yet</Text>

                      <Text size="xs" c="dimmed" ta="center">
                        Save products using the heart icon.
                      </Text>
                    </Stack>
                  )}
                </Popover.Dropdown>
              </Popover>

              {/* CART POPOVER */}
              <Popover
                width={390}
                position="bottom-end"
                shadow="lg"
                radius="lg"
                opened={cartOpened}
                onChange={setCartOpened}
                withArrow
              >
                <Popover.Target>
                  <Button
                    color="blue"
                    radius="md"
                    leftSection={<ShoppingCartIcon size={20} />}
                    onClick={() => {
                      setCartOpened((current) => !current);
                      setFavoritesOpened(false);
                    }}
                  >
                    Cart ({cartCount})
                  </Button>
                </Popover.Target>

                <Popover.Dropdown p="md">
                  <Group justify="space-between" mb="md">
                    <Title order={4}>Shopping cart</Title>

                    <Badge color="blue">
                      {cartCount} items
                    </Badge>
                  </Group>

                  {groupedCart.length > 0 ? (
                    <>
                      <ScrollArea.Autosize mah={320}>
                        <Stack gap="md">
                          {groupedCart.map(
                            ({ product, quantity }) => (
                              <Group
                                key={product.id}
                                wrap="nowrap"
                                align="center"
                              >
                                <Image
                                  src={product.image}
                                  w={65}
                                  h={65}
                                  radius="md"
                                  fit="cover"
                                />

                                <Box
                                  style={{ flex: 1, minWidth: 0 }}
                                >
                                  <Text
                                    size="sm"
                                    fw={600}
                                    lineClamp={2}
                                  >
                                    {product.name}
                                  </Text>

                                  <Text size="xs" c="dimmed">
                                    Quantity: {quantity}
                                  </Text>

                                  <Text size="sm" fw={700} c="blue">
                                    <NumberFormatter
                                      value={product.price * quantity}
                                      thousandSeparator
                                      suffix=" zł"
                                    />
                                  </Text>
                                </Box>

                                <Stack gap={3} align="center">
                                  <ActionIcon
                                    size="sm"
                                    color="blue"
                                    variant="light"
                                    onClick={() =>
                                      addToCart(product.id)
                                    }
                                  >
                                    +
                                  </ActionIcon>

                                  <ActionIcon
                                    size="sm"
                                    color="red"
                                    variant="subtle"
                                    onClick={() =>
                                      removeFromCart(product.id)
                                    }
                                  >
                                    <TrashIcon size={16} />
                                  </ActionIcon>
                                </Stack>
                              </Group>
                            )
                          )}
                        </Stack>
                      </ScrollArea.Autosize>

                      <Divider my="md" />

                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Subtotal
                        </Text>

                        <Text fw={600}>
                          <NumberFormatter
                            value={cartTotal}
                            thousandSeparator
                            suffix=" zł"
                          />
                        </Text>
                      </Group>

                      <Group justify="space-between" mt="xs">
                        <Text fw={700}>Total payment</Text>

                        <Title order={3} c="blue">
                          <NumberFormatter
                            value={cartTotal}
                            thousandSeparator
                            suffix=" zł"
                          />
                        </Title>
                      </Group>

                      <Button
                        fullWidth
                        mt="md"
                        radius="md"
                        onClick={() => {
                          setCartOpened(false);
                          setPaymentErrorOpened(true);
                        }}
                      >
                        Proceed to checkout
                      </Button>

                      <Button
                        fullWidth
                        mt="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => setCart([])}
                      >
                        Clear cart
                      </Button>
                    </>
                  ) : (
                    <Stack align="center" py="xl" gap="xs">
                      <ShoppingCartIcon
                        size={38}
                        color="#adb5bd"
                      />

                      <Text fw={600}>Your cart is empty</Text>

                      <Text size="xs" c="dimmed" ta="center">
                        Add some products to get started.
                      </Text>
                    </Stack>
                  )}
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* SEARCH AREA */}
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
                leftSection={
                  <MagnifyingGlassIcon
                    size={23}
                    color="#868e96"
                  />
                }
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
              />
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* CATEGORY NAVIGATION */}
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

      {/* MAIN CONTENT */}
      <Container size="xl" py={30}>
        <Group justify="space-between" align="center" mb="xl">
          <Box>
            <Title order={2} size={24} c="#212529">
              {search
                ? `Results for "${search}"`
                : "Discover products"}
            </Title>

            <Text size="sm" c="dimmed" mt={4}>
              {filteredProducts.length} products found
            </Text>
          </Box>

          <Select
            w={205}
            size="sm"
            radius="md"
            leftSection={
              <SlidersHorizontalIcon size={17} />
            }
            value={sort}
            onChange={(value) =>
              setSort(value || "recommended")
            }
            data={[
              { value: "recommended", label: "Recommended" },
              { value: "price-asc", label: "Price: lowest first" },
              { value: "price-desc", label: "Price: highest first" },
              { value: "rating", label: "Top rated" },
            ]}
          />
        </Group>

        {filteredProducts.length > 0 ? (
          <SimpleGrid
            cols={{ base: 1, xs: 2, sm: 3, lg: 4 }}
            spacing="lg"
          >
            {filteredProducts.map(renderProduct)}
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

      {/* FOOTER */}
      <Box bg="white" mt={40} py="xl">
        <Container size="xl">
          <Group justify="space-between">
            <Text fw={800} c="blue" size="lg">
              marketo
            </Text>

            <Text size="xs" c="dimmed">
              © 2026 Marketo Marketplace. Lose your money joyfully!
            </Text>
          </Group>
        </Container>
      </Box>

      {/* SUCCESS OVERLAY */}
      {showPageSuccess && (
        <div className="page-success-overlay">
          <div className="success-content">
            <div className="success-icon">
              <CheckCircleIcon size={65} weight="fill" />
            </div>

            <Title order={2} c="white" mt="md">
              Added successfully!
            </Title>

            <Text c="rgba(255,255,255,0.85)" mt="xs">
              Your product is now in your cart.
            </Text>
          </div>
        </div>
      )}

      {/* PAYMENT ERROR MODAL */}
      <Modal
        opened={paymentErrorOpened}
        onClose={() => setPaymentErrorOpened(false)}
        centered
        radius="lg"
        size="sm"
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.6, blur: 3 }}
      >
        <Stack align="center" gap="md" py="md">
          <ThemeIcon
            size={75}
            radius="xl"
            color="red"
            variant="light"
          >
            <WarningCircleIcon size={45} weight="fill" />
          </ThemeIcon>

          <Box ta="center">
            <Title order={3} c="red">
              Payment declined
            </Title>

            <Text size="sm" c="dimmed" mt="xs">
              Unfortunately, your payment couldn't be processed.
            </Text>
          </Box>

          <Paper
            p="md"
            radius="md"
            w="100%"
            bg="red.0"
          >
            <Text size="sm" fw={600} c="dark">
              Transaction failed
            </Text>

            <Text size="sm" c="dimmed" mt={5}>
              Your card was declined by the issuing bank.
              Please check your card details or try another payment method.
            </Text>

            <Divider my="sm" />

            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Error code
              </Text>

              <Text size="xs" fw={700}>
                CARD_DECLINED
              </Text>
            </Group>
          </Paper>

          <Group grow w="100%">
            <Button
              variant="default"
              onClick={() => setPaymentErrorOpened(false)}
            >
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={() => {
                setPaymentErrorOpened(false);
                setCartOpened(true);
              }}
            >
              Try again
            </Button>
          </Group>
        </Stack>
      </Modal>

    </Box>
  );
}

export default CommercePortal;
