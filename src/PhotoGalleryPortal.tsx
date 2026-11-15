import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActionIcon,
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ImageSquareIcon,
  XIcon,
} from "@phosphor-icons/react";

import classes from "./PhotoGallery.module.css";

import type {
  AdBannerConfig,
  AdBannerLocation,
} from "./AdTypes";

import { AdBanner } from "./AdBanner";
import { mockPhotos, type GalleryPhoto } from "./PortalTypes";

interface PhotoGalleryPortalProps {
  photos?: GalleryPhoto[];
  targetPhotoId?: string;
  onTargetPhotoSelected?: (photo: GalleryPhoto) => void;
  adBanner?: AdBannerConfig;
}

export function PhotoGalleryPortal({
  photos = mockPhotos,
  targetPhotoId,
  onTargetPhotoSelected,
  adBanner,
}: PhotoGalleryPortalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [animating, setAnimating] = useState(false);

  const triggeredRef = useRef<string | null>(null);

  const selectedPhoto =
    selectedIndex !== null
      ? photos[selectedIndex] ?? null
      : null;

  // Render an advertisement only at its configured location.
  const renderAdBanner = (location: AdBannerLocation) => {
    if (!adBanner || adBanner.location !== location) {
      return null;
    }

    return <AdBanner config={adBanner} />;
  };

  // Select a photo and trigger the target-photo callback when appropriate.
  const selectPhoto = (index: number) => {
    const photo = photos[index];

    if (!photo) return;

    setSelectedIndex(index);
    setAnimating(false);

    open();

    if (
      photo.id === targetPhotoId &&
      triggeredRef.current !== photo.id
    ) {
      triggeredRef.current = photo.id;

      setAnimating(true);

      // Allow the modal to render before starting the animation.
      requestAnimationFrame(() => {
        setTimeout(() => {
          onTargetPhotoSelected?.(photo);
        }, 2000);
      });
    }
  };

  // Navigate between photos.
  const navigate = (direction: number) => {
    if (
      selectedIndex === null ||
      photos.length === 0
    ) {
      return;
    }

    const nextIndex =
      (selectedIndex + direction + photos.length) % photos.length;

    selectPhoto(nextIndex);
  };

  // Reset the viewer when the modal closes.
  useEffect(() => {
    if (!opened) {
      setSelectedIndex(null);
      setAnimating(false);
    }
  }, [opened]);

  // Keyboard navigation.
  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          navigate(-1);
          break;

        case "ArrowRight":
          event.preventDefault();
          navigate(1);
          break;

        case "Escape":
          event.preventDefault();
          close();
          break;

        case "Home":
          event.preventDefault();
          selectPhoto(0);
          break;

        case "End":
          event.preventDefault();
          selectPhoto(photos.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [opened, selectedIndex, photos, targetPhotoId]);

  const hasSidebarBanner =
    adBanner?.location === "sidebar";

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">

        {/* Gallery header */}
        <Group justify="space-between" align="center">
          <UnstyledButton
            className={classes.galleryBrand}
            onClick={() => {
              if (opened) {
                close();
              } else if (photos.length > 0) {
                selectPhoto(0);
              }
            }}
            aria-label="Open the first photo in Photo Gallery"
          >
            <Group gap="sm">
              <ImageSquareIcon
                size={28}
                weight="duotone"
              />

              <Box>
                <Title order={2}>
                  Photo Gallery
                </Title>

                <Text size="sm" c="dimmed">
                  Retained echoes of points in time
                </Text>
              </Box>
            </Group>
          </UnstyledButton>

          <Badge
            variant="light"
            color="gray"
            size="lg"
          >
            {photos.length} photos
          </Badge>
        </Group>

        {/* Top advertisement */}
        {renderAdBanner("top")}

        {/* Gallery and optional sidebar */}
        <Grid>

          {/* Main photo gallery */}
          <Grid.Col
            span={
              hasSidebarBanner
                ? { base: 12, md: 9 }
                : 12
            }
          >
            <SimpleGrid
              cols={{ base: 2, xs: 2, sm: 3, md: 4 }}
              spacing="md"
            >
              {photos.map((photo, index) => (
                <UnstyledButton
                  key={photo.id}
                  className={classes.photoCard}
                  onClick={() => selectPhoto(index)}
                >
                  <Box className={classes.imageWrapper}>
                    <Image
                      src={photo.src}
                      alt={photo.name}
                      className={classes.thumbnail}
                    />
                  </Box>

                  <Stack gap={3} mt="xs">
                    <Text
                      fw={600}
                      size="sm"
                      lineClamp={1}
                    >
                      {photo.name}
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                      lineClamp={2}
                    >
                      {photo.description}
                    </Text>
                  </Stack>
                </UnstyledButton>
              ))}
            </SimpleGrid>
          </Grid.Col>

          {/* Sidebar advertisement */}
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

        {/* Bottom / other advertisement */}
        {renderAdBanner("other")}

      </Stack>

      {/* Fullscreen photo viewer */}
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{
          transition: "fade",
          duration: 200,
        }}
        withCloseButton={false}
        padding={0}
        centered
        styles={{
          content: {
            background: "#101010",
          },
          body: {
            height: "100%",
          },
        }}
      >
        {selectedPhoto && (
          <Box className={classes.viewer}>

            {/* Viewer header */}
            <Group
              justify="space-between"
              className={classes.viewerHeader}
            >
              <Text c="white" size="sm">
                {selectedIndex! + 1} / {photos.length}
              </Text>

              <ActionIcon
                variant="subtle"
                color="white"
                size="lg"
                onClick={close}
                aria-label="Close viewer"
              >
                <XIcon size={24} />
              </ActionIcon>
            </Group>

            {/* Image stage */}
            <Box
              className={classes.imageStage}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  close();
                }
              }}
            >
              {/* Previous photo */}
              <ActionIcon
                className={classes.navButton}
                variant="filled"
                color="dark"
                radius="xl"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(-1);
                }}
                aria-label="Previous photo"
              >
                <ArrowLeftIcon size={20} />
              </ActionIcon>

              {/* Selected photo */}
              <Box
                key={selectedPhoto.id}
                className={`${classes.largeImageWrapper} ${
                  animating ? classes.targetAnimation : ""
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.name}
                  fit="contain"
                  className={classes.largeImage}
                />

                {/* Target photo animation overlay */}
                {animating && (
                  <Box className={classes.successOverlay}>
                    <CheckCircleIcon
                      size={64}
                      weight="fill"
                      color="white"
                    />
                  </Box>
                )}
              </Box>

              {/* Next photo */}
              <ActionIcon
                className={classes.navButton}
                variant="filled"
                color="dark"
                radius="xl"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(1);
                }}
                aria-label="Next photo"
              >
                <ArrowRightIcon size={20} />
              </ActionIcon>
            </Box>

            {/* Photo information */}
            <Stack
              align="center"
              gap={6}
              className={classes.photoDetails}
            >
              <Title
                order={3}
                c="white"
                ta="center"
              >
                {selectedPhoto.name}
              </Title>

              <Text
                c="gray.5"
                ta="center"
                size="sm"
              >
                {selectedPhoto.description}
              </Text>

              {selectedPhoto.id === targetPhotoId && (
                <Badge
                  color="green"
                  variant="light"
                  mt="xs"
                >
                  Special memory
                </Badge>
              )}
            </Stack>

          </Box>
        )}
      </Modal>
    </Container>
  );
}

export default PhotoGalleryPortal;
