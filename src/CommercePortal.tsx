
import { useMemo, useState } from "react";

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
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

import type {
  AdBannerConfig,
  AdBannerLocation,
} from "./AdTypes";

import { AdBanner } from "./AdBanner";
import { mockProducts, type Product } from "./PortalTypes";

// --------------------------------------------------
// COMPONENT PROPS
// --------------------------------------------------

interface CommercePortalProps {
  products?: Product[];
  targetProductId?: number;
  onTargetProductInCart?: () => void;
  adBanner?: AdBannerConfig;
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export function CommercePortal({
  products = mockProducts,
  targetProductId,
  onTargetProductInCart,
  adBanner,
}: CommercePortalProps) {
  // ------------------------------------------------
  // STATE
  // ------------------------------------------------

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

  const [paymentErrorOpened, setPaymentErrorOpened] =
    useState(false);

  // ------------------------------------------------
  // ADVERTISEMENT CONFIGURATION
  // ------------------------------------------------

  const hasSidebarBanner =
    adBanner?.location === "sidebar";

  const renderAdBanner = (location: AdBannerLocation) => {
    if (!adBanner || adBanner.location !== location) {
      return null;
    }

    return <AdBanner config={adBanner} />;
  };

  // ------------------------------------------------
  // CATEGORIES
  // ------------------------------------------------

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // ------------------------------------------------
  // FILTER AND SORT PRODUCTS
  // ------------------------------------------------

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

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

  // ------------------------------------------------
  // FAVORITE PRODUCTS
  // ------------------------------------------------

  const favoriteProducts = useMemo(
    () =>
      products.filter((product) =>
        favorites.includes(product.id)
      ),
    [products, favorites]
  );

  // ------------------------------------------------
  // CART PRODUCTS
  // Duplicates represent quantities.
  // ------------------------------------------------

  const cartProducts = useMemo(
    () =>
      cart
        .map((id) =>
          products.find((product) => product.id === id)
        )
        .filter(
          (product): product is Product =>
            product !== undefined
        ),
    [products, cart]
  );

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  const cartCount = cart.length;

  // ------------------------------------------------
  // GROUP CART ITEMS
  // ------------------------------------------------

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
        groups.push({
          product,
          quantity: 1,
        });
      }

      return groups;
    }, []);
  }, [cartProducts]);

  // ------------------------------------------------
  // LOGO CLICK
  // ------------------------------------------------

  const handleLogoClick = () => {
    setSearch("");
    setCategory("All");
    setSort("recommended");

    setFavoritesOpened(false);
    setCartOpened(false);

    // Preserve cart and favorites.

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ------------------------------------------------
  // TOGGLE FAVORITE
  // ------------------------------------------------

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // ------------------------------------------------
  // ADD TO CART
  // ------------------------------------------------

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

  // ------------------------------------------------
  // REMOVE ONE ITEM FROM CART
  // ------------------------------------------------

  const removeFromCart = (id: number) => {
    setCart((current) => {
      const index = current.indexOf(id);

      if (index === -1) return current;

      return current.filter((_, i) => i !== index);
    });
  };

  // ------------------------------------------------
  // PRODUCT CARD
  // ------------------------------------------------

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
          color={
            favorites.includes(product.id)
              ? "red"
              : "gray"
          }
          radius="xl"
          size="lg"
          onClick={() => toggleFavorite(product.id)}
          aria-label={
            favorites.includes(product.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
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
            successProductId === product.id
              ? "green"
              : "blue"
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

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <Box bg="#f5f6f8" mih="100vh">

      {/* ============================================
          HEADER
      ============================================ */}

      <Box
        bg="white"
        style={{
          borderBottom: "1px solid #e9ecef",
        }}
      >
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
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  handleLogoClick();
                }
              }}
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

              {/* ======================================
                  FAVORITES POPOVER
              ====================================== */}

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
                    <Title order={4}>
                      My favorites
                    </Title>

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

                            <Box
                              style={{
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <Text
                                size="sm"
                                fw={600}
                                lineClamp={2}
                              >
                                {product.name}
                              </Text>

                              <Text
                                size="sm"
                                fw={700}
                                c="blue"
                              >
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
                                onClick={() =>
                                  addToCart(product.id)
                                }
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
                              aria-label="Remove favorite"
                            >
                              <TrashIcon size={18} />
                            </ActionIcon>
                          </Group>
                        ))}
                      </Stack>
                    </ScrollArea.Autosize>
                  ) : (
                    <Stack align="center" py="xl" gap="xs">
                      <HeartIcon
                        size={36}
                        color="#adb5bd"
                      />

                      <Text fw={600}>
                        No favorites yet
                      </Text>

                      <Text
                        size="xs"
                        c="dimmed"
                        ta="center"
                      >
                        Save products using the heart icon.
                      </Text>
                    </Stack>
                  )}
                </Popover.Dropdown>
              </Popover>

              {/* ======================================
                  CART POPOVER
              ====================================== */}

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
                    leftSection={
                      <ShoppingCartIcon size={20} />
                    }
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
                    <Title order={4}>
                      Shopping cart
                    </Title>

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
                                  style={{
                                    flex: 1,
                                    minWidth: 0,
                                  }}
                                >
                                  <Text
                                    size="sm"
                                    fw={600}
                                    lineClamp={2}
                                  >
                                    {product.name}
                                  </Text>

                                  <Text
                                    size="xs"
                                    c="dimmed"
                                  >
                                    Quantity: {quantity}
                                  </Text>

                                  <Text
                                    size="sm"
                                    fw={700}
                                    c="blue"
                                  >
                                    <NumberFormatter
                                      value={
                                        product.price * quantity
                                      }
                                      thousandSeparator
                                      suffix=" zł"
                                    />
                                  </Text>
                                </Box>

                                <Stack
                                  gap={3}
                                  align="center"
                                >
                                  <ActionIcon
                                    size="sm"
                                    color="blue"
                                    variant="light"
                                    onClick={() =>
                                      addToCart(product.id)
                                    }
                                    aria-label="Increase quantity"
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
                                    aria-label="Remove one item"
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

                      <Group
                        justify="space-between"
                        mt="xs"
                      >
                        <Text fw={700}>
                          Total payment
                        </Text>

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
                    <Stack
                      align="center"
                      py="xl"
                      gap="xs"
                    >
                      <ShoppingCartIcon
                        size={38}
                        color="#adb5bd"
                      />

                      <Text fw={600}>
                        Your cart is empty
                      </Text>

                      <Text
                        size="xs"
                        c="dimmed"
                        ta="center"
                      >
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

      {/* ============================================
          SEARCH AREA
      ============================================ */}

      <Box bg="#1769d2" py={35}>
        <Container size="xl">
          <Stack gap="lg">
            <Box>
              <Title order={1} c="white" size={32}>
                Find exactly what you need.
              </Title>

              <Text
                c="rgba(255,255,255,0.8)"
                mt={5}
              >
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
                      aria-label="Clear search"
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

      {/* ============================================
          TOP ADVERTISEMENT
      ============================================ */}

      {adBanner?.location === "top" && (
        <Container size="xl" pt="lg">
          {renderAdBanner("top")}
        </Container>
      )}

      {/* ============================================
          CATEGORY NAVIGATION
      ============================================ */}

      <Box
        bg="white"
        style={{
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <Container size="xl" py="sm">
          <Group gap="xl" wrap="nowrap">
            {categories.map((item) => (
              <Button
                key={item}
                variant={
                  category === item ? "light" : "subtle"
                }
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

      {/* ============================================
          MAIN CONTENT
          PRODUCTS + OPTIONAL SIDEBAR
      ============================================ */}

      <Container size="xl" py={30}>
        <Grid>

          {/* ======================================
              PRODUCT LISTING
          ====================================== */}

          <Grid.Col
            span={
              hasSidebarBanner
                ? { base: 12, md: 9 }
                : 12
            }
          >
            <Group
              justify="space-between"
              align="center"
              mb="xl"
            >
              <Box>
                <Title
                  order={2}
                  size={24}
                  c="#212529"
                >
                  {search
                    ? `Results for "${search}"`
                    : "Discover products"}
                </Title>

                <Text
                  size="sm"
                  c="dimmed"
                  mt={4}
                >
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
                  {
                    value: "recommended",
                    label: "Recommended",
                  },
                  {
                    value: "price-asc",
                    label: "Price: lowest first",
                  },
                  {
                    value: "price-desc",
                    label: "Price: highest first",
                  },
                  {
                    value: "rating",
                    label: "Top rated",
                  },
                ]}
              />
            </Group>

            {/* PRODUCT GRID */}

            {filteredProducts.length > 0 ? (
              <SimpleGrid
                cols={{
                  base: 1,
                  xs: 2,
                  sm: 3,
                  lg: hasSidebarBanner ? 3 : 4,
                }}
                spacing="lg"
              >
                {filteredProducts.map(renderProduct)}
              </SimpleGrid>
            ) : (
              <Paper
                p={60}
                radius="lg"
                ta="center"
                withBorder
              >
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
          </Grid.Col>

          {/* ======================================
              SIDEBAR ADVERTISEMENT
          ====================================== */}

          {hasSidebarBanner && (
            <Grid.Col
              span={{ base: 12, md: 3 }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                  position: "sticky",
                  top: 20,
                }}
              >
                {renderAdBanner("sidebar")}
              </Box>
            </Grid.Col>
          )}

        </Grid>
      </Container>

      {/* ============================================
          OTHER / BOTTOM ADVERTISEMENT
      ============================================ */}

      {adBanner?.location === "other" && (
        <Container size="xl" pb="xl">
          {renderAdBanner("other")}
        </Container>
      )}

      {/* ============================================
          FOOTER
      ============================================ */}

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

      {/* ============================================
          SUCCESS OVERLAY
      ============================================ */}

      {showPageSuccess && (
        <div className="page-success-overlay">
          <div className="success-content">
            <div className="success-icon">
              <CheckCircleIcon
                size={65}
                weight="fill"
              />
            </div>

            <Title order={2} c="white" mt="md">
              Added successfully!
            </Title>

            <Text
              c="rgba(255,255,255,0.85)"
              mt="xs"
            >
              Your product is now in your cart.
            </Text>
          </div>
        </div>
      )}

      {/* ============================================
          PAYMENT ERROR MODAL
      ============================================ */}

      <Modal
        opened={paymentErrorOpened}
        onClose={() => setPaymentErrorOpened(false)}
        centered
        radius="lg"
        size="sm"
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
      >
        <Stack align="center" gap="md" py="md">
          <ThemeIcon
            size={75}
            radius="xl"
            color="red"
            variant="light"
          >
            <WarningCircleIcon
              size={45}
              weight="fill"
            />
          </ThemeIcon>

          <Box ta="center">
            <Title order={3} c="red">
              Payment declined
            </Title>

            <Text
              size="sm"
              c="dimmed"
              mt="xs"
            >
              Unfortunately, your payment couldn't be processed.
            </Text>
          </Box>

          <Paper
            p="md"
            radius="md"
            w="100%"
            bg="red.0"
          >
            <Text
              size="sm"
              fw={600}
              c="dark"
            >
              Transaction failed
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={5}
            >
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
              onClick={() =>
                setPaymentErrorOpened(false)
              }
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
